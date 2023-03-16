const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/task-routes");
const userrouter = require("./routes/task-routes");

const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/task", router); // localhost:5000/task
app.use("/users", userrouter);

//Database Connection
mongoose
	.connect(
		"mongodb+srv://Cowlar_Todo1:cowlar123@cluster0.lpjkg2n.mongodb.net/test",
	)
	.then(() => console.log("Connected To Database"))
	.then(() => {
		app.listen(5000);
	})
	.catch((err) => console.log(err));
