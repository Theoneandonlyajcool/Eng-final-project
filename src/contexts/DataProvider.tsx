import React, { createContext, useContext, useEffect, useState } from "react";
import type { Project, Task } from "@/types";

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  addProject: (
    project: Omit<Project, "id" | "updatedAt" | "createdAt"> & {
      createdAt?: Date;
    },
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

// Initial mock data
const initialProjects: Project[] = [
  // {
  //   id: "1",
  //   name: "Website Redesign",
  //   description: "Redesign the company website with modern UI",
  //   createdAt: new Date("2024-01-15"),
  //   updatedAt: new Date("2024-02-01"),
  //   ownerId: "1",
  // },
  // {
  //   id: "2",
  //   name: "Mobile App Development",
  //   description: "Develop a mobile app for customer engagement",
  //   createdAt: new Date("2024-01-20"),
  //   updatedAt: new Date("2024-02-05"),
  //   ownerId: "1",
  // },
  // {
  //   id: "3",
  //   name: "Marketing Campaign",
  //   description: "Q1 marketing campaign planning and execution",
  //   createdAt: new Date("2024-02-01"),
  //   updatedAt: new Date("2024-02-10"),
  //   ownerId: "1",
  // },
];

const initialTasks: Task[] = [
  // {
  //   id: "1",
  //   title: "Design homepage mockup",
  //   description: "Create wireframes and mockups for the new homepage",
  //   status: "todo",
  //   priority: "high",
  //   projectId: "1",
  //   createdAt: new Date("2024-02-01"),
  //   updatedAt: new Date("2024-02-01"),
  //   dueDate: new Date("2024-02-15"),
  // },
  // {
  //   id: "2",
  //   title: "Implement user authentication",
  //   description: "Set up login and registration system",
  //   status: "in-progress",
  //   priority: "high",
  //   projectId: "1",
  //   createdAt: new Date("2024-02-02"),
  //   updatedAt: new Date("2024-02-05"),
  //   assigneeId: "1",
  // },
  // {
  //   id: "3",
  //   title: "Write API documentation",
  //   description: "Document all API endpoints",
  //   status: "done",
  //   priority: "medium",
  //   projectId: "1",
  //   createdAt: new Date("2024-01-30"),
  //   updatedAt: new Date("2024-02-10"),
  // },
  // {
  //   id: "4",
  //   title: "Set up CI/CD pipeline",
  //   description: "Configure automated testing and deployment",
  //   status: "todo",
  //   priority: "medium",
  //   projectId: "1",
  //   createdAt: new Date("2024-02-03"),
  //   updatedAt: new Date("2024-02-03"),
  // },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    const storedTasks = localStorage.getItem("tasks");

    if (storedProjects) {
      try {
        const parsed = JSON.parse(storedProjects);
        setProjects(parsed);
      } catch {
        setProjects(initialProjects);
        localStorage.setItem("projects", JSON.stringify(initialProjects));
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem("projects", JSON.stringify(initialProjects));
    }

    if (storedTasks) {
      try {
        const parsed = JSON.parse(storedTasks);
        setTasks(parsed);
      } catch {
        setTasks(initialTasks);
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
      }
    } else {
      setTasks(initialTasks);
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }

    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isHydrated]);

  const addProject = (
    projectData: Omit<Project, "id" | "updatedAt" | "createdAt"> & {
      createdAt?: Date;
    },
  ) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: projectData.createdAt
        ? new Date(projectData.createdAt)
        : new Date(),
      updatedAt: new Date(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project,
      ),
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setTasks((prev) => prev.filter((task) => task.projectId !== id));
  };

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        tasks,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
