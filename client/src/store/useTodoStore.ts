import { create } from "zustand";
import api from "../../config/axios";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  createTodo: (input: CreateTodoInput) => Promise<void>;
  updateTodo: (id: number, input: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<Todo[]>("/todos");
      set({ todos: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch todos", isLoading: false });
      console.error(error);
    }
  },

  createTodo: async (input: CreateTodoInput) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<Todo>("/todos", input);
      set((state) => ({
        todos: [...state.todos, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create todo", isLoading: false });
      console.error(error);
    }
  },

  updateTodo: async (id: number, input: UpdateTodoInput) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.put<Todo>(`/todos/${id}`, input);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? response.data : todo
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update todo", isLoading: false });
      console.error(error);
    }
  },

  deleteTodo: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.delete(`/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete todo", isLoading: false });
      console.error(error);
    }
  },
}));
