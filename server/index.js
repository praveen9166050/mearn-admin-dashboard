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

// To insert bulk user data
// import { dataAffiliateStat, dataOverallStat, dataProduct, dataProductStat, dataTransaction, dataUser } from "./data/index.js";
// import User from "./models/User.js";
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
// import OverallStat from "./models/OverallStat.js";
// import AffiliateStat from "./models/AffiliateStat.js";

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message
  });
});

const port = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);

    // Add data only one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  });
})
.catch(error => console.log(error));