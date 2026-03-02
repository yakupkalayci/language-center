import { useState } from "react";
import { Container, Box, Heading, Flex, Button, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Label from "../../components/form-elements/Label";
import Input from "../../components/form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";
import useModalStore from "../../store/modal/modalStore";
import { updateAccountInfos, deleteAccount } from "../../services/auth";
import { useNavigate } from 'react-router';

function ProfilePage() {
  // states
  const [errorMessage, setErrorMessage] = useState();

  // stores
  const { userData, clearToken, clearUser, setUserData } = useAuthStore();
  const { open, close, setActions } = useModalStore();

  // variables
  const navigate = useNavigate();
  const toast = useToast();

  // methods
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    reset,
    getValues,
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

  const handleUpdateProfile = async (data) => {
    try {
      const response = await updateAccountInfos(data);
      const res = await response.data;
      return res;
    } catch (err) {
      console.log("Update account error", err);
      throw err;
    }
  }

  const onSubmit = async (data) => {
    if(!isDirty) {
      toast({
        title: 'Değişiklik yapılmadı',
        status: 'info'
      });
      return;
    }

    const allValues = getValues();
    const changedData = {};

    Object.keys(dirtyFields).forEach((field) => {
      changedData[field] = allValues[field];
    })

    toast.promise(handleUpdateProfile(changedData), {
      loading: {
        title: "Yükleniyor",
        description: "İşleminiz gerçekleştiriliyor"
      },
      success: (res) => {
        setUserData(res.data.user);
        return {
          title: res?.data?.title || "Başarılı",
          description: res?.data?.message || "Hesabınzı başarıyla güncellendi."
        }
      },
      error: (err) => ({
        title: err.title || "Hata",
        description: err.message || "Bilinmeyen bir hata meydana geldi."
      })
    });
  };

  return (
    <Container>
      <Flex
        direction="column"
        borderRadius="12px"
        bgColor="base.white"
        margin="0 auto"
        padding={{ base: "16px", md: "48px" }}
        gap="36px"
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
          w="100%"
        >
          <Box w={{base: '100%', md: 'calc(50% - 8px)'}}>
            <FormItem errors={errors} itemName="firstName">
              <Label label="İsim" />
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
          <Box w={{base: '100%', md: 'calc(50% - 8px)'}}>
            <FormItem errors={errors} itemName="lastName" noMarginBottom>
              <Label label="Soyisim" />
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
              <Label label="E-posta Adresi" />
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
          <Flex marginTop="auto" gap="24px" justifyContent="center" marginBottom="auto" width="100%">
            <Button
              type="submit"
              variant="primary"
              w="fit-content"
              disabled={!isDirty}
            >
              Güncelle
            </Button>
            <Button
              type="button"
              variant="danger"
              w="fit-content"
              onClick={showDeleteAccountModal}
            >
              Hesabı Sil
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default ProfilePage;
