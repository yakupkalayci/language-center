import Container from "../components/layout/Container";
import FeedbacksCard from "../components/cards/FeedbacksCard";

function FeedbacksPage() {
    return (
        <Container extraClass="grid grid-cols-24 gap-y-4">
            <FeedbacksCard type="page" />
        </Container>
    )
}

export default FeedbacksPage;