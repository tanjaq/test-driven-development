const createApp = require('./app')
const validatePassword = require('./validatePassword')
const validaUsername= require('./validUsername')
const app = createApp(validatePassword,validaUsername)

app.listen(3000, () => console.log("Listening on port http://localhost:3000"))