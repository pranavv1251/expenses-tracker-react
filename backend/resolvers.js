const Transaction = require('./models/Transaction');

const resolvers = {
  Query: {
    getTransactions: async () => await Transaction.find(),
  },
  Mutation: {
    addTransaction: async (_, { text, amount }) => {
      const transaction = new Transaction({ text, amount });
      return await transaction.save();
    },
    deleteTransaction: async (_, { id }) => {
      await Transaction.findByIdAndDelete(id);
      return "Transaction deleted";
    },
  },
};

module.exports = resolvers;
