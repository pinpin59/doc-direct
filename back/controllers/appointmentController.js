const Appointment = require('../models/appointmentModel')

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll()
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id)
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body)
    res.status(201).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id)
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    await appointment.update(req.body)
    res.json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id)
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    await appointment.destroy()
    res.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllAppointmentByUserId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { userId: req.params.userId } })
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllAppointmentByHealthProfessionalId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { healthProfessionalId: req.params.healthProfessionalId } })
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllAppointmentCountByUserId = async (req, res) => {
  try {
    const count = await Appointment.count({ where: { userId: req.params.userId } })
    res.json({ count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllAppointmentCountByHealthProfessionalId = async (req, res) => {
  try {
    const count = await Appointment.count({ where: { healthProfessionalId: req.params.healthProfessionalId } })
    res.json({ count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}