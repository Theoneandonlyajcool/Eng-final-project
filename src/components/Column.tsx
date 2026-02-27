import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "@/types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask?: () => void;
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
};

export function Column({ title, status, tasks, onAddTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col w-full min-w-0 rounded-lg p-3 sm:p-4 bg-gray-500">
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-sm font-semibold px-2 py-1 rounded ${statusColors[status]}`}
        >
          {title} ({tasks.length})
        </h3>
        <Button
          className="text-white"
          variant="ghost"
          size="sm"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 space-y-3 overflow-y-auto min-h-[200px] p-2 rounded ${
          isOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""
        }`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
