import { useCallback } from "react";
import { Flex, Heading, Button, Box } from "@chakra-ui/react";
import DateRangePicker from "../date-range-picler/DateRangePicker";

function PageHeader(props) {
  const { title, openModal, openGameModal, openAddMediaModal, pageType, showGameModal, hasDateFilter, selectedDate, setSelectedDate } = props;

  const handleDateChange = useCallback((date) => {
  setSelectedDate(date);
}, []);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ md: "16px" }}
    >
      <Heading variant="pageTitle" sx={{ textWrap: "nowrap" }}>
        {title}
      </Heading>
      <Flex
        alignItems="center"
        gap="12px"
        flexDirection={{ base: "column", md: "row" }}
        marginBottom="16px"
        width={{ base: "100%", md: "unset" }}
      >
        {
          pageType !== 'media' && showGameModal && (
            <Button
              variant="primary"
              onClick={() => openGameModal()}
              w={{ base: "100%", md: "fit-content" }}
            >
              <Box
                as="i"
                className="icon-videogame"
                color="base.white"
                fontSize="14px"
                marginRight="8px"
              />
              Eşleştirme Oyunu
            </Button>
          )
        }
        {(pageType === "day" || pageType === "allWords") && (
          <Button
            variant="secondary"
            onClick={openModal}
            w={{ base: "100%", md: "fit-content" }}
          >
            <Box
              as="i"
              className="icon-plus"
              color="base.white"
              fontSize="14px"
              marginRight="8px"
            />
            Kelime Ekle
          </Button>
        )}
        {(pageType === "media") && (
          <Button
            variant="secondary"
            onClick={openAddMediaModal}
            w={{ base: "100%", md: "fit-content" }}
          >
            <Box
              as="i"
              className="icon-plus"
              color="base.white"
              fontSize="14px"
              marginRight="8px"
            />
            Film / Dizi Ekle
          </Button>
        )}
        {
          hasDateFilter && (
            <DateRangePicker 
              date={selectedDate}
              onDateChange={handleDateChange}
            />
          )
        }
      </Flex>
    </Flex>
  );
}

export default PageHeader;
