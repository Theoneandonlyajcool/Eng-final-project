import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { Calendar, Users } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      toast.error("Project deleted successfully");
      setIsDeleting(false);
      onDelete(project);
    }, 3000);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <ToastContainer />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(project)}
                className="cursor-pointer"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className={`bg-linear-to-br from-orange-500 to-orange-700 text-white  ${isDeleting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                size="sm"
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {/* TODO: Add member count */}1
            </div>
          </div>
          <Link to={`/projects/${project.id}`}>
            <Button className="w-full bg-linear-to-br from-orange-500 to-orange-700 text-white cursor-pointer hover:from-orange-600 hover:to-orange-800 transition-all duration-500 hover:scale-105">
              View Board
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
