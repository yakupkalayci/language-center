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
import axios from "axios";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Input from "../../components/form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";

function AuthPage() {
  const location = useLocation();
  const { setToken, setUserData } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    description: "",
  });
  const [formType, setFormType] = useState();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    const url = "http://localhost:3000/api/users/login";

    try {
      const response = await axios.post(url, data);
      const res = response.data;
      if (res.status === "success") {
        setToken(res.token);
        setUserData(res.userData);
      } else if (res.status === "error") {
        res.error?.description
          ? setErrorMessage({
              title: res.error.title,
              description: res.error.description,
            })
          : setErrorMessage(null);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (data) => {
    const url = "http://localhost:3000/api/users/register";

    const response = await axios.post(url, data);
    const res = await response.data;

    if (res.status === "success") {
      setFormType("login");
      setErrorMessage(null);
      delete data.password;
      setUserData(data);
    } else {
      const errorDetails = res.error?.description
        ? { title: res.error.title, description: res.error.description }
        : { title: "Hata", description: "Bir hata oluştu." };

      setErrorMessage(errorDetails);
      throw errorDetails;
    }
  };

  const onSubmit = (data) => {
    if (formType === "login") {
      toast.promise(handleLogin(data), {
        loading: {title: "Yükleniyor..", description: "Lütfen bekleyiniz"},
        success: (res) => ({
          title: res.data.title || "Giriş başarılı",
          description: res.data.message || "Uygulamaya başarıyla giriş yaptınız.",
        }),
        error: (err) => ({
          title: err.title || "Hata",
          description: err.description || "Bir hata oluştu.",
        }),
      })
    } else if (formType === "register") {
      toast.promise(handleRegister(data), {
        loading: { title: "Yükleniyor..", description: "Lütfen bekleyiniz" },
        success: (res) => ({
          title: res.data.title || "Kayıt başarılı",
          description: res.data.message || "Giriş yapabilirsiniz",
        }),
        error: (err) => ({
          title: err.title || "Hata",
          description: err.description || "Bir hata oluştu.",
        }),
      });
    }
  };

  useEffect(() => {
    reset();
    setFormType(location.state?.formType || "login");
  }, [location.state?.formType, reset]);

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
        {errorMessage && (
          <Text color="alert.danger">{errorMessage.description}</Text>
        )}
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
