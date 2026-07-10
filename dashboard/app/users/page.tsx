import Container from "../components/layout/Container";
import UsersCard from "../components/cards/UsersCard";

function UserPage() {
    return (
        <Container extraClass="grid grid-cols-24 gap-y-4">
            <UsersCard type="page" />
        </Container>
    )
}

export default UserPage;