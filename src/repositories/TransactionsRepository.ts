import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce((transactionAccumulator: Balance, currentTransaction: Transaction) => {
      switch (currentTransaction.type) {
        case 'income':
          transactionAccumulator.income += currentTransaction.value;
          break;
        case 'outcome':
          transactionAccumulator.outcome += currentTransaction.value;
          break;
        default:
          break;
      }

      return transactionAccumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
