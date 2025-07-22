import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_TRANSACTION = gql`
  mutation AddTransaction($text: String!, $amount: Float!) {
    addTransaction(text: $text, amount: $amount) {
      _id
      text
      amount
    }
  }
`;

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: ['GetTransactions'], // auto-refresh the list
  });

  const onSubmit = async e => {
    e.preventDefault();

    if (!text || amount === 0) return;

    await addTransaction({
      variables: {
        text,
        amount: parseFloat(amount)
      }
    });

    setText('');
    setAmount(0);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
