import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import validator from 'validator';
import jwt from 'jsonwebtoken'; 

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: 'Invalid Email'
            });
        }
        if (!validator.isStrongPassword(body.password, {
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 0, 
            minSymbols: 0
        })) {
            throw createError({
                statusCode: 409,
                message: 'Invalid Password'
            });
        }
        const user = await prisma.User.findUnique({
            where: {
                email: body.email
            }
        });
        if (user) {
            const isValid = await bcrypt.compare(body.password , user.password);
            if (!isValid) {
                throw createError({
                    statusCode: 400,
                    message: 'Invaid Email or Password'
                });
            }
            var token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
            setCookie(event, 'TodoJWT', token);
            return {
                data: 'success'
            }
        } else {
            throw createError({
                statusCode: 400,
                message: 'Invaid Email or Password'
            });
        }
    } catch (error) {
        throw error
    }
});