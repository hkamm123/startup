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
    this.currentSpending -= expense.amount;
  }

  removeExpense(expense) {
    const expenseIndex = this.expenses.indexOf(expense);
    if (expenseIndex !== -1) {
      this.expenses.splice(expenseIndex, 1);
      this.currentSpending += expense.amount;
    }
  }

  getSpendingStatus() {
    return "%d/%d".format(this.currentSpending, this.spendingLimit);
  }
}