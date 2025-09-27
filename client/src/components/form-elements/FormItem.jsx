import { FormControl, FormErrorMessage, Text } from "@chakra-ui/react";

function FormItem(props) {
  // destruct props
  const { children, errors, itemName, noMarginBottom } = props;

  return (
    <FormControl isInvalid={errors?.[itemName]} mb={noMarginBottom ? 0 : 4}>
      {children}
      <FormErrorMessage marginTop="8px">
        {errors?.[itemName] && (
          <>
            <Text as="span">{errors?.[itemName].message}</Text>
          </>
        )}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FormItem;
