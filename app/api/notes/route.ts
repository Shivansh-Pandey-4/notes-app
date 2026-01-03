import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
     try {
          const allNotes = await prisma.notes.findMany();  
          if(allNotes.length === 0){
              return NextResponse.json(
                 {
                    success : true,
                     msg : "currently notes database is empty",
                     Notes : []
                 }, {status : 200}
              )
          }

          return NextResponse.json(
            {
                success : true,
                msg : "All Notes",
                Notes : allNotes 
            }, {status : 200}
          )

     } catch (error) {
         return NextResponse.json(
             {
                success : false,
                 msg : "server issue: failed to get notes",
                 error
             }, {status : 500}
         )
     }
}


export async function POST(req: NextRequest){
     const body = await req.json();
     const {title, content} = body;

     if(!title || !content){
         return NextResponse.json(
            {
                success : false,
                msg : "title and content are required"
            }, {status : 400}
         )
     }

     try {

          const newNotes = await prisma.notes.create({
             data : {
                 title, content
             }
          })

          return NextResponse.json(
            {
                success : true,
                msg : "notes created successfully",
                newNotes
            }, {status : 200}
          )

     } catch (error) {
         return NextResponse.json(
            {
                success : false,
                 msg : "server issue: failed to create new notes",
                 error
            }, {status : 500}
         )
     }
}

