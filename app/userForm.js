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
      <pre>{`${process.env.NEXT_API_URL}/api/user/e9000a91-991e-44a4-93d8-564e0e93fed3`}</pre>
      <pre>{process.env.NEXT_API_URL}</pre>
      <pre>{"/api/user/e9000a91-991e-44a4-93d8-564e0e93fed3"}</pre>
    </div>
  );
}
