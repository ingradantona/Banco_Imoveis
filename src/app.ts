import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";

import { usersRoute } from "./routes/users.route";
import { loginRoute } from "./routes/login.route";
import { categoryRoute } from "./routes/categories.route";
import { propertiesRoute } from "./routes/properties.route";
import { shedulesRoute } from "./routes/schedules.route";

const app = express();

app.use(express.json());

app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/categories", categoryRoute);
app.use("/properties", propertiesRoute);
app.use("/schedules", shedulesRoute);
app.use(handleErrorMiddleware);

export default app;
