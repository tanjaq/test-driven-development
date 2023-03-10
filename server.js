const createApp = require('./app')
const validatePassword = require('./validation/validatePassword')

const app = createApp(validatePassword)

app.listen(3000, () => console.log("Listening on port 3000"))