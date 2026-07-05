import { useState } from "react";
import { Input as ChakraInput, Box } from "@chakra-ui/react";
import Icon from "../common/Icon";

function Input(props) {
  // destruct props
  const { name, placeholder, register, validationSchema, type, errors, min, customStyles, value, onChange } = props;

  // states
  const [inputType, setInputType] = useState(type);
  const [passwordToggleIcon, setPasswordToggleIcon] = useState('eye');
  const registration = register?.(name, validationSchema);

  // methods
  const togglePasswordIcon = () => {
    setPasswordToggleIcon(prev => prev === 'eye' ? 'eye-closed' : 'eye');
    setInputType(prev => prev === 'password' ? 'text' : 'password');
  }

  return (
    <Box position="relative">
      <ChakraInput
        {...registration}
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
        min={min}
        value={value}
        onChange={(e) => {
          registration?.onChange(e);
          onChange?.(e);
        }}
        {...customStyles}
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
