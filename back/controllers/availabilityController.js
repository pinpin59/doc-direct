const Availability = require('../models/availabilityModel');
const availabilityService = require('../services/availabilityService');
const _ = require('lodash');

exports.getAllAvailabilities = async (req, res) => {
    try {
        const availabilities = await Availability.findAll()
        const camelCaseAvailabilities = availabilities.map(availability =>
            _.mapKeys(availability.dataValues, (value, key) => _.camelCase(key))
        );
        res.json(camelCaseAvailabilities)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
} 

exports.getAvailabilityById = async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id)
        if (!availability) {
            return res.status(404).json({ error: 'Availability not found' })
        }
        const camelCaseAvailability = _.mapKeys(availability.dataValues, (value, key) => _.camelCase(key));
        res.json(camelCaseAvailability)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAvailabilityByHealthProfessionalId = async (req, res) => {
    const healthProfessionalId  = req.params.id;
    try {
        const disponibilites = await availabilityService.getAvailabilityForHealthProfessional(healthProfessionalId);
        if(!disponibilites) {
            return res.status(404).json({ message: 'Aucune disponibilité trouvée pour ce professionnel de santé' });
        }
        res.json(disponibilites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des disponibilités' });
    }
}

exports.createAvailability = async (req, res) => {
    try {
        const availability = await Availability.create(req.body)
        res.status(201).json(availability)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateAvailabilityById = async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id)
        if (!availability) {
            return res.status(404).json({ error: 'Availability not found' })
        }
        await availability.update(req.body)
        res.json(availability)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteAvailabilityById = async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id)
        if (!availability) {
            return res.status(404).json({ error: 'Availability not found' })
        }
        await availability.destroy()
        res.json({ message: 'Availability deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}