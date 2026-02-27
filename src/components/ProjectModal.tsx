import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import type { Project } from "@/types";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSubmit: (
    project: Omit<Project, "id" | "updatedAt" | "ownerId" | "createdAt"> & {
      createdAt?: Date;
    },
  ) => void;
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit,
}: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>
        <ProjectForm
          project={project}
          onSubmit={(projectData) => {
            onSubmit(projectData);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
