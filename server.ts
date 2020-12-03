import { Application } from "https://deno.land/x/abc/mod.ts";
import { loginController } from "./controllers/loginController.ts"
import { log } from "./controllers/logController.ts"

const app = new Application();

app.use(log);

loginController(app);

app.start({ port: 8080});
console.log("Running on port 8080!");
