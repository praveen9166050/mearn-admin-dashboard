import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import clientRouter from "./routes/client.js";
import generalRouter from "./routes/general.js";
import managementRouter from "./routes/management.js";
import salesRouter from "./routes/sales.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/client', clientRouter);
app.use('/general', generalRouter);
app.use('/management', managementRouter);
app.use('/sales', salesRouter);

const port = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
  });
})
.catch(error => console.log(error));