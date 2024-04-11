const HealthProfessional = require('../models/healthProfessionalModel')

// Récupérer tous les professionnels de santé
exports.getAllHealthProfessionals = async (req, res, next) => {
  try {
    const healthProfessionals = await HealthProfessional.findAll()
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
    res.json(healthProfessional)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Créer un professionnel de santé
exports.createHealthProfessional = async (req, res, next) => {
  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingHealthProfessional = await HealthProfessional.findOne({ where: { email: req.body.email } });
    if (existingHealthProfessional) {
      return res.status(400).json({ error: 'Une erreur est survenue.' });
    }
    const healthProfessional = await HealthProfessional.create(req.body) 
    res.status(201).json(healthProfessional)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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
