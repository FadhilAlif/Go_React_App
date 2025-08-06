"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit3, Check, X, Plus } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editText.trim() } : task
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Go React ToDo
          </h1>
          <p className="text-gray-600">Manage your tasks with ease</p>
        </div>

        {/* Add Task Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add new task..."
                value={newTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTask(e.target.value)
                }
                onKeyPress={(e: React.KeyboardEvent) =>
                  handleKeyPress(e, addTask)
                }
                className="flex-1"
              />
              <Button onClick={addTask} className="px-4">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">
                  No Task available. Please add a new task.
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                className={`transition-all duration-200 ${
                  task.completed ? "bg-gray-50" : "bg-white"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleComplete(task.id)}
                    />

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      {editingId === task.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editText}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setEditText(e.target.value)}
                            onKeyPress={(e: React.KeyboardEvent) =>
                              handleKeyPress(e, () => saveEdit(task.id))
                            }
                            className="flex-1"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => saveEdit(task.id)}
                            className="px-3"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                            className="px-3"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex-1 ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {task.text}
                          </span>

                          {/* Status Badge */}
                          <Badge
                            variant={task.completed ? "default" : "secondary"}
                            className={
                              task.completed
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </Badge>

                          {/* Action Buttons */}
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(task.id, task.text)}
                              className="px-2 h-8"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteTask(task.id)}
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
            ))
          )}
        </div>

        {/* Summary */}
        {tasks.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Total: {tasks.length} Task</span>
                <span>
                  Finished: {tasks.filter((task) => task.completed).length}
                </span>
                <span>
                  Pending: {tasks.filter((task) => !task.completed).length}
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
