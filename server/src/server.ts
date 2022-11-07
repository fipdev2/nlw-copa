import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { poolRoutes } from "./routes/pool";
import { gameRoutes } from "./routes/game";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";


async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(poolRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(authRoutes)
  
    await fastify.listen({ port: 3333 })
}
bootstrap()