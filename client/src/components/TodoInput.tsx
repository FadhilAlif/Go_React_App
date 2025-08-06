import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useTodoStore } from "@/store/useTodoStore";

export const TodoInput = () => {
  const [body, setBody] = useState("");
  const createTodo = useTodoStore((state) => state.createTodo);

  const isValidInput = (text: string) => {
    return /[a-zA-Z0-9]/.test(text.trim()); // harus ada minimal 1 huruf atau angka
  };

  const handleSubmit = async () => {
    if (isValidInput(body)) {
      await createTodo({ body: body.trim(), completed: false });
      setBody("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add new task..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSubmit}
            className="px-4"
            disabled={!isValidInput(body)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
