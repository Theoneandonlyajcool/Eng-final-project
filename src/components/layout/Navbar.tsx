import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const syncUserName = () => {
      try {
        const storedCredentials = sessionStorage.getItem("User_Credentials");
        if (storedCredentials) {
          const parsed = JSON.parse(storedCredentials) as {
            name?: string;
          };
          setName(parsed.name || user?.name || "");
          return;
        }
      } catch {
        // Fallback to auth user below
      }

      setName(user?.name || "");
    };

    syncUserName();
    window.addEventListener("user-credentials-updated", syncUserName);

    return () => {
      window.removeEventListener("user-credentials-updated", syncUserName);
    };
  }, [user?.name, user?.email]);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-3 sm:px-4">
        <div className="flex items-center min-w-0">
          <Link to="/dashboard" className="mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #f97316, #c2410c)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                className="text-xl font-bold tracking-wide"
                style={{
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.05em",
                }}
              >
                Task manager
              </span>
            </div>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <div
            className="hidden sm:flex items-center space-x-2 min-w-0 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={user?.avatar}
              alt={name}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium truncate max-w-28 md:max-w-none">
              {name || "User"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
