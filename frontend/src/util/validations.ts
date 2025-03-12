import { UseFormRegister, Path } from "react-hook-form";

export const registerNumberField = <T extends Record<string, unknown>>(
  register: UseFormRegister<T>,
  name: Path<T>
) =>
  register(name, {
    setValueAs: (value) => {
      const num = Number(value);
      return value === "" || isNaN(num) ? null : num; // Prevent NaN values
    },
  });
