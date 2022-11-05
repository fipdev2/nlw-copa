import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Filipe',
            email: 'filipe@gmail.com',
            avatarUrl: 'https://scontent.fgig4-1.fna.fbcdn.net/v/t39.30808-6/284061808_5808046629222291_2541475820175502888_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FSMS32xOUj8AX-IxzTH&_nc_ht=scontent.fgig4-1.fna&oh=00_AfDl0qHJoCY4U4RB54UlnNocZEh97eG1Z2IrzEPIiFvmhA&oe=63698489',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Brasil X Alemanha',
            code: 'Bolao12',
            ownerId: user.id,
            createdAt: '2022-11-04T12:00:00.196Z',
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T06:16:00.196Z',
            firstTeamIsoCode: 'BR',
            secondTeamIsoCode: 'DE',

            guesses: {
                create: {
                    firstTeamScore: 3,
                    secondTeamScore: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()