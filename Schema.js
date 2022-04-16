import {buildSchema} from "graphql";

export const Schema = buildSchema(`
	type Category {
		id: ID!
		name: String!
	}
	
	type Expense {
		id: ID!
		value: Int!
		date: String!
		categoryId: String!
	}
	
	type Query {
		getCategories: [Category]!
		getCategory(id: ID!): Category
		getExpenses: [Expense]!
		getExpense(id: ID!): Expense!
	}
	
	type Mutation {
		addCategory(name: String): Category
		updateCategory(id: ID!, name: String!): Category
		removeCategory(id: ID!): Category
		addExpense(value: Int!, date: String!, categoryId: ID!): Expense
		updateExpense(value: Int!, date: String!, categoryId: ID!): Expense
		removeExpense(id: ID!): Expense
	}
`)