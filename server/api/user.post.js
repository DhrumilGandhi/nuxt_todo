import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
const saltRounds = 10;

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(body.password, salt);
    await prisma.User.create({
        data: {
            email: body.email,
            password: passwordHash,
            salt: salt
        }
    })
    return {
        data: 'success'
    }
});