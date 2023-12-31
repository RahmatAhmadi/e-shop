import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrapper>
          <CheckoutClient />
        </FormWrapper>
      </Container>
    </div>
  );
};

export default Checkout;
