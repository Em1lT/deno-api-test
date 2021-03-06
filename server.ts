import { Application } from "https://deno.land/x/abc/mod.ts";
import { log } from "./controllers/logController.ts"
import { loginController } from "./controllers/loginController.ts"
import { notesController } from "./controllers/notesController.ts"
import { friendsController } from "./controllers/friendsController.ts"
import { auth } from "./controllers/authController.ts";

const app = new Application();

app.use(log);

loginController(app, 'user');
friendsController(app, 'user');
notesController(app, 'notes');

app.start({ port: 8080});
console.log("Running on port 8080!");
