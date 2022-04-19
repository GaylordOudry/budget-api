import Category from "./Models/Category.js";
import Expense  from "./Models/Expense.js";

export const resolvers = {
	Query: {
		Categories: () => {
			return Category.find({});
		},
		Category: (parent, args) => {
			return Category.findById(args.id);
		},
		Expenses: () => {
			return Expense.find({});
		},
		Expense: (_, args) => {
			return Expense.findById(args.id)
		},
	},
	Mutation: {
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
			return Expense.create({ value: args.value, date: args.date, categoryId: args.categoryId, libelle: args.libelle })
		},
		updateExpense: (_, args) => {
			return Expense.findByIdAndUpdate(args.id, { value: args.value, date: args.date, categoryId: args.categoryId, libelle: args.libelle })
		},
		removeExpense: (_, args) => {
			return Expense.findByIdAndDelete(args.id)
		}
	}
}