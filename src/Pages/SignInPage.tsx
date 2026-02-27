import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";

type FocusedField = "name" | "email" | "password" | null;

type FloatingParticleProps = {
  style: CSSProperties;
};

const FloatingParticle = ({ style }: FloatingParticleProps) => (
  <div
    className="absolute rounded-full opacity-20 animate-pulse"
    style={style}
  />
);

export default function SignInPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<FocusedField>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      // setFormError("Please fill in all fields before signing in.");
      toast.error("Please fill in all fields before signing in.");
      return;
    }

    setFormError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
      sessionStorage.setItem(
        "User_Credentials",
        JSON.stringify({ name, email, password }),
      );
      login();
    }, 2000);
  };

  const particles = [
    {
      width: 8,
      height: 8,
      top: "15%",
      left: "10%",
      background: "#f97316",
      animationDuration: "3s",
    },
    {
      width: 5,
      height: 5,
      top: "70%",
      left: "8%",
      background: "#fb923c",
      animationDuration: "4s",
    },
    {
      width: 12,
      height: 12,
      top: "30%",
      right: "12%",
      background: "#fdba74",
      animationDuration: "2.5s",
    },
    {
      width: 6,
      height: 6,
      top: "80%",
      right: "15%",
      background: "#f97316",
      animationDuration: "3.5s",
    },
    {
      width: 4,
      height: 4,
      top: "50%",
      left: "5%",
      background: "#fb923c",
      animationDuration: "5s",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-orange-900 opacity-20" />
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full border border-orange-800 opacity-15" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full border border-orange-900 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-stone-800 opacity-30" />
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 opacity-10"
          style={{
            background: "radial-gradient(circle, #ea580c 0%, transparent 70%)",
          }}
        />
        {particles.map((p, i) => (
          <FloatingParticle key={i} style={p} />
        ))}
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg z-10">
        {/* Glow effect behind card */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 blur-xl"
          style={{ background: "linear-gradient(135deg, #f97316, #92400e)" }}
        />

        <div
          className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
          style={{
            background:
              "linear-gradient(160deg, rgba(28,20,10,0.98) 0%, rgba(15,10,5,0.99) 100%)",
            border: "1px solid rgba(249,115,22,0.15)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Logo / Brand */}
          <div className="mb-10">
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
                  color: "#fafaf9",
                  letterSpacing: "0.05em",
                }}
              >
                Task manager
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-stone-100 mb-2"
              style={{ fontFamily: "'Georgia', serif", lineHeight: 1.2 }}
            >
              Welcome back.
            </h1>
            <p className="text-stone-500 text-sm sm:text-base">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formError) setFormError("");
                  }}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your full name"
                  required
                  className="w-full rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-600 text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border:
                      focused === "name"
                        ? "1px solid rgba(249,115,22,0.6)"
                        : "1px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      focused === "name"
                        ? "0 0 0 3px rgba(249,115,22,0.1)"
                        : "none",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError("");
                  }}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-600 text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border:
                      focused === "email"
                        ? "1px solid rgba(249,115,22,0.6)"
                        : "1px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      focused === "email"
                        ? "0 0 0 3px rgba(249,115,22,0.1)"
                        : "none",
                  }}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError("");
                  }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••"
                  required
                  className="w-full rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-600 text-sm outline-none transition-all duration-300 pr-12"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border:
                      focused === "password"
                        ? "1px solid rgba(249,115,22,0.6)"
                        : "1px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      focused === "password"
                        ? "0 0 0 3px rgba(249,115,22,0.1)"
                        : "none",
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="23"
                        y2="23"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            {/* <div className="flex items-center gap-3">
              <button
                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: "#f97316" }}
                />
              </button>
              <span className="text-sm text-stone-500">Keep me signed in</span>
            </div> */}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 relative overflow-hidden mt-2 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              style={{
                background: isLoading
                  ? "linear-gradient(135deg, #92400e, #78350f)"
                  : "linear-gradient(135deg, #f97316, #ea580c, #c2410c)",
                boxShadow: isLoading
                  ? "none"
                  : "0 8px 32px rgba(249,115,22,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    SIGN IN
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {formError && (
              <p className="text-sm text-red-400" role="alert">
                {formError}
              </p>
            )}
          </div>

          {/* Divider */}
          {/* <div className="flex items-center gap-4 my-7">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span className="text-xs text-stone-600 uppercase tracking-widest">
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div> */}

          {/* Social buttons */}
          {/* <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Google",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#e7e5e4"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm text-stone-400 hover:text-stone-200 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {icon}
                <span className="text-xs font-medium tracking-wide">
                  {label}
                </span>
              </button>
            ))}
          </div> */}

          {/* Footer */}
          {/* <p className="text-center text-stone-600 text-sm mt-8">
            No account yet?{" "}
            <button className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
              Create one free
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
}
