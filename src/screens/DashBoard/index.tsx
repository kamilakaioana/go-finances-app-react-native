import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header, HighlightCards, Icon, Photo, Title,
  TransactionList, Transactions, User,
  UserGreeting, UserInfo, UserName, UserWrapper
} from './styles';



export interface DataListProps extends TransactionCardProps {
  id: string;
}

const DashBoard: React.FC = () => {

  
  

  const data: DataListProps[] = [ 
    {
      id:'1',
    type: 'positive',
    title:"Desenvolvimento de site",
    amount:"R$ 12.000,00",
    category:{
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date:"13/04/2020",
  },
  {
    id:'2',
    type: 'negative',
    title:"Hamburgueria Pizzy",
    amount:"R$ 59,00",
    category:{
      name: 'Alimentação',
      icon: 'coffee',
    },
    date:"10/04/2020",
  },
  {
    id:'3',
    type: 'negative',
    title:"Aluguel do apartamento",
    amount:"R$ 1.200,00",
    category:{
      name: 'Casa',
      icon: 'shopping-bag',
    },
    date:"10/04/2020",
  }, 
  
];

    return (
    <Container>
      <Header>
        <UserWrapper>
            <UserInfo>
               <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/50750571?s=400&u=27b39e589621e00d9f482898cf7a4569a1eb1589&v=4'}}/>
                <User>
                   <UserGreeting>Olá,</UserGreeting>
                   <UserName>Kamila</UserName>
                </User>              
            </UserInfo>
            <Icon name="power"/>
        </UserWrapper>      
      </Header>
      
      <HighlightCards >
      <HighlightCard type="up" title="Entrada" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril"/>
      <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 03 de abril"/>
      <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de abril"/>
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item }) => <TransactionCard data={item}/>}
        
        />

        
      </Transactions>

    </Container>

  )
}

export default DashBoard;

