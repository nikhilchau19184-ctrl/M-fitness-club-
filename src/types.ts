import React from 'react';

export type Role = 'Admin' | 'Trainer' | 'Member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  plan?: string;
}

export interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}
