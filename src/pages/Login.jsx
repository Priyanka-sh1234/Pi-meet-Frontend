import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { roleAtom, secretKeyAtom, userAtom } from "../store/atoms";
import { loginUser } from "../api/auth";
import { message } from "antd";
import image from "../assets/images.png";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../components/lib/utils";
import { BackgroundLines } from "../components/ui/BackgroundLines";
import { setAuthHeader } from "../../axiosinstance"; // ✅ import this

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setRole = useSetAtom(roleAtom);
  const setSecret = useSetAtom(secretKeyAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      message.warning("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(id, password);

      setSecret(data.token);
      setRole(data.user.role);
      setUser(data.user);

      // ✅ Set headers globally for axios requests
      setAuthHeader(data.token, data.user.role);

      message.success(data.message || "Login successful!");

      // Redirect based on role
      const role = data.user.role.toLowerCase();
      if (role === "admin") navigate("/Admin-Dashboard");
      else if (role === "trainer") navigate("/Trainer-dashboard");
      else navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid credentials.";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLines className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      <img
        src={image}
        alt="PiSoft Logo Background"
        className="absolute w-124 h-auto opacity-100 z-0"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <div className="z-10 shadow-input mx-auto w-126 max-w-md rounded-none p-4 md:rounded-2xl md:p-8 backdrop-blur-sm bg-white/10  border border-white/20 dark:border-gray-700 flex items-center justify-center flex-col">
        <div className="w-full">
          <h2 className="text-xl font-bold text-center text-blue-200 dark:text-blue-400">
            Welcome to Pi-Meet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-center text-neutral-300 dark:text-neutral-400">
            Login to Pi-Meet to learn from experts
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="id"
                className="text-neutral-200 dark:text-neutral-300"
              >
                Username
              </Label>
              <Input
                id="id"
                placeholder="Enter username"
                type="text"
                autoComplete="username"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="password"
                className="text-neutral-200 dark:text-neutral-300"
              >
                Password
              </Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            <button
              disabled={loading}
              type="submit"
              className={cn(
                "group/btn relative block mt-8 h-10 w-full rounded-md font-medium text-white",
                "bg-gradient-to-br from-orange-500 to-blue-600",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? "Signing in..." : "Sign in →"}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </BackgroundLines>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100 dark:via-cyan-300" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100 dark:via-indigo-300" />
  </>
);
