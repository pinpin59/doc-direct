const Appointment = require('../models/appointmentModel')
const Avaibility = require('../models/availabilityModel')
const HealthProfessional = require('../models/healthProfessionalModel')
const User = require('../models/userModel')

//Changer le status par id du professionnel de santé
exports.updateHealthProfessionalStatus = async (req, res, next) => {
    const healthProfessionalId = req.params.id;
    const status = req.body.status;
    const userRole = req.userInfos.role;

    if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
    }

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

//Récuperer les professionnels de santé avec le status pending
exports.getHealthProfessionalsStatus = async (req, res, next) => {
    const status = req.params.status;
    const userRole = req.userInfos.role;

    if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
    }
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

exports.updateHealthProfessional = async (req, res, next) => {
    try {
      const healthProfessional = await HealthProfessional.findByPk(req.params.id)
      const userRole = req.userInfos.role;

      if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      if (!healthProfessional) {
        return res.status(404).json({ error: 'Health professional not found' })
      }
      await healthProfessional.update(req.body)
  
      res.json(healthProfessional)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

}

exports.deleteHealthProfessional = async (req, res, next) => {
    try {
      const healthProfessional = await HealthProfessional.findByPk(req.params.id)
      const userRole = req.userInfos.role;

      if(userRole !== 'ROLE_ADMIN') {
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

// Partie users 

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    const userRole = req.userInfos.role;

    if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
    }
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      const userRole = req.userInfos.role;
  
      if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      await user.update(req.body)
  
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      const userRole = req.userInfos.role;

      if(userRole !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      //supprimer les appointments associés à l'utilisateur
      const appointments = await Appointment.findAll({ where: { userId: user.id } })
      appointments.forEach(async appointment => {
        await appointment.destroy()
      })
      await user.destroy()
      res.json({ message: 'User deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}

