import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function Profile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const storedCredentials = sessionStorage.getItem("User_Credentials");
      if (storedCredentials) {
        const parsed = JSON.parse(storedCredentials) as {
          name?: string;
          email?: string;
        };
        setName(parsed.name || user?.name || "");
        setEmail(parsed.email || user?.email || "");
        return;
      }
    } catch {
      // Fallback to auth user below
    }

    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user?.name, user?.email]);

  const handleSaveChanges = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      const existing = sessionStorage.getItem("User_Credentials");
      const parsedExisting = existing ? JSON.parse(existing) : {};

      sessionStorage.setItem(
        "User_Credentials",
        JSON.stringify({
          ...parsedExisting,
          name: name.trim(),
          email: email.trim(),
        }),
      );

      window.dispatchEvent(new Event("user-credentials-updated"));

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Unable to save profile");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={logout}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
