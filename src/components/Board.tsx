import { Column } from "./Column";
import type { Task } from "@/types";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

interface BoardProps {
  tasks: Task[];
  onAddTask?: (status: Task["status"]) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}

export function Board({ tasks, onAddTask, onDragEnd }: BoardProps) {
  const columns = [
    {
      title: "To Do",
      status: "todo" as const,
      tasks: tasks.filter((task) => task.status === "todo"),
    },
    {
      title: "In Progress",
      status: "in-progress" as const,
      tasks: tasks.filter((task) => task.status === "in-progress"),
    },
    {
      title: "Done",
      status: "done" as const,
      tasks: tasks.filter((task) => task.status === "done"),
    },
  ];

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={column.tasks}
            onAddTask={() => onAddTask?.(column.status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
