import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { Login } from "@/Pages/Login";
import { Dashboard } from "@/Pages/Dashboard";
import { Projects } from "@/Pages/Projects";
import { ProjectBoard } from "@/Pages/ProjectBoard";
import { TaskDetail } from "@/Pages/TaskDetail";
import { Profile } from "@/Pages/Profile";
import { Spinner } from "@/components/ui/spinner";
// import { Button } from "@/components/ui/button";
import { DataProvider } from "@/contexts/DataProvider";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<AuthGate />} />
            </Routes>
            <Toaster position="top-center" richColors />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthGate() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectBoard />} />
        <Route path="/projects/:id/tasks/:taskId" element={<TaskDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
