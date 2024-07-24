"use client";
import { useEffect, useState } from "react";
import Loading from "./components/loading";

export default function UserForm(userData) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(userData);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading, userData]);

  if (loading) {
    return <Loading />;
  }

  const userString = user
    ? JSON.stringify(user, null, 2)
    : "No user data available";

  return (
    <div>
      <h1>Data</h1>
      <pre>{userString}</pre>
    </div>
  );
}
