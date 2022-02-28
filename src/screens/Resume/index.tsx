import React from "react";
import HistoryCard from "../../components/HistoryCard";
import { StringResources } from "../../Utils/stringResources";
import { Container, Header, Title } from "./styles";

const { RESUMO_POR_CATEGORIA } = StringResources;

const Resume: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>{RESUMO_POR_CATEGORIA}</Title>
      </Header>

      <HistoryCard color="red" title="compras" amount={100} />
    </Container>
  );
};

export default Resume;
