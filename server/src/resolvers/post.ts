import { Max, Min } from "class-validator"
import {
    Args,
    Arg,
    Resolver,
    ID,
    Field,
    ObjectType,
    Query,
    ArgsType,
    Mutation,
    Ctx,
} from "type-graphql";
import { Context } from "./resolver.types"

@ArgsType()
class newThoughtData {

    @Field()
    @Min(1)
    @Max(200)
    text!: string

    @Field()
    id!: number

    @Field()
    idPost: number

    @Field()
    @Min(1)
    @Max(200)
    updateText!: string
}

@ObjectType()
class Thought {
    @Field(() => ID)
    id: number

    @Field()
    ownerId?: number

    @Field()
    text: string
}

@Resolver(Thought)
export class ThoughtResolver {

    @Mutation(() => Boolean, { nullable: true })
    async UpdateThought(@Args() { idPost, text, id }: newThoughtData,
        @Ctx() { prisma }: Context):
        Promise<Boolean | null> {
        try {
            await prisma.user.update({
                where: {
                    id
                },
                data: {
                    thoughts: {
                        update: {
                            where: {
                                id: idPost
                            },
                            data: {
                                text: text
                            }
                        }

                    }
                }
            },
            })
        return true
    } catch(error) {
        console.error(error)
        return null
    }
}

@Query(() => [Thought], { nullable: true })
async queryManyThoughts(@Ctx() { prisma }: Context):
Promise < Thought[] | null > {
    try {
        const thought = await prisma.thought.findMany({
            take: 10
        })
            return thought
    } catch(error) {
        console.error(error)
        return null
    }
}

@Query(() => Thought, { nullable: true })
async queryThought(@Arg("id") id: number,
        @Ctx() { prisma }: Context):
Promise < Thought | null > {
    try {
        const thought = await prisma.thought.findUnique({
            where: {
                id
            }
        })
            return thought
    } catch(error) {
        console.error(error)
        return null
    }
}

@Mutation(() => Boolean, { nullable: true })
async addThought(@Args() { text, id }: newThoughtData,
        @Ctx() { prisma }: Context):
Promise < Boolean | null > {
    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                thoughts: {
                    create: {
                        text
                    }
                }
            },
        })
            return true
    } catch(error) {
        console.error(error)
        return null
    }
}

@Query(() => Boolean)
async deleteThought(@Arg('id') id: number,
        @Ctx() { prisma }: Context)
        : Promise < Boolean | null > {
    try {
        await prisma.user.delete({
            where: {
                id,
            }
        })
            return true
    } catch(error) {
        console.error(error)
        return null
    }
}
}
