import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
	id: String,
	value: Number,
	date: String,
	categoryId: String,
	libelle: String
})

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;