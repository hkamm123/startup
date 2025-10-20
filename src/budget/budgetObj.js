import { Category } from "../category/category";
import { CategoryObj } from "./categoryObj";

export class BudgetObj {
  constructor(username) {
    this.username = username;
    this.categories = [];
  }

  addCategory(categoryName, spendingLimit) {
    if (this.categories.find(cat => cat.name === categoryName)) {
      this.categories.find(cat => cat.name === categoryName).spendingLimit = spendingLimit;
    } else {
      this.categories.push(new CategoryObj(categoryName, spendingLimit));
    }
  }

  removeCategory(categoryName) {
    this.categories = this.categories.filter(cat => cat.name !== categoryName);
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

  addExpense(categoryName, expense) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.addExpense(expense);
    } else {
      this.addCategory(new CategoryObj(categoryName, 0));
      this.addExpense(categoryName, expense);
    }
  }
}