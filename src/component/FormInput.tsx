import { ReactNode } from "react";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  placeHolder?: string;
  value?: string | string[] | undefined;
  id?: string;
  validation?: string;
  label?: string;
  prefix?: ReactNode;
  allowClear?: boolean;
  required?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  placeHolder,
  value,
  id,
  validation,
  label,
  prefix,
  allowClear,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // const errorMessages = getErrorMessageByPathname(errors, name);
  return (
    <>
      {label ? <label className="text-white">{label}</label> : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              required={required}
              type={type}
              size={size}
              {...field}
              value={value ? value : field.value}
              prefix={prefix}
              placeholder={placeHolder}
              allowClear={allowClear}
            />
          ) : (
            <Input
            required={required}
              type={type}
              size={size}
              {...field}
              value={value ? value : field.value}
              prefix={prefix}
              placeholder={placeHolder}
              allowClear={allowClear}
            style={{marginTop:"8px",color:"white",fontWeight:"lighter",background:"black"}}
           
            />
          )
        }
      />
      {/* <small style={{ color: "red" }}>{errorMessages}</small> */}
    </>
  );
};

export default FormInput;
