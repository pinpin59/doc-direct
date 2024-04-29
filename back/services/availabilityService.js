const { QueryTypes } = require('sequelize');
const {sequelize} = require('./connectDb'); // Votre configuration de base de données

async function getAvailabilityForHealthProfessional(healthProfessionalId) {
    const query = `
        SELECT a.id, a.health_professional_id, a.day_of_week, a.start_time, a.end_time, a.is_available,
            DATE_ADD(CURRENT_DATE, INTERVAL CASE a.day_of_week
                WHEN 'Dimanche' THEN 6 - WEEKDAY(CURRENT_DATE)
                WHEN 'Lundi' THEN -WEEKDAY(CURRENT_DATE)
                WHEN 'Mardi' THEN 1 - WEEKDAY(CURRENT_DATE)
                WHEN 'Mercredi' THEN 2 - WEEKDAY(CURRENT_DATE)
                WHEN 'Jeudi' THEN 3 - WEEKDAY(CURRENT_DATE)
                WHEN 'Vendredi' THEN 4 - WEEKDAY(CURRENT_DATE)
                WHEN 'Samedi' THEN 5 - WEEKDAY(CURRENT_DATE)
            END DAY) AS date_of_week
        FROM availability a
        WHERE a.health_professional_id = ?
            AND NOT EXISTS (
                SELECT 1
                FROM appointment ap
                WHERE ap.health_professional_id = a.health_professional_id
                    AND DATE(ap.appointment_date) = DATE_ADD(CURRENT_DATE, INTERVAL CASE a.day_of_week
                        WHEN 'Dimanche' THEN 6 - WEEKDAY(CURRENT_DATE)
                        WHEN 'Lundi' THEN -WEEKDAY(CURRENT_DATE)
                        WHEN 'Mardi' THEN 1 - WEEKDAY(CURRENT_DATE)
                        WHEN 'Mercredi' THEN 2 - WEEKDAY(CURRENT_DATE)
                        WHEN 'Jeudi' THEN 3 - WEEKDAY(CURRENT_DATE)
                        WHEN 'Vendredi' THEN 4 - WEEKDAY(CURRENT_DATE)
                        WHEN 'Samedi' THEN 5 - WEEKDAY(CURRENT_DATE)
                    END DAY)
                    AND ap.appointment_time = a.start_time
            )
        ORDER BY date_of_week ASC, a.start_time ASC;
    `;
    console.log(healthProfessionalId);
    const disponibilites = await sequelize.query(query, {
        replacements: [healthProfessionalId],
        type: QueryTypes.SELECT,
    });
    console.log(disponibilites);
    return disponibilites;
}

module.exports = {
    getAvailabilityForHealthProfessional,
};
