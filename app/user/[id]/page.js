"use server";
import UserDetails from "@/app/userDetails";

export default async function Home() {
  const fetchUser = async () => {
    const id = "e9000a91-991e-44a4-93d8-564e0e93fed3";
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

  const fetchWeather = async (coords) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
      );

      console.log(response.json());
    } catch (error) {
      console.log(error);
    }
  };

  const user = await fetchUser();

  return <UserDetails userData={user} />;
}
