import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Transaction } from './Transaction';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      _id
      text
      amount
    }
  }
`;

export const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {data.getTransactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
