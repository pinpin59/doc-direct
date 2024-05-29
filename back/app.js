const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const path = require('path');
const app = express()

// Routes imports
const authRoutes = require('./routes/authRoutes')
const healthProfessionalsRoutes = require('./routes/healthProfessionalRoutes')
const usersRoutes = require('./routes/userRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const availabilityRoutes = require('./routes/availabilityRoutes')
const adminRoutes = require('./routes/adminRoutes')
// Middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())
 
// Routes
app.use('/api', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/health-professionals', healthProfessionalsRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app 