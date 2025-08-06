import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit3, Check, X } from "lucide-react";
import type { Todo } from "@/types/todo";
import { useTodoStore } from "@/store/useTodoStore";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.body);
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleUpdate = async () => {
    if (editText.trim() !== todo.body) {
      await updateTodo(todo.id, { body: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <Card
      className={`transition-all duration-200 ${
        todo.completed ? "bg-gray-50" : "bg-white"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={handleToggle}
          />

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  autoFocus
                />
                <Button size="sm" onClick={handleUpdate} className="px-3">
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="px-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {todo.body}
                </span>

                <Badge
                  variant={todo.completed ? "default" : "secondary"}
                  className={
                    todo.completed
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {todo.completed ? "Completed" : "Pending"}
                </Badge>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="px-2 h-8"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
