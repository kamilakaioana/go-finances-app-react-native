import React, { useState } from "react";
import Button from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionsTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />
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
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};

export default Register;
