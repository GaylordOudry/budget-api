const express                = require("express");
const {graphqlHTTP}          = require("express-graphql");
const cors                   = require("cors");
const {config}               = require("dotenv");
const mongoose               = require("mongoose");
const queries                = require("./GraphQL/Resolvers/queries");
const mutations              = require("./GraphQL/Resolvers/mutations");
const {readFileSync}         = require("fs");
const {makeExecutableSchema} = require("@graphql-tools/schema");
const isAuth                 = require("./Middleware/is-auth");
const User                   = require("./Models/user");
const bcrypt                 = require("bcryptjs");
const jwt                    = require("jsonwebtoken");
config();
const app    = express();
const PORT   = process.env.PORT;
const DB_URL = process.env.DB_URL;

const typeDefs  = readFileSync("./GraphQL/Schemas/Schema.graphql", "utf-8");
const resolvers = {...queries, ...mutations};

const schema = makeExecutableSchema({typeDefs, resolvers});

mongoose.connect(DB_URL)
		.then(() => {
			app.listen(PORT, () => {
				console.log(`Listening on: http://localhost:${PORT}`);
			});
		})
		.catch(err => console.error(err));

app.use(express.json());
app.use(cors());
app.use(isAuth);
app.use("/graphql", graphqlHTTP({schema, graphiql: true, pretty: true}));
app.post("/authenticate", async (req, res) => {
	try {
		const user = await User.findOne({email: req.email});
		if (!user) throw new Error("User does not exist");
		const isEqual = await bcrypt.compare(req.password, user.password);
		if (!isEqual) throw new Error("Wrong password !");
		const token = jwt.sign({userID: user.id, email: user.email}, process.env.SECRET_TOKEN, {expiresIn: "1h"});
		return {userID: user.id, token, tokenExpiration: 1};
	} catch (err) {
		throw new Error(err);
	}
});
app.get("/", (_, res) => {
	res.redirect("/authenticate");
});

