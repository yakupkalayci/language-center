import Container from "@/app/components/layout/Container";
import UsersCard from "./components/cards/UsersCard";
import FeedbacksCard from "./components/cards/FeedbacksCard";

export default function Home() {
  return (
    <Container extraClass="grid grid-cols-24 gap-y-4">
      <UsersCard type="card" />
      <FeedbacksCard type="card" />
    </Container>
  );
}
