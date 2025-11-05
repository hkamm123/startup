import { CategoryObj } from "./categoryObj.js";

export class BudgetObj {
  constructor(username) {
    this.username = username;
    this.categories = [];
  }

  addCategory(categoryName, spendingLimit) {
    const name = typeof categoryName === 'string' ? categoryName : categoryName?.name;
    const limit = typeof spendingLimit === 'number' ? spendingLimit : categoryName?.spendingLimit ?? 0;

    const existing = this.categories.find(cat => cat.name === name);
    if (existing) {
      existing.spendingLimit = limit;
    } else {
      this.categories.push(new CategoryObj(name, limit));
    }
  }

  removeCategory(categoryName) {
    this.categories = this.categories.filter(cat => cat.name !== categoryName);
  }

  removeExpense(catIndex, expIndex) {
    const category = this.categories.find((cat, index) => index === catIndex);
    if (category) {
      category.removeExpense(expIndex);
    }
  }

  addExpense(categoryName, expense) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.addExpense(expense);
    } else {
      const newCategory = new CategoryObj(categoryName, 0);
      newCategory.addExpense(expense);
      this.categories.push(newCategory);
    }
  }
}