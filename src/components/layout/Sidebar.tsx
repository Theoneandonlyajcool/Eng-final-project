import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, User } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col py-2 md:pt-5 md:pb-4 overflow-x-auto md:overflow-y-auto">
          <nav className="flex md:flex-1 gap-1 md:flex-col px-2 min-w-max md:min-w-0">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-linear-to-br from-orange-500 to-orange-700 text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="mr-2 md:mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
