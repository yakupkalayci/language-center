import { useState } from "react";
import { Container, Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth/authStore";
import FormItem from "../../components/form-elements/formItem";
import Label from "../../components/form-elements/Label";
import Input from "../../components/form-elements/Input";
import Select from "../../components/form-elements/Select";
import { FORM_RULES } from "../../common/constants/form/formRules";
import useModalStore from "../../store/modal/modalStore";
import { updateAccountInfos, deleteAccount } from "../../services/auth";
import { useNavigate } from 'react-router';
import { accentMap } from "../../common/constants/accents";

function SettingsPage() {
    // states
    const [errorMessage, setErrorMessage] = useState();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // stores
    const { userData, clearToken, clearUser, setUserData } = useAuthStore();
    const { open, close, setActions } = useModalStore();

    // variables
    const navigate = useNavigate();
    const toast = useToast();
    const accentOptions = [
        {
            value: accentMap.EN_US,
            label: 'American'
        },
        {
            value: accentMap.EN_GB,
            label: 'British'
        }
    ];

    // methods
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields, isDirty },
        reset,
        getValues,
    } = useForm({ defaultValues: userData });

    return (
        <Container maxW={"70%"}>
            {/* Genel Ayarlar */}
            <Box marginBottom={6}>
                <Flex flexDirection={"column"} gap={1} marginBottom={4}>
                    <Text fontSize={24} fontWeight={"bold"}>Genel Ayarlar</Text>
                    {/* <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quisquam atque perspiciatis quibusdam, aperiam, fugiat dicta, repellendus quos in quas praesentium. Nisi fugiat ullam et ex, quasi autem repellat officia.</Text> */}
                </Flex>
                <Flex
                    as="form"
                    flexDirection={"column"}
                    gap={4}
                    padding={{ base: "16px", md: "24px" }}
                    borderRadius="12px"
                    bgColor="base.white"
                >
                    <FormItem errors={errors} itemName="dailyWordCount">
                        <Label label="Günlük kaç yeni kelime öğrenmek istersin?" />
                        <Input
                            name="dailyWordCount"
                            type="number"
                            min={0}
                            register={register}
                            errors={errors}
                            validationSchema={FORM_RULES.TEXT}
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
                <Button display={"flex"} variant="primary" type="submit" mt={"16px"} ms={"auto"}>Kaydet</Button>
            </Box>
        </Container>
    );
}

export default SettingsPage;
