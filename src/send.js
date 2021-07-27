const sender = require('../entity/Nodemailer');

module.exports = async function SendHandler(request, reply) {
    const reqJson = request.body;
    // required keys: to(, cc, bcc), subject, use_html, content 
    if (!reqJson.to || !reqJson.subject || !reqJson.content) {
        reply.status(400).send({ ok: 0, msg: "Required params not delivered." })
        return;
    }
    const sendMailData = {
        from: process.env.NODEMAILER_SMTP_SEND_FROM || process.env.NODEMAILER_SMTP_AUTH_USER,
        sender: process.env.NODEMAILER_SMTP_SEND_SENDER || "",
        //envelope: {
        //    from: '', // TODO: Currently not support custom envelope
        //},
        to: reqJson.to,
        cc: reqJson.cc,
        bcc: reqJson.bcc,
        subject: reqJson.subject
    };
    if (reqJson.use_html) {
        sendMailData.html = reqJson.content;
    } else {
        sendMailData.text = reqJson.content;
    }
    // Optional configs for mail
    if (reqJson.attachments) {
        sendMailData.attachments = reqJson.attachments;
    }
    if (reqJson.icalEvent) {
        sendMailData.icalEvent = reqJson.icalEvent;
    }
    let sendResult = await sender.sendMail(sendMailData).catch(error => {
        reply.status(500).send({ ok: 0, msg: error.message })
    });
    /**
     * {
     *     "accepted": ["<email_address>"],
     *     "rejected": [],
     *     "envelopeTime": <int>,
     *     "messageTime": <int>,
     *     "messageSize": <int>,
     *     "response": "<response_text>",
     *     "envelope": {
     *         "from": "<email_address>",
     *         "to": ["<email_address>"]
     *     },
     *     "messageId": "<messageId_text>"
     * }
     */
    reply.status(200).send({ok: 1})
}