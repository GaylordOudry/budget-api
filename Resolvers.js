import Category from "./Models/Category.js";
import Expense  from "./Models/Expense.js";

export const Resolvers = {
	getCategories: () => {
		return Category.find({});
	},
	getCategory: (_, args) => {
		return Category.findById(args.id);
	},
	getExpenses: () => {
		return Expense.find({});
	},
	getExpense: (_, args) => {
		return Expense.findById(args.id)
	},
	addCategory: (_, args) => {
		return Category.create({name: args.name })
	},
	updateCategory: (_, args) => {
		return Category.findByIdAndUpdate(args.id, { name: args.name })
	},
	removeCategory: (_, args) => {
		return Category.findByIdAndDelete(args.id)
	},
	addExpense: (_, args) => {
		return Expense.create({ value: args.value, date: args.date, categoryId: args.categoryId })
	},
	updateExpense: (_, args) => {
		return Expense.findByIdAndUpdate(args.id, { value: args.value, date: args.date, categoryId: args.categoryId })
	},
	removeExpense: (_, args) => {
		return Expense.findByIdAndDelete(args.id)
	}
}