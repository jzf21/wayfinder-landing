"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Circle, Plus, ListTodo } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Research navigation patterns", completed: false },
    { id: 2, text: "Analyze user feedback", completed: false },
    { id: 3, text: "Update documentation", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Math.max(0, ...todos.map((t) => t.id)) + 1,
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto p-8 pt-24">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="flex items-center gap-2 mb-6">
            <ListTodo className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Todo List</h1>
          </div>

          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="flex-1"
            />
            <Button onClick={addTodo} className="gap-2">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>

          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  todo.completed
                    ? "bg-primary/5 text-muted-foreground"
                    : "bg-card hover:bg-accent/50"
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </Button>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {todos.filter((t) => !t.completed).length} remaining ·{" "}
            {todos.filter((t) => t.completed).length} completed
          </div>
        </Card>
      </main>

    
    </div>
  );
}