export interface Todo {
  id: number;
  userId: number;
  title: string;
  body: string;
  completed: boolean;
}

export interface CreateTodoData {
  title: string;
  body: string;
}

export interface UpdateTodoData {
  title?: string;
  body?: string;
  completed?: boolean;
}