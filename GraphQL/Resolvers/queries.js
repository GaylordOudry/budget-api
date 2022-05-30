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
		},
		Login               : async (_, {email, password}) => {
			console.log({email, password});
			try {
				const user = await User.findOne({email: email});
				if (!user) throw new Error("User does not exist");
				const isEqual = await bcrypt.compare(password, user.password);
				if (!isEqual) throw new Error("Wrong password !");
				const token = jwt.sign({userID: user.id, email: user.email}, process.env.SECRET_TOKEN, {expiresIn: "1h"});
				return {userID: user.id, token, tokenExpiration: 1};
			} catch (err) {
				throw new Error(err);
			}
		}
	}
};