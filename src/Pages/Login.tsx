import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-6 bg-card rounded-lg border">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to TaskPilot</h1>
          <p className="text-muted-foreground">
            Sign in to manage your projects and tasks
          </p>
        </div>
        <Button onClick={handleLogin} className="w-full" size="lg">
          Sign In
        </Button>
      </div>
    </div>
  );
}
