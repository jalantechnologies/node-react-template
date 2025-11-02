# FE-05: Batch Fetch Lists (Avoid N+1 Queries)

**Severity**: CRITICAL

## Principle

If a page displays a list view, it should **not** make one or more network calls per item to display each item. Instead, fetch all data in a **single request** or **paginated batches**. This avoids the N+1 query problem, which causes severe performance degradation and poor user experience.

Backend APIs should support batch endpoints that return multiple items in one call.

## Why This Matters

1. **Performance**: N+1 queries cause exponential slowdown as list grows
2. **Network Overhead**: Each HTTP request has latency (DNS, TCP, TLS handshake)
3. **Server Load**: 100 items = 100 requests instead of 1, overwhelming backend
4. **User Experience**: Page appears slow, items load one-by-one (janky)
5. **Mobile Impact**: On slow networks, N+1 queries make app unusable
6. **Resource Consumption**: Excessive requests drain battery and data
7. **Scalability**: Backend can't handle concurrent requests from many users

The N+1 problem is one of the most common performance anti-patterns in frontend development.

## Bad Examples

### ❌ Component fetches its own data (N+1 problem)

```tsx
// components/user-list-item/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';

interface UserListItemProps {
  userId: string;
}

// Bad: Each item fetches its own data
export const UserListItem = ({ userId }: UserListItemProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Network call PER ITEM!
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <img src={user.getAvatarUrl()} alt={user.getFullName()} />
      <span>{user.getFullName()}</span>
    </div>
  );
};
```

```tsx
// pages/users/index.tsx
export const UsersPage = () => {
  const userIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div>
      {userIds.map((userId) => (
        // Bad: Renders 10 items, each makes its own network call = 10 requests!
        <UserListItem key={userId} userId={userId} />
      ))}
    </div>
  );
};
```

**Problems**:
- Rendering 10 users triggers **10 separate network calls**
- If you render 100 users, you make **100 network calls**
- Each request has ~50-200ms latency = 5-20 seconds for 100 items
- Backend gets hammered with concurrent requests
- Page loads items one-by-one (janky UX)
- Impossible to implement proper loading states
- Can't show "no users" state until all requests complete

### ❌ Sequential fetches in parent component

```tsx
// pages/users/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const userIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const loadedUsers: User[] = [];

      // Bad: Sequential fetches
      for (const userId of userIds) {
        const user = await userService.getUserById(userId);
        loadedUsers.push(user);
      }

      setUsers(loadedUsers);
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.getFullName()}</div>
      ))}
    </div>
  );
};
```

**Problems**:
- 10 sequential network calls
- Each call waits for previous to complete
- Total time = 10 × (latency + processing time)
- With 200ms latency: 10 × 200ms = 2 seconds minimum
- Still makes N requests for N items

### ❌ Parallel fetches (still N+1)

```tsx
// pages/users/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const userIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

      // Bad: Parallel fetches - better than sequential, but still N requests
      const userPromises = userIds.map((userId) =>
        userService.getUserById(userId)
      );

      const loadedUsers = await Promise.all(userPromises);
      setUsers(loadedUsers);
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.getFullName()}</div>
      ))}
    </div>
  );
};
```

**Problems**:
- Still makes 10 network requests (just in parallel)
- Browser limits concurrent connections (6-8 per domain)
- Backend gets hammered with concurrent requests
- Wastes bandwidth with repeated HTTP headers
- Doesn't scale - 100 users = 100 concurrent requests

## Good Examples

### ✅ Batch endpoint in service layer

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
   * Get single user by ID
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
   * Get multiple users by IDs in a single batch request
   */
  async getUsersByIds(userIds: string[]): Promise<User[]> {
    if (userIds.length === 0) return [];

    // Single request with comma-separated IDs
    const response = await this.apiClient.get<ServiceResponse<UserDTO[]>>(
      `/users?ids=${userIds.join(',')}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch users');
    }

    return response.data.map((dto) => User.fromJSON(dto));
  }

  /**
   * Get all users (with optional pagination)
   */
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ users: User[]; total: number; hasMore: boolean }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const response = await this.apiClient.get<
      ServiceResponse<{
        users: UserDTO[];
        total: number;
        page: number;
        limit: number;
      }>
    >(`/users?${queryParams.toString()}`);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch users');
    }

    return {
      users: response.data.users.map((dto) => User.fromJSON(dto)),
      total: response.data.total,
      hasMore: response.data.page * response.data.limit < response.data.total,
    };
  }
}

export const userService = new UserService();
```

**Benefits**:
- `getUsersByIds()` fetches multiple users in **one request**
- `getAllUsers()` supports pagination for large lists
- Backend handles batch logic
- Frontend makes minimal requests

### ✅ Parent component fetches all data, passes to children

```tsx
// pages/users/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';
import { UserListItem } from '@/components/user-list-item';
import { toast } from '@/components/toast';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Good: Single batch request for all users
        const result = await userService.getAllUsers({ limit: 50 });
        setUsers(result.users);
      } catch (error) {
        toast.error('Failed to load users');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (users.length === 0) return <div>No users found</div>;

  return (
    <div>
      {users.map((user) => (
        // Component receives data as props, doesn't fetch
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
};
```

```tsx
// components/user-list-item/index.tsx
import { User } from '@/types/user';
import styled from 'styled-components';

interface UserListItemProps {
  user: User; // Data passed as prop, not fetched
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <Container>
      <Avatar src={user.getAvatarUrl()} alt={user.getFullName()} />
      <Info>
        <span>{user.getFullName()}</span>
        <span>{user.email}</span>
      </Info>
    </Container>
  );
};
```

**Benefits**:
- **1 network call** instead of N calls
- Fast page load
- Consistent loading state
- Easy to implement "no users" state
- Child components are pure presentation

### ✅ Batch fetch with specific IDs

```tsx
// pages/team/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';
import { UserListItem } from '@/components/user-list-item';

export const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // IDs might come from parent context, API, or props
  const teamMemberIds = ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'];

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        // Good: Batch fetch by IDs - single request
        const members = await userService.getUsersByIds(teamMemberIds);
        setTeamMembers(members);
      } catch (error) {
        console.error('Failed to load team members', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) return <div>Loading team...</div>;

  return (
    <div>
      <h1>Team Members</h1>
      {teamMembers.map((member) => (
        <UserListItem key={member.id} user={member} />
      ))}
    </div>
  );
};
```

**Benefits**:
- Fetches 5 users in **1 request** instead of 5
- Service layer handles batch logic
- Clean, readable code

### ✅ Pagination for large lists

```tsx
// pages/users/index.tsx
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';
import { UserListItem } from '@/components/user-list-item';
import { Button } from '@/components/button';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const USERS_PER_PAGE = 20;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        // Good: Paginated fetch - loads 20 users at a time
        const result = await userService.getAllUsers({
          page,
          limit: USERS_PER_PAGE,
        });

        setUsers(result.users);
        setTotal(result.total);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  const handleNextPage = () => {
    if (hasMore) setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1>Users ({total} total)</h1>

      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}

      <div>
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={handleNextPage} disabled={!hasMore}>
          Next
        </Button>
      </div>
    </div>
  );
};
```

**Benefits**:
- Loads 20 users at a time instead of all at once
- Scales to thousands of users
- Fast initial page load
- Good for large datasets

### ✅ Infinite scroll with batching

```tsx
// pages/users/index.tsx
import { useEffect, useState, useRef, useCallback } from 'react';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';
import { UserListItem } from '@/components/user-list-item';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver>();
  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadMoreUsers = async () => {
      setLoading(true);
      try {
        // Good: Batch fetch with pagination
        const result = await userService.getAllUsers({
          page,
          limit: 20,
        });

        setUsers((prev) => [...prev, ...result.users]);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreUsers();
  }, [page]);

  return (
    <div>
      <h1>Users</h1>

      {users.map((user, index) => {
        // Attach ref to last item for infinite scroll
        if (index === users.length - 1) {
          return (
            <div key={user.id} ref={lastUserRef}>
              <UserListItem user={user} />
            </div>
          );
        }
        return <UserListItem key={user.id} user={user} />;
      })}

      {loading && <div>Loading more...</div>}
      {!hasMore && <div>No more users</div>}
    </div>
  );
};
```

**Benefits**:
- Loads 20 users at a time as user scrolls
- No "Load More" button needed
- Smooth UX with batching
- Scales to infinite lists

## Backend Batch Endpoint Requirements

For batch fetching to work, backend APIs must support:

### 1. Batch GET by IDs

```
GET /api/users?ids=1,2,3,4,5

Response:
{
  "success": true,
  "data": [
    { "id": "1", "first_name": "John", ... },
    { "id": "2", "first_name": "Jane", ... },
    ...
  ]
}
```

### 2. Paginated list endpoints

```
GET /api/users?page=1&limit=20

Response:
{
  "success": true,
  "data": {
    "users": [...],
    "total": 150,
    "page": 1,
    "limit": 20
  }
}
```

### 3. Search with pagination

```
GET /api/users?search=john&page=1&limit=20

Response:
{
  "success": true,
  "data": {
    "users": [...],
    "total": 12,
    "page": 1,
    "limit": 20
  }
}
```

## Performance Comparison

### N+1 Problem (Bad)
```
Fetching 100 users:
- 100 network requests
- 100 × 100ms latency = 10 seconds minimum
- High server load
- Poor mobile experience
```

### Batch Fetch (Good)
```
Fetching 100 users:
- 1 network request
- 1 × 100ms latency + processing = ~200ms
- 50x faster!
- Low server load
- Great mobile experience
```

## Review Checklist

When reviewing code, check for:

- [ ] No components fetch their own list item data
- [ ] Parent components fetch all data, pass to children as props
- [ ] Services provide batch endpoints (`getUsersByIds`, `getAllUsers`)
- [ ] Large lists use pagination or infinite scroll
- [ ] No `useEffect` in list item components making API calls
- [ ] Network tab shows 1 request for list, not N requests
- [ ] Backend APIs support batch fetching by IDs
- [ ] Pagination includes `total`, `hasMore`, `page` metadata

## Decision Framework

### When to use batch fetch vs pagination

- **Batch fetch (`getUsersByIds`)**: When you have specific IDs to load (e.g., team members, selected items)
- **Pagination (`getAllUsers`)**: When displaying all items with unknown total count
- **Infinite scroll**: When displaying large lists in mobile/modern UX
- **Traditional pagination**: When displaying large lists in admin/desktop UX

## Migration Path

If you find N+1 queries:

1. **Identify the pattern**: Find components fetching their own data
2. **Add batch endpoint**: Add `getUsersByIds()` or equivalent to service
3. **Update backend**: Ensure backend supports batch requests
4. **Refactor parent component**: Fetch all data at parent level
5. **Update child component**: Accept data as props, remove `useEffect`
6. **Test performance**: Verify network tab shows 1 request instead of N

### Migration Example

**Before**:
```tsx
// N+1 problem
<UserList>
  {userIds.map(id => <UserListItem userId={id} />)} {/* Each item fetches */}
</UserList>
```

**After**:
```tsx
// Batch fetch
const users = await userService.getUsersByIds(userIds); // 1 request
<UserList>
  {users.map(user => <UserListItem user={user} />)} {/* Props passed */}
</UserList>
```

## Related Guidelines

- **FE-04**: Service Layer for API Calls - Services must provide batch endpoints
- Frontend Architecture: `/docs/frontend-architecture.md` (Services section)

## References

- Frontend Architecture: `/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md`
- Service examples: `/frontend/services/`

## Common Questions

**Q: What if I only need to show 5 users? Is N+1 okay then?**
A: No. Even 5 requests is worse than 1. Always batch fetch.

**Q: What about real-time updates for individual items?**
A: Use WebSockets or polling for updates, but initial load should still be batched.

**Q: How do I handle batch requests that partially fail?**
A: Backend should return successful items + error list. Display what succeeded, show errors for rest.

**Q: What if backend doesn't support batch endpoints?**
A: Request backend to add batch support. This is a backend requirement for performant frontends.

---

**Last Updated**: 2025-11-02
**Severity**: CRITICAL
**Auto-reject**: Yes - N+1 queries cause severe performance issues and should be rejected
