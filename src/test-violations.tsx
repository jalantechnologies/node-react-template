// Test file to demonstrate Claude Code review catching violations

import React from 'react';

// Violation [GP-2]: Generic naming - should be UserRegistrationForm
// Violation [GP-5]: Action naming (CreateUser) instead of entity naming
export function CreateUser() {
  // Violation [FE-4]: Direct fetch in component instead of service layer
  const handleSubmit = async (data: any) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  };

  // Violation [FE-1]: Inline styles instead of CSS classes
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>Create User</h1>
      <form onSubmit={() => handleSubmit({ name: 'test' })}>
        <button style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

// Violation [GP-4]: Functional programming instead of OOP
// Should be a class method
export function proc(d: any) {
  return d.map((x: any) => x.value);
}

// Violation [BE-5]: Business logic in what looks like a controller
// This should be in service layer
export async function createUserController(req: any, res: any) {
  // Business logic here instead of service
  const userData = req.body;

  // Violation [BE-7]: N+1 query pattern
  const userIds = [1, 2, 3, 4, 5];
  const users = [];
  for (const id of userIds) {
    const user = await fetch(`/api/users/${id}`).then(r => r.json());
    users.push(user);
  }

  // Controller formatting response - violation [BE-6]
  return res.json({ success: true, users });
}
