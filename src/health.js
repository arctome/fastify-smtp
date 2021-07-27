const sender = require('../entity/Nodemailer');

module.exports = async function HealthHandler(_, reply) {
    const isIdle = sender.isIdle()
    reply.status(200).send({ok: 1, is_idle: isIdle});
}