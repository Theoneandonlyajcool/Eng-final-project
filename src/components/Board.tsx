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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
