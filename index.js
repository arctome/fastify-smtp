'use strict'

require('make-promises-safe') // installs an 'unhandledRejection' handler, can be deprecate when using Node.js v15+
require('dotenv').config()
const fastify = require('fastify')({
    logger: true
})
const Sentry = require('@sentry/node')
const pkg = require('./package.json')

// Routes
const VerifyHandler = require('./src/verify')
const HealthHandler = require('./src/health')
const SendHandler = require('./src/send')

if (process.env.SENTRY_ENABLE) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        release: `fastify-smtp@${pkg.version}`
    })
    fastify.addHook('onError', (request, reply, error, done) => {
        // Only send Sentry errors when not in development
        if (process.env.NODE_ENV !== 'development') {
            Sentry.captureException(error)
        }
        done()
    })
}

fastify.get('/_health', async (request, reply) => {
    return await HealthHandler(request, reply)
})
fastify.get('/_verify', async (request, reply) => {
    return await VerifyHandler(request, reply)
})
fastify.post('/send', async (request, reply) => {
    return await SendHandler(request, reply);
})

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()