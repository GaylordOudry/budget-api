const Category = require("../../Models/category");
const Expense  = require("../../Models/expense");
const User     = require("../../Models/user");
const bcrypt   = require("bcryptjs");

module.exports = {
	Mutation: {
		addCategory   : (_, args) => {
			return Category.create({name: args.categoryInput.name});
		},
		updateCategory: (_, {categoryInput}) => {
			return Category.findByIdAndUpdate(categoryInput.id, {name: categoryInput.name});
		},
		removeCategory: (_, {id}) => {
			return Category.findByIdAndDelete(id);
		},
		addExpense    : (_, {expenseInput}, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			return Expense.create({
				value     : expenseInput.value,
				date      : new Date(expenseInput.date),
				categoryId: expenseInput.categoryId,
				libelle   : expenseInput.libelle,
				creator   : req.userId
			});
		},
		updateExpense : (_, {expenseInput}, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			if (expenseInput.creator !== req.userId) throw new Error("You cannot update this expense");
			return Expense.findByIdAndUpdate(expenseInput.id, {
				value     : expenseInput.value,
				date      : new Date(expenseInput.date),
				categoryId: expenseInput.categoryId,
				libelle   : expenseInput.libelle,
				creator   : expenseInput.creator
			});
		},
		removeExpense : (_, {id, userID}, req) => {
			if (!req.isAuth) throw new Error("Unauthenticated");
			if (userID !== req.userId) throw new Error("You cannot delete this expense");
			return Expense.findOneAndRemove({creator: userID});
		},
		addUser       : async (_, {userInput}) => {
			try {
				const isExistingUser = await User.findOne({email: userInput.email});
				if (isExistingUser) {
					return new Error("User already in the database !");
				}
				const hashedPwd = await bcrypt.hash(userInput.password, 16);
				const user      = await User.create({
					email   : userInput.email,
					password: hashedPwd
				});
				return {...user.doc, id: user.id, email: user.email, password: null};
			} catch (err) {
				throw err;
			}
		}
	}
};