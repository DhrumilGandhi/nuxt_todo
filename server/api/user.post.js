import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import validator from 'validator';
import jwt from 'jsonwebtoken'; 

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
        const user = await prisma.User.create({
            data: {
                email: body.email,
                password: passwordHash,
                salt: salt
            }
        })
        var token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        setCookie(event, 'TodoJWT', token);
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