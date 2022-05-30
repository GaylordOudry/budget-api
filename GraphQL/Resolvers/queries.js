const Category = require("../../Models/category");
const Expense  = require("../../Models/expense");
const User     = require("../../Models/user");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const {config} = require("dotenv");
config();

module.exports = {
	Query: {
		Categories          : (_, args, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			return Category.find({});
		},
		Category            : (_, {id}, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			return Category.findById(id);
		},
		Expenses            : (parent, args, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			return Expense.find({creator: req.userId});
		},
		ExpensesByCategoryId: ({id}) => {
			return Expense.find({categoryId: id});
		},
		Expense             : ({id}) => {
			return Expense.findById(id);
		}
	}
};