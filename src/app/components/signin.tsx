"use client";

import React, { useState } from "react";
import { LoginWithMagicLink } from "../_actions";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      await LoginWithMagicLink(email);
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <button type="submit" disabled={isLoading || !email}>
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
