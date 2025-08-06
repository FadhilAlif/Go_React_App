export interface Todo {
  id: number;
  body: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTodoInput {
  body: string;
  completed: boolean;
}

export interface UpdateTodoInput {
  body?: string;
  completed?: boolean;
}
