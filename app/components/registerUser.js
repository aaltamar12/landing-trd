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
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertComponent, setAlertComponent] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    credential_type: "",
    credential: "",
    email: "",
    phone: "",
    country_code: "us",
    useAsBillingInfo: "",
    files: [],
  });

  const validateForm = () => {
    const requiredAttributes = [
      "name",
      "last_name",
      "credential_type",
      "credential",
      "email",
    ];

    const validation = requiredAttributes.every((attr) => {
      const field = userData[attr];
      const validate =
        field !== null && field !== undefined && field.trim() !== "";
      return validate;
    });

    return validation;
  };

  const handleUploadFiles = async () => {
    const { files } = userData;
    if (files.length === 0) return;

    try {
      let filesUrl = [];
      for (const file of files) {
        const signature = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contentType: file.type }),
        });

        if (signature.ok) {
          const { url, fields } = await signature.json();
          const fileUrl = `${url}${fields.key}`;

          const formData = new FormData();
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.append("file", file);

          const uploadResponse = await fetch(url, {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            console.error("S3 Upload Error:", uploadResponse);
          }

          filesUrl.push(fileUrl);
        } else {
          showAlert("Error al subir los archivos", "error");
          return;
        }
      }

      return filesUrl;
    } catch (error) {
      console.error("Error uploading files:", error);
      showAlert("Error al subir los archivos", "error");
      return { error };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        showAlert("Por favor llene los campos obligatorios", "error");
        return;
      }
      setLoading(true);

      const urlFiles = await handleUploadFiles();

      if (urlFiles && urlFiles.error) {
        return showAlert("Error al subir imagenes", "error");
      }

      const body = urlFiles?.error
        ? userData
        : { ...userData, images: urlFiles };

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        showAlert("Error al crear el usuario", "error");
        return;
      }

      const { data, status } = await response.json();
      console.log({ userData });

      const redirectUrl = status === 201 ? `/user/${data.id}` : "/404";
      router.push(redirectUrl);
    } catch (error) {
      showAlert("Error");
      console.error("Error al guardar:", error);
      return;
    }
  };

  const handleOnChange = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const showAlert = (message, type) => {
    setErrorAlert(type);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const renderAlert = () => {
    return (
      <Alert
        message={alertMessage}
        type={errorAlert}
        isLoading={loading}
        isVisible={alertVisible}
        onClose={handleCloseAlert}
      />
    );
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    setAlertComponent(renderAlert());
  }, [alertVisible]);

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
      {alertComponent}

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
                setAlert={showAlert}
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
                type="button"
                className="h-14 w-full px-5 py-2.5 bg-[#fcb115] rounded-xl text-center text-[#111217]"
                onClick={(e) => handleSubmit(e)}
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
