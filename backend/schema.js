const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Transaction {
    _id: ID!
    text: String!
    amount: Float!
  }

  type Query {
    getTransactions: [Transaction]
  }

  type Mutation {
    addTransaction(text: String!, amount: Float!): Transaction
    deleteTransaction(id: ID!): String
  }
`;

module.exports = typeDefs;
