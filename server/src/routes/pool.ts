import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance) {
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
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
}