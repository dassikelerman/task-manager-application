// team.model.ts

export interface Team {
  id: number;
  name: string;
  created_at: string;
  members_count: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  team_id: number;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id?: number;
  project_id?: number;
  projectId?: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'normal' | 'high';
  assignee_id?: number;
  assigneeId?: number;
  order_index?: number;
  orderIndex?: number;
  due_date?: string;
  dueDate?: string;
  created_at?: string;
  updated_at?: string;
  author_name?: string;
}

export interface Comment {
  id: number;
  task_id: number;
  user_id: number;
  body: string;
  created_at: string;
  author_name?: string;
}

// תוקן לפי הPostman collection - צריך userId (number) ולא user_email (string)
export interface AddMemberRequest {
  userId: number;
  role: 'member' | 'admin';
}

// ממשק חדש למיפוי תוויות עדיפות
export interface PriorityLabels {
  low: string;
  normal: string;
  high: string;
}
