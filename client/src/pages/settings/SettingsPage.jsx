import { useEffect } from "react";
import { Container, Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/FormItem";
import Label from "../../components/form-elements/Label";
import Input from "../../components/form-elements/Input";
import Select from "../../components/form-elements/Select";
import Icon from "../../components/common/Icon";
import { FORM_RULES } from "../../common/constants/form/formRules";
import { updateUserSettings } from "../../services/auth";

function SettingsPage() {
    // variables
    const toast = useToast();
    const accentOptions = [
        {
            value: "EN_US",
            label: 'American'
        },
        {
            value: "EN_GB",
            label: 'British'
        }
    ];

    // stores
    const { userData, setUserData } = useAuthStore();

    // methods
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
    } = useForm({ defaultValues: userData });

    const onSubmit = async (data) => {
        const { dailyWordCount, accentChoice } = data;
        const body = {
            dailyWordCount: Number(dailyWordCount),
            accentChoice
        };
        try {
            const response = await updateUserSettings(body);
            const res = await response.data;
            if (res.status) {
                toast({
                    title: "Başarılı",
                    description: "Ayarlar başarıyla güncellendi.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setUserData(res.data.user)
            }
        } catch (err) {
            console.log("update user settings fetch error:", err);
            toast({
                title: "Hata",
                description: "Ayarlar güncellenirken bir hata oluştu.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // effects  
    useEffect(() => {
        if (userData.settings) {
            reset(userData.settings);
        }
    }, [userData, reset]);

    return (
        <Container maxW={"70%"}>
            {/* Genel Ayarlar */}
            <Box
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                marginBottom={6}
            >
                <Flex flexDirection={"column"} gap={1} marginBottom={4}>
                    <Text fontSize={24} fontWeight={"bold"}>Genel Ayarlar</Text>
                    {/* <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quisquam atque perspiciatis quibusdam, aperiam, fugiat dicta, repellendus quos in quas praesentium. Nisi fugiat ullam et ex, quasi autem repellat officia.</Text> */}
                </Flex>
                <Flex
                    flexDirection={"column"}
                    gap={4}
                    padding={{ base: "16px", md: "24px" }}
                    borderRadius="12px"
                    bgColor="base.white"
                >
                    <FormItem errors={errors} itemName="dailyWordCount">
                        <Flex
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            gap={2}
                        >
                            <Label label="Günlük kaç yeni kelime öğrenmek istersin?" />
                            <Icon 
                                icon="info" 
                                size={16}
                                style={{marginBottom: '8px'}}
                                onMouseEnter={() => {
                                    toast({
                                        title: "Bilgi",
                                        description: "Bugün yaptığın kelime sayısı değişikliği yarından itibaren geçerli olur.",
                                        status: "info",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }}
                                onMouseLeave={() => {
                                    toast.closeAll();
                                }}
                            />
                        </Flex>
                        <Input
                            name="dailyWordCount"
                            type="number"
                            min={0}
                            register={register}
                            errors={errors}
                            validationSchema={FORM_RULES.TEXT}
                            iconName="info"
                            onHoverIcon={() => {
                                toast({
                                    title: "Bilgi",
                                    description: "Günlük öğrenmek istediğin kelime sayısını belirt.",
                                    status: "info",
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }}
                        />
                    </FormItem>
                    <Select
                        label="Kelimeleri hangi aksanda dinlemek istersin?"
                        name="accentChoice"
                        register={register}
                        options={accentOptions}
                        placeholder="Aksan seç"
                        errors={errors}
                        validationSchema={FORM_RULES.TEXT}
                    />
                </Flex>
                <Button
                    disabled={isLoading}
                    display={"flex"}
                    variant="primary"
                    type="submit"
                    mt={"16px"}
                    ms={"auto"}
                >
                    {
                        isLoading ? "Kaydediliyor..." : "Ayarları Kaydet"
                    }
                </Button>
            </Box>
        </Container>
    );
}

export default SettingsPage;
