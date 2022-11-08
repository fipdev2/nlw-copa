import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()
        return { count }
    })
    fastify.post('/pools/:poolId/games/:gameId/guesses', {
        onRequest: [authenticate],
    },
        async (req, res) => {
            const createGuessParams = z.object({
                poolId: z.string(),
                gameId: z.string()
            })

            const createGuessBody = z.object({
                firstTeamScore: z.number(),
                secondTeamScore: z.number(),
            })

            const { poolId, gameId } = createGuessParams.parse(req.params);
            const { firstTeamScore, secondTeamScore } = createGuessBody.parse(req.body);

            const participant = await prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        userId: req.user.sub,
                        poolId
                    }
                }
            })


            if (!participant) {
                return res.status(400).send({
                    message: 'Você não tem permissão para criar um palpite neste bolão'
                })
            }

            const guess = await prisma.guess.findUnique({
                where: {
                    participantId_gameId: {
                        gameId,
                        participantId: participant.id
                    }
                }
            })
            if (guess) {
                return res.status(400).send({
                    message: 'Você já fez um palpite!'
                })
            }

            const game = await prisma.game.findUnique({
                where: {
                    id: gameId
                }
            })
            if (!game) {
                return res.status(404).send({
                    message: 'Jogo não encontrado'
                })
            }

            if (game.date < new Date()) {
                return res.status(400).send({
                    message: 'Você não pode dar palpites depois do jogo!'
                })
            }

            await prisma.guess.create({
                data:{
                    gameId,
                    participantId:participant.id,
                    firstTeamScore,
                    secondTeamScore,
                }
            })

            return res.status(201).send({message:'Palpite enviado'})
        })

}
