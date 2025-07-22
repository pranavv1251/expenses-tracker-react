import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

export const Transaction = ({ transaction }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ['GetTransactions'],
  });

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span>
      <button
        onClick={() => deleteTransaction({ variables: { id: transaction._id } })}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
