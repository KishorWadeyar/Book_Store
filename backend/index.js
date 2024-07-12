import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";
import contactRoute from "./route/contact.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3001;
const URI = process.env.MongoDBURI;
mongoose.connect(URI).then(() => console.log("DB connected"));

// Middleware to parse JSON bodies
// app.use(express.json());

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/contact", contactRoute);

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
