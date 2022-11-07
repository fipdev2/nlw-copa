import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/users', async (req) => {
        const createUserBody = z.object({
            accessToken: z.string(),

        })
        const { accessToken } = createUserBody.parse(req.body)

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })
        const userInfo = userInfoSchema.parse(userData)
        return { userInfo }
    })
}
