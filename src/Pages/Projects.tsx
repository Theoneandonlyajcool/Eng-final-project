import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { useData } from "@/contexts/DataProvider";
import type { Project } from "@/types";
import { Plus } from "lucide-react";

export function Projects() {
  const { projects, addProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "ownerId">,
  ) => {
    addProject({ ...projectData, ownerId: "1" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
