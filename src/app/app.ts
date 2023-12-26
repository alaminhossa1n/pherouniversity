import express, { Application } from "express";
import cors from "cors";
import { categoryRoutes } from "./modules/Category/category.route";
import { courseRoutes } from "./modules/Course/course.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { reviewRoutes } from "./modules/Review/review.route";
import { AuthRoutes } from "./modules/Auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoutes);
app.use("/api", courseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send("YES Its Working.....!");
});

//global error handler
app.use(globalErrorHandler);

export default app;
