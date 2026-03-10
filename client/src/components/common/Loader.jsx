import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Icon from "../common/Icon";

function Loader() {
    const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

    return (
        <Box
            animation={`${spin} 1s linear infinite`}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >

            <Icon icon="loading" size="24px" color="rgb(94,0,152)" />

        </Box>
    )
}

export default Loader