import "reflect-metadata";
import { PrismaClient } from '@prisma/client'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/user"
import { ThoughtResolver } from "./resolvers/post";
import express from 'express';

const prisma = new PrismaClient()

const main = async () => {
    const app = express()
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ThoughtResolver],
            validate: false
        }),
        context: { prisma }
    })

    app.get('/', (_, res) => {
        res.send('woo')
    })
    await server.start()
    server.applyMiddleware({ app })

    app.listen(3000, () => {
        console.log('you lucky')
    })

}

main()
