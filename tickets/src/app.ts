import express from "express";
import  "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@esticket/common";
import { currentUser } from "@esticket/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";


const app = express();
app.use(json());
app.set("trust proxy", true); // trust first party cookies
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test", // if not in test environment, use secure cookies
}));

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
 

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
