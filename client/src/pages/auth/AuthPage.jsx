import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import useDailywordModalStore from "../../store/modal/dailyWordModalStore";
import FormItem from "../../components/form-elements/FormItem";
import Input from "../../components/form-elements/Input";
import { login, signup } from "../../services/auth";
import { FORM_RULES } from "../../common/constants/form/formRules";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData } = useAuthStore();
  const { open } = useDailywordModalStore();
  const [formType, setFormType] = useState();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      const res = await response.data;

      if (res.status === 'success') {
        // server sets access_token cookie and refresh_token cookie; store only user data
        setUserData(res.userData);
        // navigate immediately (also handled by userData effect)
        const from = location.state?.from || "/panel";
        navigate(from, { replace: true });        
        if (res.userData.settings.showDailyLearningWordModal) {
          open();
        }
      } else if (res.status === 'error') {
        const error = new Error(res.data.error.description);
        error.title = res.data.error.title;
        error.message = res.data.error.description;
        throw error;
      }
    } catch (err) {
      console.log("Handle login error:", err);
      toast({
        title: err.response.data.error?.title || "Hata",
        description: err.response.data.error?.description || "Bir hata oluştu.",
        status: "error",
      }); 
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await signup(data);
      const res = await response.data;
      if(res.status === 'success') {
        setFormType("login");
        delete data.password;
        setUserData(data);
      } else if(res.status === 'error') {
        const error = new Error(res.error.description);
        error.title = res.error.title;
        error.message = res.error.description;
        throw error;
      }
    } catch(err) {
        console.log("Handle register error:", err);
        toast({
        title: err.response.data.error?.title || "Hata",
        description: err.response.data.error?.description || "Bir hata oluştu.",
        status: "error",
      }); 
    }
  };

  const onSubmit = (data) => {
    if (formType === "login") {
      handleLogin(data);
    } else if (formType === "register") {
      handleRegister(data);
    }
  };

  useEffect(() => {
    reset();
    setFormType(location.state?.formType || "login");
  }, [location.state?.formType, reset]);

  useEffect(() => {
    // navigate when we have user data (cookie-based auth)
    if (userData && userData.email) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [userData]);

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
              ? "Formu doldurarak hesabına giriş yapabilir ve uygulamayı kullanmaya başlayabilirsin."
              : "Ücretsiz bir şekilde tüm özelliklerden yararlanabilmek için hesap oluştur!"}
          </Text>
        </Box>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              validationSchema={formType === 'login' ? FORM_RULES.PASSWORD_LOGIN : FORM_RULES.PASSWORD_REGISTER}
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
