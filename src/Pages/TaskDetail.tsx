import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";

// Mock task data - in real app, fetch by ID
const mockTask = {
  id: "1",
  title: "Design homepage mockup",
  description:
    "Create wireframes and mockups for the new homepage. Include user flow diagrams and responsive design considerations.",
  status: "todo" as const,
  priority: "high" as const,
  projectId: "1",
  createdAt: new Date("2024-02-01"),
  updatedAt: new Date("2024-02-01"),
  dueDate: new Date("2024-02-15"),
  assigneeId: "1",
};

export function TaskDetail() {
  const { id, taskId } = useParams();

  // In real app, fetch task by taskId
  const task = mockTask;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to={`/projects/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Board
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{task.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created on {task.createdAt.toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated on {task.updatedAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-1">
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <div className="mt-1">
                  <Badge variant="secondary">{task.priority}</Badge>
                </div>
              </div>

              {task.dueDate && (
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {task.dueDate.toLocaleDateString()}
                  </div>
                </div>
              )}

              {task.assigneeId && (
                <div>
                  <label className="text-sm font-medium">Assignee</label>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    John Doe
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button className="w-full">Edit Task</Button>
        </div>
      </div>
    </div>
  );
}
