const { QueryTypes } = require('sequelize');
const {sequelize} = require('./connectDb'); // Importation de la connexion à la base de données
const _ = require('lodash');

async function getCurrentAppointmentsByUserId(userId) {
    const query =
        `SELECT DISTINCT *
        FROM appointment
        WHERE
            user_id = ? AND
            appointment_date >= CURDATE()
        ORDER BY
            appointment_date ASC,
            appointment_time ASC;
        `;


    const currentAppointmentsByUserId = await sequelize.query(query, {
        replacements: [userId],
        type: QueryTypes.SELECT,
    });
    // Conversion en camel case des résultats
    const camelCaseCurrentAppointmentsByUserId = currentAppointmentsByUserId.map(currentAppointment => {
        return _.mapKeys(currentAppointment, (value, key) => _.camelCase(key));
    });
    return camelCaseCurrentAppointmentsByUserId;
}

async function getCurrentAppointmentsByHealthProfessionalId(healthProfessionalId) {
    const query =
        `SELECT DISTINCT *
        FROM appointment
        WHERE
            health_professional_id = ? AND
            appointment_date >= CURDATE()
        ORDER BY
            appointment_date ASC,
            appointment_time ASC;
        `;


    const currentAppointmentsByHealthProfessionalId = await sequelize.query(query, {
        replacements: [healthProfessionalId],
        type: QueryTypes.SELECT,
    });
    // Conversion en camel case des résultats
    const camelCaseCurrentAppointmentsByHealthProfessionalId = currentAppointmentsByHealthProfessionalId.map(currentAppointment => {
        return _.mapKeys(currentAppointment, (value, key) => _.camelCase(key));
    });

    return camelCaseCurrentAppointmentsByHealthProfessionalId;
}


module.exports = {
    getCurrentAppointmentsByUserId,
    getCurrentAppointmentsByHealthProfessionalId
};
