"use server";
import UserDetails from "@/app/userDetails";

export default async function Home({ params }) {
  const { id } = params;
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_API_URL}/api/user/${id}/?${Date.now()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const user = await fetchUser();

  return <UserDetails userData={user} />;
}
