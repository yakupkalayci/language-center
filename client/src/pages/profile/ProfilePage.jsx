import { useEffect, useState } from "react";
import { Container, Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Input from "../../components/form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";

function ProfilePage() {
  const { userData } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: userData });

  const onSubmit = () => {};

  return (
    <Container>
      <Flex
        direction="column"
        borderRadius="12px"
        bgColor="base.white"
        w="fit-content"
        margin="0 auto"
        padding={{ base: "16px", md: "48px" }}
        gap="36px"
        width="75%"
      >
        <Box textAlign="center">
          <Heading marginBottom="16px">Profili Düzenle</Heading>
        </Box>
        {errorMessage && <Text color="alert.danger">{errorMessage}</Text>}
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          flexWrap="wrap"
          columnGap="16px"
        >
          <Box width="calc(50% - 8px)">
            <FormItem errors={errors} itemName="email">
              <Input
                name="email"
                type="email"
                placeholder="E-posta Adresi"
                register={register}
                validationSchema={FORM_RULES.EMAIL}
                errors={errors}
              />
            </FormItem>
          </Box>
          <Box width="calc(50% - 8px)">
            <FormItem errors={errors} itemName="firstName">
              <Input
                name="firstName"
                type="text"
                placeholder="İsim"
                register={register}
                validationSchema={FORM_RULES.TEXT}
                errors={errors}
              />
            </FormItem>
          </Box>
          <Box width="calc(50% - 8px)">
            <FormItem errors={errors} itemName="lastName" noMarginBottom>
              <Input
                name="lastName"
                type="text"
                placeholder="Soyisim"
                register={register}
                validationSchema={FORM_RULES.TEXT}
                errors={errors}
              />
            </FormItem>
          </Box>
        </Flex>
        <Box width="calc(50% - 8px)" marginTop="auto" marginBottom="auto">
          <Button
            colorScheme="blue"
            type="submit"
            variant="primary"
            display="flex"
          >
            Güncelle
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default ProfilePage;
