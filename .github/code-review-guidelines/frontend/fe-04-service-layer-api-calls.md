# FE-04: Service Layer for API Calls

**Severity**: CRITICAL

## Principle

To call APIs, use a service layer that converts JSON from the server into typed domain model classes. Pages and components should **never** make direct HTTP calls. All network communication must go through the service layer, which returns domain model instances with methods and type safety.

This creates a clean boundary between UI and data access, making the codebase testable, maintainable, and type-safe.

## Why This Matters

1. **Type Safety**: Domain models provide compile-time type checking and intellisense
2. **Encapsulation**: API details are hidden from UI, making the backend replaceable
3. **Reusability**: Services can be called from multiple pages, contexts, hooks
4. **Testability**: Services can be mocked, UI tests don't need real API calls
5. **Consistency**: Standardized error handling, authentication, retry logic
6. **Maintainability**: Changing API contracts only affects service layer
7. **Documentation**: Service methods are self-documenting APIs
8. **Data Transformation**: Convert backend DTOs to frontend domain models

## Architecture Reference

See [Frontend Architecture: Services](/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md#5-services) for how services fit into the overall architecture.

## Bad Examples

### ❌ Direct fetch in component

```tsx
// pages/user-profile/index.tsx
import { useEffect, useState } from 'react';

export const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

**Problems**:
- Direct `fetch()` call in component
- Manual token handling
- No type safety - `user` is `any`
- Error handling logic in UI code
- Can't reuse this logic elsewhere
- Testing requires mocking `fetch()` globally
- Manual loading state management
- No retry logic, no standardized error handling

### ❌ Untyped JSON response

```tsx
// pages/dashboard/index.tsx
import axios from 'axios';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get('/api/stats');
      setStats(response.data); // Untyped!
    };
    fetchStats();
  }, []);

  // No autocomplete, no type checking
  return <div>Revenue: {stats?.totalRevenue}</div>;
};
```

**Problems**:
- `stats` is `any` - no type safety
- Typos like `stats.totlRevenue` fail at runtime
- No intellisense for available properties
- No validation of API response shape

### ❌ Duplicated API logic across components

```tsx
// pages/user-profile/index.tsx
const fetchUser = async () => {
  const response = await fetch('/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

// pages/settings/index.tsx
const getUser = async () => {
  const response = await fetch('/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

// components/user-dropdown/index.tsx
const loadUser = async () => {
  const response = await fetch('/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};
```

**Problems**:
- Same API call duplicated 3 times
- Inconsistent naming (`fetchUser`, `getUser`, `loadUser`)
- Updating endpoint requires changing 3 files
- Error handling differs across components

## Good Examples

### ✅ Domain model class

```tsx
// types/user.ts
export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  created_at: string;
  avatar_url: string | null;
  is_verified: boolean;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  createdAt: Date;
  avatarUrl: string | null;
  isVerified: boolean;

  constructor(data: UserDTO) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.phoneNumber = data.phone_number;
    this.createdAt = new Date(data.created_at);
    this.avatarUrl = data.avatar_url;
    this.isVerified = data.is_verified;
  }

  static fromJSON(json: UserDTO): User {
    return new User(json);
  }

  // Domain methods
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getInitials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  getDisplayEmail(): string {
    return this.isVerified ? this.email : `${this.email} (unverified)`;
  }

  hasPhoneNumber(): boolean {
    return this.phoneNumber !== null;
  }

  getAvatarUrl(): string {
    return this.avatarUrl || this.getDefaultAvatarUrl();
  }

  private getDefaultAvatarUrl(): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.getFullName())}`;
  }

  getAccountAge(): number {
    const now = new Date();
    const diffMs = now.getTime() - this.createdAt.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Days
  }

  isNewAccount(): boolean {
    return this.getAccountAge() < 30; // Less than 30 days
  }
}
```

**Benefits**:
- Strong typing with TypeScript
- Converts snake_case backend DTOs to camelCase frontend models
- Domain methods encapsulate business logic
- Reusable across entire application
- Testable independently

### ✅ Service layer implementation

```tsx
// services/user.service.ts
import { ApiService } from './api.service';
import { User, UserDTO } from '@/types/user';
import { ServiceResponse } from '@/types/service-response';

export class UserService {
  private apiClient: ApiService;

  constructor() {
    this.apiClient = new ApiService();
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await this.apiClient.get<ServiceResponse<UserDTO>>(
      '/users/me'
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch user');
    }

    return User.fromJSON(response.data);
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const response = await this.apiClient.get<ServiceResponse<UserDTO>>(
      `/users/${userId}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch user');
    }

    return User.fromJSON(response.data);
  }

  /**
   * Update user profile
   */
  async updateUser(
    userId: string,
    updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phoneNumber'>>
  ): Promise<User> {
    // Convert frontend model to backend DTO format
    const payload = {
      first_name: updates.firstName,
      last_name: updates.lastName,
      phone_number: updates.phoneNumber,
    };

    const response = await this.apiClient.patch<ServiceResponse<UserDTO>>(
      `/users/${userId}`,
      payload
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update user');
    }

    return User.fromJSON(response.data);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(userId: string, file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await this.apiClient.post<ServiceResponse<UserDTO>>(
      `/users/${userId}/avatar`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to upload avatar');
    }

    return User.fromJSON(response.data);
  }
}

// Export singleton instance
export const userService = new UserService();
```

**Benefits**:
- All user API calls in one place
- Returns typed `User` instances
- Converts between frontend/backend naming conventions
- Standardized error handling
- Reusable across pages, contexts, hooks
- Easy to mock for testing

### ✅ Base API service with standardization

```tsx
// services/api.service.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getStorageItem } from '@/utils/storage-util';
import { STORAGE_KEYS } from '@/constants/storage-keys';

export class ApiService {
  protected apiClient: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.apiClient = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to all requests
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle response errors globally
    this.apiClient.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired - redirect to login
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.apiClient.get<T, T>(url, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.post<T, T>(url, data, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.patch<T, T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.apiClient.delete<T, T>(url, config);
  }
}
```

**Benefits**:
- Centralized axios configuration
- Automatic auth token injection
- Global error handling (401 redirects)
- Standardized timeout and headers
- All services inherit this behavior

### ✅ Using service in component

```tsx
// pages/user-profile/index.tsx
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { userService } from '@/services/user.service';
import { toast } from '@/components/toast';

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        toast.error('Failed to load user profile');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <img src={user.getAvatarUrl()} alt={user.getFullName()} />
      <h1>{user.getFullName()}</h1>
      <p>{user.getDisplayEmail()}</p>
      {user.hasPhoneNumber() && <p>Phone: {user.phoneNumber}</p>}
      {user.isNewAccount() && <span>New User!</span>}
      <p>Account created {user.getAccountAge()} days ago</p>
    </div>
  );
};
```

**Benefits**:
- Clean component code - just UI logic
- Full type safety with `User` class
- Intellisense for all user properties and methods
- Reusable service methods
- Easy to test - mock `userService`

### ✅ Using service in context

```tsx
// contexts/user.provider.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { userService } from '@/services/user.service';

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      const currentUser = await userService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = await userService.updateUser(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    await loadUser();
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

**Benefits**:
- Context uses service layer
- Service methods called from single location
- Easy to update API calls without touching UI

### ✅ Testing with service layer

```tsx
// pages/user-profile/user-profile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './index';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';

// Mock the service
jest.mock('@/services/user.service');

describe('UserProfile', () => {
  it('displays user information', async () => {
    // Mock service response
    const mockUser = new User({
      id: '123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone_number: '+1234567890',
      created_at: '2024-01-01T00:00:00Z',
      avatar_url: null,
      is_verified: true,
    });

    (userService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    (userService.getCurrentUser as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText(/User not found/)).toBeInTheDocument();
    });
  });
});
```

**Benefits**:
- Easy to mock service
- Tests don't need real API
- Can test error scenarios easily

## Service Layer Best Practices

### 1. One service per domain entity

```
services/
  user.service.ts        # User-related API calls
  order.service.ts       # Order-related API calls
  product.service.ts     # Product-related API calls
  auth.service.ts        # Authentication API calls
  payment.service.ts     # Payment API calls
```

### 2. Always return domain models, not raw JSON

```tsx
// Bad
async getUser(): Promise<any> {
  return this.apiClient.get('/users/me');
}

// Good
async getUser(): Promise<User> {
  const response = await this.apiClient.get<ServiceResponse<UserDTO>>('/users/me');
  return User.fromJSON(response.data);
}
```

### 3. Convert between frontend/backend naming

```tsx
// Backend uses snake_case, frontend uses camelCase
async updateUser(updates: { firstName: string; lastName: string }) {
  const payload = {
    first_name: updates.firstName,
    last_name: updates.lastName,
  };

  const response = await this.apiClient.patch('/users/me', payload);
  return User.fromJSON(response.data);
}
```

### 4. Provide clear method names

```tsx
// Service methods should be self-documenting
getUserById(userId: string)
getCurrentUser()
updateUserProfile(userId: string, updates: Partial<User>)
deleteUser(userId: string)
searchUsers(query: string)
```

## Review Checklist

When reviewing code, check for:

- [ ] No direct `fetch()` or `axios` calls in components or pages
- [ ] All API calls go through service layer
- [ ] Services return domain model classes, not `any` or raw JSON
- [ ] Domain models have `fromJSON()` static method
- [ ] Domain models provide useful methods (not just data bags)
- [ ] Service methods have clear, descriptive names
- [ ] Services convert between backend DTOs and frontend models
- [ ] Error handling is consistent across services
- [ ] Auth tokens are automatically injected by base ApiService

## Related Guidelines

- **FE-05**: Batch Fetch Lists - Services should provide batch endpoints
- Frontend Architecture: `/docs/frontend-architecture.md` (Services section)

## References

- Frontend Architecture: `/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md`
- Service examples: `/frontend/services/`
- Type definitions: `/frontend/types/`

## Common Questions

**Q: Can I use `fetch()` for third-party APIs?**
A: Create a service for it. Even third-party API calls should be encapsulated.

**Q: What about GraphQL?**
A: Same principle - service layer returns domain models, not raw GraphQL responses.

**Q: Should services handle loading states?**
A: No. Services return data or throw errors. UI handles loading states.

**Q: Can services call other services?**
A: Yes, but be careful of circular dependencies. Usually indicates domain boundary issues.

---

**Last Updated**: 2025-11-02
**Severity**: CRITICAL
**Auto-reject**: Yes - Direct API calls in components/pages should be rejected
