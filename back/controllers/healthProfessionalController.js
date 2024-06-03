const HealthProfessional = require('../models/healthProfessionalModel');
const Appointment = require('../models/appointmentModel');
const { sequelize } = require('../services/connectDb');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { generateToken } = require('../jwtUtils');


// Récuperer tous les professionnels de santé
exports.getAllHealthProfessionals = async (req, res, next) => {
  try {
    const healthProfessionals = await HealthProfessional.findAll()
    if (!healthProfessionals) {
      return res.status(404).json({ error: 'Health professionals not found' })
    }
    res.json(healthProfessionals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Récupérer un professionnel de santé par son id
exports.getHealthProfessionalById = async (req, res, next) => {
  try {
    const healthProfessional = await HealthProfessional.findByPk(req.params.id)
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    const camelCaseHealthProfessional = _.mapKeys(healthProfessional.dataValues, (value, key) => _.camelCase(key));
    res.json(camelCaseHealthProfessional)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Mettre à jour son profil professionnel de santé
exports.updateHealthProfessional = async (req, res, next) => {
  try {
    const healthProfessional = await HealthProfessional.findByPk(req.params.id)
    const authentifiedHealthProfessional = req.userInfos;
    //Verifie si le professionel de santé authentifié est bien le propriétaire du profil
    if(authentifiedHealthProfessional.id !== healthProfessional.id) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    await healthProfessional.update(req.body)
    // Générer un nouveau jeton JWT après la mise à jour
    const tokenPayload = {
      id: healthProfessional.id,
      email: healthProfessional.email,
      lastname: healthProfessional.lastname,
      firstname: healthProfessional.firstname,
      city: healthProfessional.city,
      address: healthProfessional.address,
      profession: healthProfessional.profession,
      status: healthProfessional.status,
      profilePicture: healthProfessional.profilePicture
    };

    const newToken = generateToken(tokenPayload);

    res.json({token: newToken});
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Supprimer son profil professionnel de santé
exports.deleteHealthProfessional = async (req, res, next) => {
  try {
    const healthProfessional = await HealthProfessional.findByPk(req.params.id)
    const authentifiedHealthProfessional = req.userInfos;

    //Verifie si l'utilisateur authentifié est bien le propriétaire du profil
    if(authentifiedHealthProfessional.id !== healthProfessional.id) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    const appointments = await Appointment.findAll({ where: { healthProfessionalId: healthProfessional.id } })
    appointments.forEach(async appointment => {
      await appointment.destroy()
    })
    await healthProfessional.destroy()
    res.json({ message: 'Health professional deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Mettre à jour sa photo de profil professionnel de santé
exports.updateProfilePictureHealthProfessional = async (req, res, next) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const healthProfessionalId = req.params.id; 
    const authentifiedHealthProfessional = req.userInfos;
    const healthProfessional = await HealthProfessional.findByPk(healthProfessionalId)
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    //Verifie si l'utilisateur authentifié est bien le propriétaire du profil
    if(authentifiedHealthProfessional.id !== healthProfessional.id) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    healthProfessional.profilePicture = req.file.filename
    await healthProfessional.save();

    // Générer un nouveau jeton JWT après la mise à jour
    const tokenPayload = {
        id: healthProfessional.id,
        email: healthProfessional.email,
        lastname: healthProfessional.lastname,
        firstname: healthProfessional.firstname,
        city: healthProfessional.city,
        address: healthProfessional.address,
        profession: healthProfessional.profession,
        status: healthProfessional.status,
        profilePicture: healthProfessional.profilePicture
    };

    const newToken = generateToken(tokenPayload);

    res.json({token: newToken});
   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

