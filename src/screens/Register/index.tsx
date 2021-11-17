import React, { useState } from "react";
import { Modal } from "react-native";
import Button from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import CategorySelect from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const { control, handleSubmit } = useForm();

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleTransactionsTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = () => {
    const data = {
      // name,
      // amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />

          <InputForm name="amount" control={control} placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="income"
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
