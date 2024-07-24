"use client";

import FormField from "./formField";
import FormFieldIcon from "./formFieldIcon";

export default function UserForm({ images, label, userData }) {
  const credential_types = {
    0: "Cédula de identidad",
    1: "Pasaporte",
    2: "Cédula de Extranjería",
    3: "RUC",
  };

  return (
    <div className="rounded-2xl bg-[#181A1F] w-full h-[602px]">
      <div className="flex flex-col pt-6 pb-6 pl-4 pr-4 text-left text-xl gap-6">
        <h1 className="text-[#9396A5] text-xl">{label}</h1>

        <FormField label={"Nombre"} value={userData.name} />
        <FormField label={"Apellido"} value={userData.last_name} />
        <FormField
          label={"Tipo de documento"}
          value={credential_types[userData.credential_type]}
        />
        <FormField label={"Número de documento"} value={userData.credential} />
        <FormField label={"Correo electrónico"} value={userData.email} />
        <FormFieldIcon
          label={"Número de teléfono"}
          value={userData.phone}
          country={userData.country_code}
        />
      </div>
    </div>
  );
}
