import { Max, Min } from "class-validator";
import { Context } from "./resolver.types"
import { hash } from "argon2"
import {
    Arg,
    Args,
    Resolver,
    ID,
    Field,
    ObjectType,
    Query,
    ArgsType,
    Ctx,
    Mutation,
} from "type-graphql";

@ArgsType()
class newUserData {

    @Field()
    @Min(2)
    @Max(30)
    userName!: string

    @Min(2)
    @Max(35)
    @Field()
    email!: string

    @Min(8)
    @Max(40)
    @Field()
    password: string

}

@ObjectType()
class User {
    @Field(() => ID)
    id: number

    @Field()
    email: string

    @Field()
    userName: string

    @Field()
    hashedPassword: string

}

@Resolver(User)
export class UserResolver {

    @Query(() => User, { nullable: true })
    async queryUser(@Arg("id") id: number,
        @Ctx() { prisma }: Context):
        Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            return user
        } catch (error) {
            console.error(error)
            return null
        }

    }

    @Mutation(() => Boolean)
    async addUser(@Args() { userName, email, password }:
        newUserData, @Ctx() { prisma }: Context)
        : Promise<Boolean> {
        try {
            await prisma.user.create({
                data: {
                    userName,
                    email,
                    hashedPassword: await hash(password)
                }
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id') id: number,
        @Ctx() { prisma }: Context)
        : Promise<Boolean> {
        try {
            await prisma.user.delete({
                where: {
                    id,
                }
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}
