import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";
import { useTodoStore } from "@/store/useTodoStore";

function App() {
  const { todos, isLoading, error, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Go React ToDo
          </h1>
          <p className="text-gray-600">Manage your tasks with ease</p>
        </div>

        <TodoInput />

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Loading...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-500">{error}</p>
            </CardContent>
          </Card>
        ) : todos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                No tasks available. Please add a new task.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}

        {todos.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Total: {todos.length} Tasks</span>
                <span>
                  Finished: {todos.filter((todo) => todo.completed).length}
                </span>
                <span>
                  Pending: {todos.filter((todo) => !todo.completed).length}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
