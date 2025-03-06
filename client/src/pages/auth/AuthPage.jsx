import { useEffect } from "react";
import { Container, Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Input from "../../components/form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";

function AuthPage() {
  const location = useLocation();
  const formType = location.state?.formType || "login";
  const { setUserData } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const login = async (data) => {
    const url = "http://localhost:3000/api/users/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (data) => {
    const url = "http://localhost:3000/api/users/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
    if (formType === "login") {
      login(data);
    } else if (formType === "register") {
      handleRegister(data);
    }
    console.log("Form Data:", data);
  };

  useEffect(() => {
    reset();
  }, [formType, reset]);

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
        maxW="655px"
      >
        <Box textAlign="center">
          <Heading marginBottom="16px">
            {formType === "login" ? "Giriş Yap" : "Hesap Oluştur"}
          </Heading>
          <Text>
            {formType === "login"
              ? "Formu doldurarak hesabına giriş yapabilir ve uygulamayı kullanmaya başlayabilirsin"
              : "Ücretsiz bir şekilde tüm özelliklerden yararlanabilmek için hesap oluştur!"}
          </Text>
        </Box>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
          {formType === "register" && (
            <>
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
              <FormItem errors={errors} itemName="lastName">
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Soyisim"
                  register={register}
                  validationSchema={FORM_RULES.TEXT}
                  errors={errors}
                />
              </FormItem>
            </>
          )}
          <FormItem errors={errors} itemName="password">
            <Input
              name="password"
              type="password"
              placeholder="Şifre"
              register={register}
              validationSchema={FORM_RULES.PASSWORD}
              errors={errors}
            />
          </FormItem>
          <Button
            colorScheme="blue"
            type="submit"
            variant={formType === "login" ? "primary" : "secondary"}
            display="flex"
            margin="0 auto"
          >
            {formType === "login" ? "Giriş Yap" : "Hesap Oluştur"}
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default AuthPage;
