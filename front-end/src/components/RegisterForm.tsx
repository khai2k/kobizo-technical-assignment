"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./LoginForm.module.css";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    if (success) {
      onSuccess?.();
    } else {
      setError("Registration failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>
        Join us today! Create your account to get started.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
            placeholder="Enter your first name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
            placeholder="Enter your last name"
          />
        </div>

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
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className={styles.link}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
