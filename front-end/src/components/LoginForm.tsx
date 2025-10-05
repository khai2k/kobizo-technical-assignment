"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login({ email, password });

    if (success) {
      onSuccess?.();
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <p className={styles.subtitle}>
        Welcome back! Please sign in to your account.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className={styles.link}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
