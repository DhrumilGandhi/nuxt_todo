import prisma from "~/lib/prisma";

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    await prisma.User.create({
        data: {
            email: body.email,
            password: body.password
        }
    })
    return {
        data: 'success'
    }
});