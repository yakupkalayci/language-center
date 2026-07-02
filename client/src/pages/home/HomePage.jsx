import { Container } from '@chakra-ui/react';
import Banner from '../../components/landing/Banner';
import Specs from '../../components/landing/Specs';
import HowTo from '../../components/landing/HowTo';
import ContactForm from '../../components/landing/ContactForm';
  
function HomePage() {

  
  return (
    <Container>
      <Banner />
      <Specs />
      <HowTo />
      <ContactForm />
    </Container>
  )
}

export default HomePage;