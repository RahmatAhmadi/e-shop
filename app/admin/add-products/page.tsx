import React from "react";
import AddProductForm from "./AddProductForm";
import Container from "@/app/components/Container";
import FormWrapper from "@/app/components/FormWrapper";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access denied." />;

  return (
    <div className="p-8">
      <Container>
        <FormWrapper>
          <AddProductForm />
        </FormWrapper>
      </Container>
    </div>
  );
};

export default AddProducts;
