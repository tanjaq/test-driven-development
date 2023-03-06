const express = require('express')
const cors = require('cors')
const validatePassword = require('./validatePassword')
const validateUserInput = require('./validateUserinput')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(__dirname + '/public'));

app.post('/users', (req, res) => {
  const { username, password } = req.body

  const validUsername = validateUserInput(username)
  // const validUsername = true
  const validPassword = validatePassword(password)

  if (validUsername && validPassword) {
    res.send({ message: 'Valid User' });
  } else if (!validUsername) {
    res.send({ error: 'Invalid Username' });
  } else {
    res.send({ error: 'Invalid Password' });
  }
})


app.listen(3000, () => console.log("Listening on port 3000"))