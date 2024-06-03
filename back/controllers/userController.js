const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const fs = require('fs');
const path = require('path');
const { generateToken } = require('../jwtUtils');


 
// Récupérer un utilisateur par son id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Mettre à jour son profil utilisateur
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const authentifiedUser = req.userInfos;
    //Verifie si l'utilisateur authentifié est bien le propriétaire du profil
    if(authentifiedUser.id !== user.id) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.update(req.body)
    // Générer un nouveau jeton JWT après la mise à jour
    const tokenPayload = {
      id: user.id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      city: user.city,
      address: user.address,
      profilePicture: user.profilePicture,
      role: user.role
    };

    const newToken = generateToken(tokenPayload);
    res.json({token: newToken});
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Supprimer son profil utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const authentifiedUser = req.userInfos;

    if(authentifiedUser.id !== user.id) {
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

exports.updateProfilePictureUser = async (req, res, next) => {
  const uploadsDir = path.join(__dirname, '../uploads');
  const userId = req.params.id; 
  const user = await User.findByPk(userId)
  const authentifiedUser = req.userInfos;
  
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    //Verifie si l'utilisateur authentifié est bien le propriétaire du profil
    if(authentifiedUser.id !== user.id) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.profilePicture = req.file.filename
    await user.save();

    // Générer un nouveau jeton JWT après la mise à jour
    const tokenPayload = {
        id: user.id,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        city: user.city,
        address: user.address,
        profilePicture: user.profilePicture,
        role: user.role
    };

    const newToken = generateToken(tokenPayload);

    res.json({token: newToken});
   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

