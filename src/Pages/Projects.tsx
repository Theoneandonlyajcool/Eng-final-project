import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { useData } from "@/contexts/DataProvider";
import type { Project } from "@/types";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined,
  );

  const handleCreateProject = (
    projectData: Omit<Project, "id" | "updatedAt" | "ownerId" | "createdAt"> & {
      createdAt?: Date;
    },
  ) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(undefined);
      return;
    }

    addProject({ ...projectData, ownerId: "1" });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    deleteProject(project.id);
    toast.success("Project deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button
          className="bg-linear-to-br from-orange-500 to-orange-700 text-white cursor-pointer hover:from-orange-600 hover:to-orange-800 transition-all duration-500 hover:scale-105"
          onClick={() => {
            setEditingProject(undefined);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          No projects found. Create one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(undefined);
        }}
        project={editingProject}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
