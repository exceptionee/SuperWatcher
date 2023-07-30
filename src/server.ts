import express from "express";

const app = express();

app.get("/", (req, res) => {

   res.send("Server is online.");

});

export function keepAlive() {

   app.listen(3000, () => { console.log("Server is ready!") });

}