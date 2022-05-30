const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
	value     : {
		type    : Number,
		required: true
	},
	date      : {
		type    : String,
		required: true
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref : "Category"
	},
	libelle   : {
		type    : String,
		required: true
	},
	creator   : {
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	}
});

module.exports = mongoose.model("Expense", ExpenseSchema);
