import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
	value: Number,
	date: String,
	categoryId: String
})

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;