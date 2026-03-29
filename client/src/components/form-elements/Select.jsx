import { FormControl, FormLabel, Select as ChakraSelect } from '@chakra-ui/react';

function Select({ name, label, register, validationSchema, errors, options, placeholder }) {
  return (
    <FormControl isInvalid={errors && errors[name]}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraSelect placeholder={placeholder || 'Seçiniz'} {...(register ? register(name, validationSchema) : {})}>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
}

export default Select;
