import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { IForm } from '../types/form'
import { FormRepoImpl } from './../repo/form-repo'

const FormRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const formRepo = FormRepoImpl.of()

  interface IdParam {
    id: string
  }

  server.get('/forms', opts, async (request, reply) => {
    try {
      const forms: Array<IForm> = await formRepo.getForms()
      return reply.status(200).send({ forms })
    } catch (error) {
      console.error(`GET /forms Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.post('/forms', opts, async (request, reply) => {
    try {
      const formBody: IForm = request.body as IForm
      const form: IForm = await formRepo.addForm(formBody)
      return reply.status(201).send({ form })
    } catch (error) {
      console.error(`POST /forms Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.put<{ Params: IdParam }>('/forms/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const formBody = request.body as IForm
      const form: IForm | null = await formRepo.updateForm(id, formBody)
      if (form) {
        return reply.status(200).send({ form })
      } else {
        return reply.status(404).send({ msg: `Not Found Form:${id}` })
      }
    } catch (error) {
      console.error(`PUT /forms/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.delete<{ Params: IdParam }>('/forms/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const form: IForm | null = await formRepo.deleteForm(id)
      if (form) {
        return reply.status(204).send()
      } else {
        return reply.status(404).send({ msg: `Not Found Form:${id}` })
      }
    } catch (error) {
      console.error(`DELETE /forms/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}

export { FormRouter }
