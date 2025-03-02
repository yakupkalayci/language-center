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
  const {setUserData} = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = () => {
    setUserData('token');
  }

  const onSubmit = (data) => {
    if(formType === 'login') {
      login();
    } 
    console.log("Form Data:", data);
  };

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
              typ="email"
              placeholder="E-posta Adresi"
              register={register}
              validationSchema={FORM_RULES.EMAIL}
              errors={errors}
            />
          </FormItem>
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
