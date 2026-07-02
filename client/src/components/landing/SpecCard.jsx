import { Box, Text } from '@chakra-ui/react'
import Icon from '../common/Icon';

function SpecCard({ title, desc, icon }) {
    return (
        <Box 
            flex={"1 0 350px"}
            bg="primary.pink"
            color="base.white"
            padding={"24px"}
            borderRadius={"16px"}
            height={"-webkit-fill-available"}
            boxShadow={"md"}
            _hover={{ boxShadow: "lg" }}
        >
            <Icon icon={icon} size="24px" style={{marginBottom: "12px"}}  />
            <Text marginBottom={"20px"} fontWeight={"500"} fontSize={{base: '18px',  md: '24px'}}>{title}</Text>
            <Text fontSize={{base: '14px',  md: '16px'}}>{desc}</Text>
        </Box>
    )
}

export default SpecCard;