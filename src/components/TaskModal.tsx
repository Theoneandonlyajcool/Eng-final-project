import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import type { Task } from "@/types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  projectId: string;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
}

export function TaskModal({
  isOpen,
  onClose,
  task,
  projectId,
  onSubmit,
}: TaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <TaskForm
          task={task}
          projectId={projectId}
          onSubmit={(taskData) => {
            onSubmit(taskData);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
