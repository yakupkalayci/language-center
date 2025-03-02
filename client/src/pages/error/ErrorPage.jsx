import { Container, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router";

function ErrorPage({ resetErrorBoundary }) {
  return (
    <Container>
      <Heading>Beklenmedik Bir Hata Oluştu.</Heading>
      <Link to="/">
        <Button variant="primary" onClick={resetErrorBoundary}>
          Sayfayı Yenile
        </Button>
      </Link>
    </Container>
  );
}

export default ErrorPage;
