import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Button from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import CategorySelect from "../CategorySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { schema } from "./schema";
import { ScrollView } from "react-native-gesture-handler";

interface FormData {
  name: string;
  amount: number;
}
const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dataKey = "@goFinances:transactions";
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

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "categoria",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel realizar o cadastro");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <ScrollView>
          <Form>
            <Fields>
              <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                Error={errors.name && errors.name.message}
              />

              <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                Error={errors.amount && errors.amount.message}
              />
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

            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </Form>
        </ScrollView>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
