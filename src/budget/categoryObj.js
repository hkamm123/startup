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
    this.currentSpending += expense.amount;
  }

  removeExpense(expIndex) {
    const foundExpense = this.expenses.find((e, index) => index === expIndex);
    if (foundExpense) {
      const expenseAmount = this.expenses[expIndex].amount;
      this.expenses.splice(expIndex, 1);
      this.currentSpending -= expenseAmount;
    }
  }

  getSpendingStatus() {
    if (!this.spendingLimit) {
      this.spendingLimit = 0;
    }
    return `${this.currentSpending}/${this.spendingLimit}`;
  }
}