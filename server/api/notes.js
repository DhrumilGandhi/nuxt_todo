import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const note = await prisma.Note.findMany();
        return note;
    } catch (error) {
        console.log(error)
    }
});