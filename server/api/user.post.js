import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import validator from 'validator';

const saltRounds = 10;

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
    } catch (error) {
        console.log(error.code);
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'Email already exists'
            });
        }
        throw error
    }
});