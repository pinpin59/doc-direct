// Tableau contenant les données de disponibilité
const availabilityData = [
    // Disponibilités pour le lundi
    {
        day: 'Lundi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Lundi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Lundi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    // Disponibilités pour le mardi
    {
        day: 'Mardi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Mardi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    {
        day: 'Mardi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    // Disponibilités pour le mercredi
    {
        day: 'Mercredi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Mercredi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    {
        day: 'Mercredi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    // Disponibilités pour le jeudi
    {
        day: 'Jeudi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    {
        day: 'Jeudi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Jeudi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    // Disponibilités pour le vendredi
    {
        day: 'Vendredi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Vendredi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Vendredi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    // Disponibilités pour le samedi
    {
        day: 'Samedi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Samedi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Samedi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    // Disponibilités pour le dimanche
    {
        day: 'Dimanche',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: false,
        healthProfessionalId: 1
    },
    {
        day: 'Dimanche',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Dimanche',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 1
    },
    {
        day: 'Lundi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Lundi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Lundi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    // Disponibilités pour le mardi
    {
        day: 'Mardi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Mardi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    {
        day: 'Mardi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    // Disponibilités pour le mercredi
    {
        day: 'Mercredi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Mercredi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    {
        day: 'Mercredi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    // Disponibilités pour le jeudi
    {
        day: 'Jeudi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    {
        day: 'Jeudi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Jeudi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    // Disponibilités pour le vendredi
    {
        day: 'Vendredi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Vendredi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Vendredi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    // Disponibilités pour le samedi
    {
        day: 'Samedi',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Samedi',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Samedi',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    // Disponibilités pour le dimanche
    {
        day: 'Dimanche',
        startTime: '09:00',
        endTime: '10:00',
        isAvailable: false,
        healthProfessionalId: 2
    },
    {
        day: 'Dimanche',
        startTime: '10:00',
        endTime: '11:00',
        isAvailable: true,
        healthProfessionalId: 2
    },
    {
        day: 'Dimanche',
        startTime: '11:00',
        endTime: '12:00',
        isAvailable: true,
        healthProfessionalId: 2
    },

    

];

module.exports = availabilityData;
