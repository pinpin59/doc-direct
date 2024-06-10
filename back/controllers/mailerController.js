const transporter = require('../mailerConfig');

exports.sendEmail = (req, res) => {
    const { from,to, subject, message } = req.body;

    let mailOptions = {
        from: from, // expéditeur
        to: to, // destinataire
        subject: subject, // sujet
        text: from + ' : ' + message // contenu du message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).json(info.response);
    });
};

