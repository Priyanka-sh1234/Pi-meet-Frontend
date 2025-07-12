import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { roleAtom, secretKeyAtom } from '../store/atoms';
import { loginUser } from '../api/auth';
import { message } from 'antd';
import image from '../assets/images.png'; // your background image
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../components/lib/utils';
import { BackgroundLines } from '../components/ui/BackgroundLines';

export default function AdminLogin() {
  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const setRole = useSetAtom(roleAtom);
  const setSecret = useSetAtom(secretKeyAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(admin, password);
      console.log("Login success:", data);
    navigate("/AdminDashboard")

      setSecret(data.token);
      setRole(data.user.role);

      localStorage.setItem('secretKey', data.token);
      localStorage.setItem('role', data.user.role);

      message.success(data.message || 'Login successful!');
      // navigate(`/${data.user.role.charAt(0).toUpperCase() + data.user.role.slice(1)}Dashboard`);
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
      <div className="z-10 shadow-input mx-auto w-126 max-w-md rounded-none p-4 md:rounded-2xl md:p-8 backdrop-blur-sm bg-white/10 dark:bg-gray-100 flex items-center justify-center border border-white/20 flex-col">
        <div className="w-full">
          <h2 className="text-xl font-bold text-center text-blue-200">Welcome to Pi-Meet</h2>
          <p className="mt-2 max-w-sm text-sm text-center text-neutral-300">
            Login to Pi-Meet to learn from experts
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="admin" className="text-neutral-200">Username</Label>
              <Input
                id="id"
                placeholder="Enter username"
                type="text"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password" className="text-neutral-200">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
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
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);
