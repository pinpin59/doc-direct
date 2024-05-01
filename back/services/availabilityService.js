const { QueryTypes } = require('sequelize');
const {sequelize} = require('./connectDb'); // Votre configuration de base de données
const _ = require('lodash');

async function getAvailabilityForHealthProfessional(healthProfessionalId) {
    const query = `
                    SELECT
                    av.id,
                    av.health_professional_id,
                    av.day_of_week,
                    av.start_time,
                    DATE_ADD(CURDATE(), INTERVAL n DAY) AS date_of_week
                FROM
                    availability av
                JOIN (
                    -- Générer les jours de la semaine pour les 6 prochains jours à partir de la date actuelle
                    SELECT
                        n,
                        -- Traduit le jour de la semaine en français
                        CASE DAYNAME(DATE_ADD(CURDATE(), INTERVAL n DAY))
                            WHEN 'Sunday' THEN 'Dimanche'
                            WHEN 'Monday' THEN 'Lundi'
                            WHEN 'Tuesday' THEN 'Mardi'
                            WHEN 'Wednesday' THEN 'Mercredi'
                            WHEN 'Thursday' THEN 'Jeudi'
                            WHEN 'Friday' THEN 'Vendredi'
                            WHEN 'Saturday' THEN 'Samedi'
                        END AS day_of_week
                    FROM
                        (SELECT 0 AS n
                        UNION ALL SELECT 1
                        UNION ALL SELECT 2
                        UNION ALL SELECT 3
                        UNION ALL SELECT 4
                        UNION ALL SELECT 5
                        UNION ALL SELECT 6) AS days
                ) days
                ON
                    av.day_of_week = days.day_of_week
                WHERE
                    av.health_professional_id = ? -- Remplacez le ? par l'ID du professionnel de santé souhaité
                    AND NOT EXISTS (
                        SELECT
                            1
                        FROM
                            appointment ap
                        WHERE
                            ap.health_professional_id = av.health_professional_id
                            AND ap.appointment_date = DATE_ADD(CURDATE(), INTERVAL days.n DAY)
                            AND ap.appointment_time = av.start_time
                    )
                ORDER BY
                    date_of_week ASC,
                    av.start_time ASC;

    `;
    const disponibilites = await sequelize.query(query, {
        replacements: [healthProfessionalId],
        type: QueryTypes.SELECT,
    });
    // Conversion en camel case des résultats
    const camelCaseDisponibilites = disponibilites.map(disponibilite => {
        return _.mapKeys(disponibilite, (value, key) => _.camelCase(key));
    });

    return camelCaseDisponibilites;
}

module.exports = {
    getAvailabilityForHealthProfessional,
};
