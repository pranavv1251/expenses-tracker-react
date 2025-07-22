import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      _id
      text
      amount
    }
  }
`;

export const Balance = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const amounts = data.getTransactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
};
