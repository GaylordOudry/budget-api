import Express                from "express";
import { graphqlHTTP }        from "express-graphql";
import cors                   from "cors";
import { config }             from "dotenv";
import mongoose               from "mongoose";
import {resolvers}            from "./Resolvers.js";
import { readFileSync }       from "fs";
import {makeExecutableSchema} from "@graphql-tools/schema";
config();
const App = Express();
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const typeDefs = readFileSync("./Schema.graphql", "utf-8");

const schema = makeExecutableSchema({ typeDefs, resolvers })

mongoose.connect(DB_URL).then(() => {
	App.listen(PORT, () => {
		console.log(`Listening on: http://localhost:${PORT}`)
	})
}).catch(err => console.error(err));

App.use(Express.json())
App.use(cors());
App.use("/graphql", graphqlHTTP({ schema, graphiql: true, pretty: true }))
App.get("/", (_, res) => {
	//res.send("Hello")
	res.redirect('/graphql')
})

