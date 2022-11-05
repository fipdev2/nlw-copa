import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import cors from "@fastify/cors";

const prisma = new PrismaClient({
    log: ['query'],
})


async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
        return { count }
    })

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()
        return { count }
    })

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()
        return { count }
    })


    fastify.post('/pools', async (req, res) => {
        const createPoolBody = z.object({
            title: z.string()
        })
        const { title } = createPoolBody.parse(req.body)

        const generateCode = new ShortUniqueId({ length: 6 })
        const code = String(generateCode()).toLocaleUpperCase()

        await prisma.pool.create({
            data: {
                title,
                code
            }
        })
        res.status(201).send({ code })
    })
    await fastify.listen({ port: 3333 })
}
bootstrap()