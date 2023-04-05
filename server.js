import createApp from "./app";
import { validatePassword } from "./validation/validatePassword";
import { validateUsername } from "./validation/validateUsername";
const app = createApp(validateUsername, validatePassword);

app.listen(3000, () =>
  console.log("Listening on port 3000")
);