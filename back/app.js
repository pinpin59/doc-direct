const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express()

const healthProfessionalsRoutes = require('./routes/healthProfessionalRoutes')
const usersRoutes = require('./routes/userRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use('/api/users', usersRoutes)
app.use('/api/health-professionals', healthProfessionalsRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app 