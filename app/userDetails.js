"use client";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import Image from "next/image";
import Gallery from "./components/gallery";
import UserDetailsForm from "./components/userDetailsForm";
import Alert from "./components/alert";
import { useRouter } from "next/navigation";

export default function UserDetails({ userData }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState("0");
  const [error, setError] = useState(null);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    const getLocationAndWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            try {
              const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&${Date.now()}`
              );

              if (!response.ok) {
                setWeather("Error");
                throw new Error("Error fetching weather data");
              }

              const { current_weather, current_weather_units } =
                await response.json();
              setWeather(
                `${current_weather.temperature}${current_weather_units.temperature}`
              );
            } catch (err) {
              setError(err.message);
            }
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocationAndWeather();
  }, []);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        if (location.latitude === null) return;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${
            location.latitude
          }&longitude=${location.longitude}&current_weather=true&${Date.now()}`
        );

        if (!response.ok) {
          setWeather("Err");
          return;
        }

        const { current_weather, current_weather_units } =
          await response.json();
        setWeather(
          `${current_weather.temperature}${current_weather_units.temperature}`
        );
      } catch (err) {
        setError(err.message);
      }
    };
    getLocationAndWeather();
  }, [location]);

  useEffect(() => {
    setUser(userData);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading, userData]);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return router.push("/404");
  }

  return (
    <div className="flex flex-col text-center h-full 4k:h-screen bg-[#111317] text-[#CCCCCC] pb-[171px]">
      <Alert
        message="¡Perfil creado exitosamente!"
        isLoading={loading}
        isVisible={alertVisible}
        onClose={handleCloseAlert}
      />
      <div className="flex flex-col items-center">
        <div className="flex justify-center pt-[50px] pb-[61px]">
          <Image
            key={"logo"}
            src="/logo-trd.png"
            alt="logo trd"
            width={77.6}
            height={24}
          />
        </div>

        <div className="flex flex-col gap-8 px-6 md:px-20">
          <div className="flex justify-between items-center text-left text-xl md:text-[27px]">
            <h1>Hola {`${user.name} ${user.last_name}`}</h1>

            <div className="flex items-center gap-2">
              <h1>{weather}</h1>
              <Image
                key={"sky"}
                src="/sky.png"
                alt="sky icon"
                width={46}
                height={46}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 4k:gap-20">
            <Gallery images={JSON.parse(user.images)} />

            <div className="flex flex-col gap-5 w-full">
              <UserDetailsForm
                key={"information"}
                label={"Información personal"}
                userData={user}
              />
              <UserDetailsForm
                key={"billing"}
                label={"Datos de facturación"}
                userData={{
                  name: user.billing_name,
                  last_name: user.billing_last_name,
                  credential_type: user.billing_credential_type,
                  credential: user.billing_credential,
                  email: user.billing_email,
                  phone: user.billing_phone,
                  country_code: user.country_code,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
