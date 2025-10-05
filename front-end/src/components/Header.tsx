"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import styles from "./Header.module.css";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.title}>
            Kobizo Technical Assignment
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/products" className={styles.navLink}>
              Products
            </Link>
            <Link href="/blog" className={styles.navLink}>
              Blog
            </Link>
            <a href="#" className={styles.navLink}>
              About
            </a>
          </nav>

          <div className={styles.authSection}>
            {isLoading ? (
              <div className={styles.loading}>Loading...</div>
            ) : user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  Hello, {user.first_name || user.email}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={styles.loginButton}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
