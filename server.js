const createApp = require('./app')
const validatePassword = require('./validation/validatePassword')
const validateUsername = require('./validation/validateUsername')

const app = createApp(validatePassword, validateUsername)

app.listen(3000, () => console.log("Listening on port 3000"))