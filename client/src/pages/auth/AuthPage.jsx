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
import FormItem from "../../components/form-elements/formItem";
import Input from "../../components/form-elements/Input";
import { login, signup, refreshToken } from "../../services/auth";
import { FORM_RULES } from "../../common/constants/form/formRules";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userData, setUserData } = useAuthStore();
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

    if(res.status === 'success') {
  // server sets access_token cookie and refresh_token cookie; store only user data
  setUserData(res.userData);
  // navigate immediately (also handled by userData effect)
  const from = location.state?.from || "/";
  navigate(from, { replace: true });
    } else if(res.status === 'error') {      
      const error = new Error(res.error.description);
      error.title = res.error.title;
      error.message = res.error.description;
      throw error;
    }
    } catch(err) {      
      console.log("Handle login error:", err);
      throw err;
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
        throw err;
    }
  };

  const onSubmit = (data) => {
    if (formType === "login") {
      toast.promise(handleLogin(data), {
        loading: {title: "Yükleniyor..", description: "İşleminiz gerçekleştiriliyor"},
        success: (res) => ({
          title: "Başarılı",
          description: "Uygulamaya başarıyla giriş yaptın.",
        }),
        error: (err) => ({
          title: err.title || "Hata",
          description: err.message || "Bir hata oluştu.",
        }),
      })
    } else if (formType === "register") {
      toast.promise(handleRegister(data), {
        loading: { title: "Yükleniyor..", description: "İşleminiz gerçekleştiriliyor" },
        success: (res) => ({
          title: "Başarılı",
          description: "Giriş yapabilirsin",
        }),
        error: (err) => ({
          title: err.title || "Hata",
          description: err.message || "Bir hata oluştu.",
        }),
      });
    }
  };

  useEffect(() => {
    reset();
    setFormType(location.state?.formType || "login");
  }, [location.state?.formType, reset]);

  // session restoration is handled globally by AuthInitializer

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
