const server = require("express")();

export function keepAlive() {

   server.listen(3000, () => { console.log("Server is ready!") });

}