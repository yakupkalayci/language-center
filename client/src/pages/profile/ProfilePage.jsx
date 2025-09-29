import { useState } from "react";
import { Container, Box, Heading, Flex, Button, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Input from "../../components/form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";
import useModalStore from "../../store/modal/modalStore";
import { deleteAccount } from "../../services/auth";
import { useNavigate } from 'react-router';

function ProfilePage() {
  // states
  const [errorMessage, setErrorMessage] = useState();

  // stores
  const { userData, clearToken, clearUser } = useAuthStore();
  const { open, close, setActions } = useModalStore();

  // variables
  const navigate = useNavigate();
  const toast = useToast();

  // methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: userData });

  const logout = () => {
    clearUser();
    clearToken();
    navigate("/uyelik-islemleri");
    close();
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(userData.id);
      const res = await response.data;
      if (res.status === 'success') {
        logout();
      }
      return res;
    } catch (err) {
      console.log("Delete account error", err);
      throw err;
    }
  }

  const showDeleteAccountModal = () => {
    open({ title: "Hesabı Sil", message: "Hesabı silmek istediğine emin misin?" });

    setActions([
      {
        label: "Hayır",
        onClick: () => close()
      },
      {
        label: "Evet",
        onClick: () => {
          toast.promise(handleDeleteAccount(), {
            loading: {
              title: "Yükleniyor",
              description: "İşleminiz gerçekleştiriliyor"
            },
            success: (res) => ({
              title: res?.data?.title || "Başarılı",
              description: res?.data?.message || "Hesabınzı başarıyla silindi."
            }),
            error: (err) => ({
              title: err.title || "Hata",
              description: err.message || "Bilinmeyen bir hata meydana geldi."
            })
          });
        },
        variant: "danger"
      }
    ]);
  }

  const onSubmit = () => { };

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
          <Box width="100%">
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
          <Box marginTop="auto" marginBottom="auto" width="100%">
            <Button
              type="submit"
              variant="primary"
              w="100%"
            >
              Güncelle
            </Button>
          </Box>
          <Box marginTop="16px" marginBottom="auto" width="100%">
            <Button
              type="button"
              variant="danger"
              w="100%"
              onClick={showDeleteAccountModal}
            >
              Hesabı Sil
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}

export default ProfilePage;
