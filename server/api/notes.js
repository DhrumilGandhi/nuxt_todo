import prisma from "~/lib/prisma";
import jwt from 'jsonwebtoken'; 


export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event);
        const token = cookies.TodoJWT;

        if(!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Not authorized to access Notes'
            });
        }

        const decodeedToken = await jwt.verify(token, process.env.JWT_KEY);
        const note = await prisma.Note.findMany(
            {
                where : {
                    userId : decodeedToken.id
                }
            }
        );
        return note;
    } catch (error) {
        console.log(error)
    }
});