import { Container, Grid, GridItem, Button, Text } from "@chakra-ui/react";
import DashboardCard from "../../components/card/DashboardCard";
import useDailywordModalStore from "../../store/modal/dailyWordModalStore";

function HomePage() {
  const dashboardCards = [
    {
      id: 0,
      type: "day",
      title: "Günün Kelimeleri",
      link: "/gunun-kelimeleri",
    },
    {
      id: 1,
      type: "week",
      title: "Haftanın Kelimeleri",
      link: "/haftanin-kelimeleri",
    },
    {
      id: 2,
      type: "month",
      title: "Ayın Kelimeleri",
      link: "/ayin-kelimeleri",
    },
    {
      id: 3,
      type: "",
      title: "Tüm Kelimeler",
      link: "/kelime-listesi",
    },
    // {
    //   id: 3,
    //   type: "video",
    //   title: "Film Dizi Video Kelimeleri",
    //   link: "/film-dizi-video-kelimeleri",
    // },
  ];

  const {open} = useDailywordModalStore();

  return (
    <Container>
      <Button
        variant={"secondary"}
        marginBottom={4}
        marginLeft={"auto"}
        display={"flex"}
        paddingBlock={2}
        height={{ base: "unset"}}
        onClick={() => open()}
      >
        <Text sx={{textWrap: "auto"}}>Bugün Öğreneceğim Kelimeleri Göster</Text>
      </Button>
      <Grid
        templateColumns="repeat(24, 1fr)"
        columnGap={{ base: "0", md: "16px" }}
        rowGap="16px"
      >
        {dashboardCards.map((card) => (
          <GridItem
            key={card.id}
            colSpan={
              card.type === "day" || card.type === "week"
                ? { base: "24", md: "12" }
                : "24"
            }
          >
            <DashboardCard cardInfo={card} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
