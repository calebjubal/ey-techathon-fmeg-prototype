import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import bgimg from "@/assets/ey building image.jpg";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.detail || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
      <Card className="w-full max-w-md shadow-xl bg-gray-900">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
          <CardDescription className="text-center text-white">
            Sign up to get started with our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 border-white text-white"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 border-white text-white"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-white">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-10 border-white text-white"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 border border-green-200">
                {success}
              </div>
            )}

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-6 bg-yellow-300 hover:bg-linear-to-br from-yellow-400 via-amber-300 to-orange-400 cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-yellow-300 hover:text-yellow-400">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
