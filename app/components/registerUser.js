"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserForm from "./userForm";
import Checkbox from "./checkbox";
import Loading from "./loading";
import Alert from "./alert";

export default function RegisterUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    credential_type: "",
    credential: "",
    email: "",
    phone: "",
    country_code: "",
    useAsBillingInfo: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        showAlert("Error al crear el usuario");
        return;
      }

      const data = await response.json();

      console.log({ data });
      router.push(`/user/${data.id}`);
    } catch (error) {
      showAlert(error);
      console.error("Error al guardar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading, userData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center text-center h-full 4k:h-screen w-full bg-[#111317] text-[#CCCCCC]">
      <Alert
        message={alertMessage || ""}
        isLoading={loading}
        isVisible={alertVisible}
        onClose={handleCloseAlert}
      />
      <div className="flex flex-col items-center">
        <div className="flex justify-center pt-[50px] pb-[71px]">
          <Image
            key={"logo"}
            src="/logo-trd.png"
            alt="logo trd"
            width={77.6}
            height={24}
          />
        </div>

        <div className="flex flex-col gap-8 px-6 md:px-[372px]">
          <div className="flex flex-col md:flex-row gap-10 4k:gap-20 w-[350px] md:w-[695px] items-center justify-center">
            <div className="flex flex-col pb-[69px] gap-5 w-full">
              <UserForm
                key={"information"}
                label={"Información personal"}
                onChange={handleOnChange}
              />

              <div className="h-[116px] px-4 py-6 bg-[#181a1f] rounded-2xl flex-col justify-start items-start gap-6 inline-flex">
                <div className="text-center text-[#9396a5] text-base md:text-xl font-normal font-['SF Pro Display']">
                  Datos de facturación
                </div>
                <div className="justify-center items-center gap-[9px] inline-flex">
                  <div className="w-5 h-5 relative">
                    <Checkbox
                      onChange={(value) => {
                        setUserData({ ...userData, useAsBillingInfo: value });
                      }}
                    />
                  </div>
                  <div className="text-white text-xs md:text-sm font-semibold">
                    Usar los mismos datos para la facturación
                  </div>
                </div>
              </div>

              <button
                className="h-14 w-full px-5 py-2.5 bg-[#fcb115] rounded-xl text-center text-[#111217]"
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
