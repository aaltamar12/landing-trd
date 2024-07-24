"use server";
import FormUser from "./components/formUser";
import UserForm from "./userForm";

export default async function Home() {
  const fetchUser = async () => {
    const id = "e9000a91-991e-44a4-93d8-564e0e93fed3";
    try {
      const response = await fetch(
        `${process.env.NEXT_API_URL}/api/user/${id}?${Date.now}`
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

  return <UserForm userData={user} />;
}
