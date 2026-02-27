import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (
    project: Omit<Project, "id" | "updatedAt" | "ownerId" | "createdAt"> & {
      createdAt?: Date;
    },
  ) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [createdAt, setCreatedAt] = useState(() => {
    if (!project?.createdAt) return "";
    const date = new Date(project.createdAt);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      ...(createdAt ? { createdAt: new Date(createdAt) } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Project Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="createdAt" className="block text-sm font-medium mb-1">
          Project Date
        </label>
        <Input
          id="createdAt"
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
