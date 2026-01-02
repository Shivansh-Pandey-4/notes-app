import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv"

dotenv.config();

if(!process.env.DATABASE_URL){
    throw new Error("database environment variable not found");
}

const adapter = new PrismaPg({
     connectionString : process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

export default prisma;