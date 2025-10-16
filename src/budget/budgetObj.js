export class BudgetObj {
  constructor(username) {
    this.username = username;
    this.categories = [];
  }

  addCategory(category) {
    this.categories.push(category);
  }

  removeCategory(categoryName) {
    this.categories.remove(cat => cat.name === categoryName);
  }

  removeExpense(expense) {
    for (const category of this.categories) {
      const expenseIndex = category.expenses.indexOf(expense);
      if (expenseIndex !== -1) {
        category.removeExpense(expenseIndex);
        return;
      }
    }
  }
}