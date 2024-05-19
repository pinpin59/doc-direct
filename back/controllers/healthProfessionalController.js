const HealthProfessional = require('../models/healthProfessionalModel')
const Availability = require('../models/availabilityModel')
const { sequelize } = require('../services/connectDb');
const _ = require('lodash');
const { generateToken } = require('../jwtUtils');

// Récupérer tous les professionnels de santé
exports.getAllHealthProfessionals = async (req, res, next) => {
  try {
      const healthProfessionals = await HealthProfessional.findAll();
      // Converti les données en camel case
      const camelCaseHealthProfessionals = healthProfessionals.map(healthProfessional => 
          _.mapKeys(healthProfessional.dataValues, (value, key) => _.camelCase(key))
      );
      res.json(camelCaseHealthProfessionals);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

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

// Créer un professionnel de santé
exports.createHealthProfessional = async (req, res) => {
  const { email, password, lastname, firstname, city, address, profession, availabilities } = req.body;
  //console.log(req.body);

  try {
    // Démarrer une transaction
    await sequelize.transaction(async (t) => {
      // Créer le professionnel de santé
      const healthProfessional = await HealthProfessional.create({
        email,
        password,
        lastname,
        firstname,
        city,
        address,
        profession
      });
      console.log(availabilities);
      // Ajouter les disponibilités
      await Availability.bulkCreate(availabilities.map(av => ({
        healthProfessionalId: healthProfessional.id,
        dayOfWeek: av.dayOfWeek,
        startTime: av.startTime
      })), { transaction: t });
    });

    res.status(201).json({ message: 'Health professional created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Mettre à jour un professionnel de santé
exports.updateHealthProfessional = async (req, res, next) => {
  try {
    const healthProfessional = await HealthProfessional.findByPk(req.params.id)
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    await healthProfessional.update(req.body)
    res.json(healthProfessional)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Supprimer un professionnel de santé
exports.deleteHealthProfessional = async (req, res, next) => {
  try {
    const healthProfessional = await HealthProfessional.findByPk(req.params.id)
    if (!healthProfessional) {
      return res.status(404).json({ error: 'Health professional not found' })
    }
    await healthProfessional.destroy()
    res.json({ message: 'Health professional deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateProfilePictureHealthProfessional = async (req, res, next) => {
  const healthProfessionalId = req.params.id; 
  try {
    const healthProfessional = await HealthProfessional.findByPk(healthProfessionalId)
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

//Récuperer les professionnels de santé avec le status pending
exports.getHealthProfessionalsStatus = async (req, res, next) => {
  const status = req.params.status;

  if(status !== 'pending' && status !== 'verified' && status !== 'rejected') {
      return res.status(400).json({ error: 'Invalid status' });
  }

  try {
      const healthProfessionalsStatusPending = await HealthProfessional.findAll({
          where: {
              status: status
          }
      });
      res.json(healthProfessionalsStatusPending);
  } catch (error) {
      res.status(500).json({ error: error.message });
  } 
};

//Changer le status par id 

exports.updateHealthProfessionalStatus = async (req, res, next) => {
  const healthProfessionalId = req.params.id;
  const status = req.body.status;
  console.log(status);

  if(status !== 'pending' && status !== 'verified' && status !== 'rejected') {
      return res.status(400).json({ error: 'Invalid status' });
  }

  try {
      const healthProfessional = await HealthProfessional.findByPk(healthProfessionalId);
      if (!healthProfessional) {
          return res.status(404).json({ error: 'Health professional not found' });
      }
      healthProfessional.status = status;
      await healthProfessional.save();
      res.json(healthProfessional);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


