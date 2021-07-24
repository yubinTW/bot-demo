import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import util from 'util'

type WebHookRequest = {
  queryResult: {
    queryText: string
    action: string
    parameters: any
    intent: {
      name: string
      displayName: string
    }
  }
}

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
  server.listen(port, (err, _) => {
    if (err) {
      console.error(err)
    }
  })

  server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.post('/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as WebHookRequest
    console.log('request body = ', util.inspect(data, true, null))
    const intent = data.queryResult.intent.displayName
    if (intent === 'Get Computer Name - yes') {
      const computerName = data.queryResult.parameters['computerName']
      console.log('computerName = ', computerName)
      // TODO: call Backend API to create the form
      const response = {
        fulfillmentMessages: [
          {
            text: {
              text: [`已為電腦 ${computerName} 建立報修單`]
            }
          }
        ]
      }
      return reply.status(200).send(response)
    }

    // default response
    const response = {
      fulfillmentMessages: [
        {
          text: {
            text: ['Text response from webhook']
          }
        }
      ]
    }
    return reply.status(200).send(response)
  })

  return server
}

export { startFastify }
