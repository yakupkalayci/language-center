import { Box, Button, useToast, Text } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import FormItem from '../form-elements/FormItem';
import Input from '../form-elements/Input';
import { FORM_RULES } from "../../common/constants/form/formRules";
import { submitContactForm } from '../../services/contact';

function ContactForm() {

    const toast = useToast();

    const handleSubmitForm = async (data) => {
        try {
            const response = await submitContactForm(data);
            const res = await response.data;
            if (res.status === 'success') {
                delete data.password;
            } else if (res.status === 'error') {
                const error = new Error(res.error.description);
                error.title = res.error.title;
                error.message = res.error.description;
                throw error;
            }
        } catch (err) {
            console.log("Handle register error:", err);
            throw err;
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await toast.promise(handleSubmitForm(data), {
                loading: { title: "Yükleniyor.." },
                success: (res) => ({
                    title: "Başarılı",
                    description: "Mesajınız başarıyla gönderildi. En kısa sürede size geri dönüş yapacağız.",
                }),
                error: (err) => ({
                    title: err.title || "Hata",
                    description: err.message || "Bir hata oluştu.",
                }),
            });
            reset();
        } catch (err) {
            console.log("onsubmit fetch error:", err);
            toast({
                title: err.title || "Hata",
                description: err.message || "Bir hata oluştu.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate id='contact' marginTop={{ base: '22px', md: '40px' }}
            paddingTop={{ base: '22px', md: '40px' }}>
            <Text fontSize={{ base: '18px', md: "36px" }} fontWeight={600} marginBottom={"20px"} textAlign={"center"}>Bize ulaşın</Text>
            <Text fontSize={{ base: '14px', md: "18px" }} marginBottom={"40px"} textAlign={"center"}>Her türlü görüş, öneri ve şikayetleriniz için bizimle iletişime geçebilirsiniz.</Text>
            <Box w={{base: '100%', md: '70%'}} margin={"0 auto"}>
                <FormItem errors={errors} itemName="name">
                    <Input
                        name="name"
                        type="name"
                        placeholder="Ad soyad"
                        register={register}
                        validationSchema={FORM_RULES.TEXT}
                        errors={errors}
                    />
                </FormItem>
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
                <FormItem errors={errors} itemName="subject">
                    <Input
                        name="subject"
                        type="subject"
                        placeholder="Konu"
                        register={register}
                    />
                </FormItem>
                <FormItem errors={errors} itemName="message">
                    <Input
                        name="message"
                        type="message"
                        placeholder="Mesajınız"
                        register={register}
                        validationSchema={FORM_RULES.TEXT}
                        errors={errors}
                    />
                </FormItem>
                <Button
                    type='submit'
                    variant={"primary"} 
                    borderRadius={"24px"} 
                    padding={"14px 22px"} 
                    fontWeight={"bold"} 
                    textColor={"base.white"} 
                    marginInline={"auto"}
                    marginTop={"24px"}
                    display={"flex"}
                    _hover={{ opacity: 0.9 }}
                >
                    Gönder
                </Button>
            </Box>
        </Box>
    )
}

export default ContactForm;