import { useParams } from "react-router-dom";
import { useState } from "react";
import { Board } from "@/components/Board";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataProvider";
import type { Task } from "@/types";
import type { DragEndEvent } from "@dnd-kit/core";
import { ArrowLeft, Search, Filter } from "lucide-react";

export function ProjectBoard() {
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("todo");

  // Filter tasks for this project
  const projectTasks = tasks.filter((task) => task.projectId === id);

  const handleAddTask = (status: Task["status"]) => {
    setNewTaskStatus(status);
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleSubmitTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (editingTask) {
      // Edit existing task
      updateTask(editingTask.id, taskData);
    } else {
      // Create new task
      addTask(taskData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold">Project Board</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Board
        tasks={projectTasks}
        onAddTask={handleAddTask}
        onDragEnd={handleDragEnd}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        projectId={id || "1"}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
}
