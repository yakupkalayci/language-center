import { useState } from "react";
import { Input as ChakraInput, Box, position } from "@chakra-ui/react";
import Icon from "../common/Icon";

function Input(props) {
  // destruct props
  const { name, placeholder, register, validationSchema, type, errors } = props;

  // states
  const [inputType, setInputType] = useState(type);
  const [passwordToggleIcon, setPasswordToggleIcon] = useState('eye');

  // methods
  const togglePasswordIcon = () => {
    setPasswordToggleIcon(prev => prev === 'eye' ? 'eye-closed' : 'eye');
    setInputType(prev => prev === 'password' ? 'text' : 'password');
  }

  return (
    <Box position="relative">
      <ChakraInput
        {...register(name, validationSchema)}
        id={name}
        placeholder={placeholder}
        type={inputType}
        padding="24px 24px"
        _focusVisible={{
          borderColor: errors?.[name] ? "alert.error" : "unset",
        }}
        _autofill={{
          boxShadow: "0 0 0px 1000px #ffffff inset",
        }}
      />
      {
        type === 'password' && (
          <Icon
            size={16}
            icon={passwordToggleIcon}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
            onClick={() => togglePasswordIcon()}
          />
        )
      }
    </Box>
  );
}

export default Input;
