import { Input as ChakraInput } from "@chakra-ui/react";

function Input(props) {
  // destruct props
  const { name, placeholder, register, validationSchema, type, errors } = props;
  return (
    <ChakraInput
      {...register(name, validationSchema)}
      id={name}
      placeholder={placeholder}
      type={type}
      padding="24px 24px"
      _focusVisible={{
        borderColor: errors?.[name] ? "alert.error" : "unset",
      }}
      _autofill={{
        boxShadow: "0 0 0px 1000px #ffffff inset",
      }}
    />
  );
}

export default Input;
