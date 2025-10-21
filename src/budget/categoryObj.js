export class CategoryObj {
  constructor(name, spendingLimit) {
    this.name = name;
    this.spendingLimit = spendingLimit;
    this.expenses = [];
    this.currentSpending = 0;
  }

  setSpendingLimit(newLimit) {
    this.spendingLimit = newLimit;
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  removeExpense(expIndex) {
    const foundExpense = this.expenses.find((e, index) => index === expIndex);
    if (foundExpense) {
      const expenseAmount = this.expenses[expIndex].amount;
      this.expenses.splice(expIndex, 1);
    }
  }

  getSpendingStatus() {
    if (!this.spendingLimit) {
      this.spendingLimit = 0;
    }
    return `${this.getCurrentSpending()}/${this.spendingLimit}`;
  }

  getCurrentSpending() {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}