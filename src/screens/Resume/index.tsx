import React, { useEffect, useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import { StringResources } from "../../Utils/stringResources";
import { Container, Header, Title, Content } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../Utils/categories";

const { RESUMO_POR_CATEGORIA } = StringResources;

type CategoryType = {
  key: string;
  name: string;
  total: number;
  color: string;
};

const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryType[]>();
  async function loadData() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response != null ? JSON.parse(response) : [];

    const cashOut: TransactionCardProps[] = responseFormatted.filter(
      (item: TransactionCardProps) => item.type === "down"
    );
    let totalByCategory: CategoryType[] = [];

    categories.forEach((category) => {
      let categorySum: CategoryType["total"] = 0;
      cashOut.forEach((cashOut: TransactionCardProps) => {
        if (cashOut.category === category.key) {
          categorySum += cashOut.amount;
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          name: category.name,
          total: categorySum,
          color: category.color,
          key: category.key,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{RESUMO_POR_CATEGORIA}</Title>
      </Header>
      <Content>
        {totalByCategories?.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            title={item.name}
            amount={item.total}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
