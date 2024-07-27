"use client";

import InputField from "./inputField";
import InputFieldIcon from "./inputFieldIcon";
import FileBrowser from "./fileBrowser";
import DropdownField from "./dropdownField";
import CREDENTIAL_TYPES from "../constants/credentialTypes";

export default function UserForm({ label, setAlert, onChange }) {
  const dropdownOptions = Object.entries(CREDENTIAL_TYPES).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  return (
    <div className="rounded-2xl bg-[#181A1F] w-full">
      <div className="flex flex-col py-6 px-4 text-left text-xl gap-6">
        <h1 className="text-[#9396A5] text-base md:text-xl">{label}</h1>

        <InputField
          label={"Nombre"}
          placeholder={"Nombre"}
          onChange={(value) => {
            onChange(value, "name");
          }}
        />

        <InputField
          label={"Apellido"}
          placeholder={"Apellido"}
          onChange={(value) => {
            onChange(value, "last_name");
          }}
        />

        <DropdownField
          label={"Tipo de documento"}
          options={dropdownOptions}
          onChange={(value) => {
            onChange(value, "credential_type");
          }}
        />

        <InputField
          label={"Número de documento"}
          placeholder={"Número de documento"}
          onChange={(value) => {
            onChange(value, "credential");
          }}
        />

        <InputField
          label={"Correo electrónico"}
          type={"email"}
          noLimit={true}
          placeholder={"Correo electrónico"}
          onChange={(value) => {
            onChange(value, "email");
          }}
        />

        <InputFieldIcon
          label={"Número de teléfono"}
          type={"tel"}
          placeholder={"Número de teléfono"}
          onChange={onChange}
        />

        <FileBrowser
          setAlert={setAlert}
          setLoadedFiles={(value) => {
            onChange(value, "files");
          }}
        />
      </div>
    </div>
  );
}
