require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express()
const { doubleCsrfProtection } = require('./csrfConfig'); // Importez la protection CSRF à partir du fichier de configuration

// Routes imports
const authRoutes = require('./routes/authRoutes')
const healthProfessionalsRoutes = require('./routes/healthProfessionalRoutes')
const usersRoutes = require('./routes/userRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const availabilityRoutes = require('./routes/availabilityRoutes')
const adminRoutes = require('./routes/adminRoutes')
const csrfRoutes = require('./routes/csrfRoutes')
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, // autorise les cookies dans les requêtes cross-origin    
};
// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(cookieParser());
// Routes
app.use("/api/csrf-token", csrfRoutes);
// Middleware CSRF appliqué à toutes les routes de l'API
app.use(doubleCsrfProtection);
app.use('/api', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/health-professionals', healthProfessionalsRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app 