
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  department?: string;
  location?: string;
  lastActive?: string;
  joinDate?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 1,
    first_name: "Janet",
    last_name: "Weaver",
    email: "janet.weaver@example.com",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    role: "admin",
    status: "active",
    department: "Engineering",
    location: "San Francisco",
    lastActive: "Today",
    joinDate: "2022-01-05"
  },
  {
    id: 2,
    first_name: "Emma",
    last_name: "Wong",
    email: "emma.wong@example.com",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    role: "user",
    status: "active",
    department: "Marketing",
    location: "New York",
    lastActive: "Yesterday",
    joinDate: "2022-02-10"
  },
  {
    id: 3,
    first_name: "Eve",
    last_name: "Holt",
    email: "eve.holt@example.com",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    role: "editor",
    status: "inactive",
    department: "Product",
    location: "Chicago",
    lastActive: "2 days ago",
    joinDate: "2022-03-15"
  },
  {
    id: 4,
    first_name: "Charles",
    last_name: "Morris",
    email: "charles.morris@example.com",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    role: "user",
    status: "active",
    department: "Sales",
    location: "London",
    lastActive: "Today",
    joinDate: "2022-04-20"
  },
  {
    id: 5,
    first_name: "Tracey",
    last_name: "Ramos",
    email: "tracey.ramos@example.com",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    role: "editor",
    status: "pending",
    department: "Design",
    location: "Paris",
    lastActive: "3 days ago",
    joinDate: "2022-05-25"
  },
  {
    id: 6,
    first_name: "Michael",
    last_name: "Lawson",
    email: "michael.lawson@example.com",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
    role: "user",
    status: "active",
    department: "Support",
    location: "Berlin",
    lastActive: "Today",
    joinDate: "2022-06-30"
  },
  {
    id: 7,
    first_name: "Lindsay",
    last_name: "Ferguson",
    email: "lindsay.ferguson@example.com",
    avatar: "https://reqres.in/img/faces/8-image.jpg",
    role: "user",
    status: "inactive",
    department: "HR",
    location: "Tokyo",
    lastActive: "1 week ago",
    joinDate: "2022-07-05"
  },
  {
    id: 8,
    first_name: "Tobias",
    last_name: "Funke",
    email: "tobias.funke@example.com",
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    role: "editor",
    status: "active",
    department: "Legal",
    location: "Sydney",
    lastActive: "Yesterday",
    joinDate: "2022-08-10"
  },
  {
    id: 9,
    first_name: "Byron",
    last_name: "Fields",
    email: "byron.fields@example.com",
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    role: "admin",
    status: "active",
    department: "Executive",
    location: "Singapore",
    lastActive: "Today",
    joinDate: "2022-09-15"
  },
  {
    id: 10,
    first_name: "George",
    last_name: "Edwards",
    email: "george.edwards@example.com",
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    role: "user",
    status: "pending",
    department: "Finance",
    location: "Toronto",
    lastActive: "4 days ago",
    joinDate: "2022-10-20"
  },
  {
    id: 11,
    first_name: "Rachel",
    last_name: "Howell",
    email: "rachel.howell@example.com",
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    role: "user",
    status: "active",
    department: "Research",
    location: "Melbourne",
    lastActive: "Today",
    joinDate: "2022-11-25"
  },
  {
    id: 12,
    first_name: "Alex",
    last_name: "Garcia",
    email: "alex.garcia@example.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    role: "editor",
    status: "active",
    department: "Development",
    location: "Madrid",
    lastActive: "Yesterday",
    joinDate: "2022-12-30"
  }
];

// Mock Roles Data
export const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'],
    userCount: 2,
  },
  {
    id: 'r2',
    name: 'Editor',
    description: 'Can manage content but not administrative functions',
    permissions: ['p1', 'p3', 'p5', 'p9', 'p11'],
    userCount: 5,
  },
  {
    id: 'r3',
    name: 'User',
    description: 'Basic access to the system',
    permissions: ['p1', 'p5', 'p9'],
    userCount: 15,
  }
];

// Mock Permissions Data
export const mockPermissions: Permission[] = [
  { id: 'p1', name: 'users:read', description: 'View user information', category: 'Users' },
  { id: 'p2', name: 'users:create', description: 'Create new users', category: 'Users' },
  { id: 'p3', name: 'users:update', description: 'Edit user information', category: 'Users' },
  { id: 'p4', name: 'users:delete', description: 'Delete users from the system', category: 'Users' },
  { id: 'p5', name: 'roles:read', description: 'View roles and permissions', category: 'Roles' },
  { id: 'p6', name: 'roles:create', description: 'Create new roles', category: 'Roles' },
  { id: 'p7', name: 'roles:update', description: 'Edit roles and their permissions', category: 'Roles' },
  { id: 'p8', name: 'roles:delete', description: 'Delete roles from the system', category: 'Roles' },
  { id: 'p9', name: 'reports:read', description: 'View analytics reports', category: 'Reports' },
  { id: 'p10', name: 'reports:export', description: 'Export analytics reports', category: 'Reports' },
  { id: 'p11', name: 'settings:read', description: 'View system settings', category: 'Settings' },
  { id: 'p12', name: 'settings:update', description: 'Update system settings', category: 'Settings' }
];
