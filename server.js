const express = require('express')
const cors = require('cors')
const validatePassword = require('./validatePassword')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(__dirname + '/public'));

app.post('/users', (req, res) => {
  const { username, password } = req.body

  const validUsername = validateUsername(user)
  const validPassword = validatePassword(password)

  if (validUsername && validPassword) {
    res.send({message: "Valid User"})
  } else {
    res.send({error: "Invalid User"})
  }
})


app.listen(3000, () => console.log("Listening on port 3000"))