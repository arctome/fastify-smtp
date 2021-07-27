const sender = require('../entity/Nodemailer');

module.exports = async function VerifyHandler(_, reply) {
    await sender.verify().catch(error => {
        reply.status(500).send({ok: 0, msg: error.message})
    })
    reply.status(200).send({ok: 1})
}