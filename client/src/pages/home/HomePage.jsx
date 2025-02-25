import { Container, Grid, GridItem } from "@chakra-ui/react";
import DashboardCard from "../../components/card/DashboardCard";

function HomePage() {
  const dashboardCards = [
    {
      id: 0,
      type: "day",
      title: "Günün Kelimeleri",
    },
    {
      id: 1,
      type: "week",
      title: "Haftanın Kelimeleri",
    },
    {
      id: 2,
      type: "month",
      title: "Ayın Kelimeleri",
    },
    {
      id: 3,
      type: "video",
      title: "Film Dizi Video Kelimeleri",
    },
  ];

  return (
    <Container>
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
            <DashboardCard title={card.title} type={card.type} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
