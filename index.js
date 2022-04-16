import Express         from "express";
import { graphqlHTTP } from "express-graphql";
import cors            from "cors";
import { config }      from "dotenv";
import mongoose        from "mongoose";
import {Schema}        from "./Schema.js";
import {Resolvers}     from "./Resolvers.js";
config();
const App = Express();
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(() => {
	App.listen(PORT, () => {
		console.log(`Listening on: http://localhost:${PORT}`)
	})
}).catch(err => console.error(err));

App.use(cors());
App.use(Express.json())
App.use("/graphql", graphqlHTTP({ schema: Schema, rootValue: Resolvers, graphiql: true, pretty: true }))
App.get("/", (_, res) => {
	//res.send("Hello")
	res.redirect('/graphql')
})

