import prisma from "@/lib/db";
import { Prisma } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, {params}: {params: Promise<{id : string}>}){

    const {id} = await params;
    const body = await req.json();
    const {title, content} = body;

    if(!id){
         return NextResponse.json(
            {
                success : false,
                msg : "id not provided"
            }, {status : 400}
         )
    }

    if(!title && !content){
          return NextResponse.json(
            {
                 success : false,
                 msg : "Both fields are missing. At least one field(title or content) is required"
            }, {status : 400}
          )
    }

    try {
         const NoteExist = await prisma.notes.findUnique({
             where : {id : parseInt(id)}
         }) 

         if(!NoteExist){
             return NextResponse.json(
                 {
                     success : false,
                     msg : "invalid id provided"
                 }, {status : 404}
             )
         }

         const updateNote: {title ?: string; content ?: string} = {}

         if(title !== undefined){updateNote.title = title}
         if(content !== undefined){updateNote.content = content}

         const updatedNote = await prisma.notes.update({
               where : {id : parseInt(id)},
               data : updateNote
         })

         return NextResponse.json(
            {
                success : true,
                msg : "note updated successfully",
                updatedNote
            }, {status : 200}
         )

    } catch (error) {
        return NextResponse.json(
            {
                success : false,
                msg : "internal server issue",
                error
            }, {status : 500}
        )
    }
}


export async function DELETE(req: NextRequest, {params} : {params: Promise<{id : string}>}){

    const {id} = await params;
    if(!id){
         return NextResponse.json(
             {
                success : false,
                 msg : "id not provided"
             }, {status : 400}
         )
    }

    try {
         const deletedNote = await prisma.notes.delete({
             where : {id : parseInt(id)}
         })

         return NextResponse.json(
             {
                 success : true,
                 msg : "note deleted successfully",
                 deletedNote
             }, {status : 200}
         )

    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
              return NextResponse.json(
                {
                     success : false,
                     msg : "invalid id provided"
                },{status : 404}
              )
        }

        return NextResponse.json(
             {
                 success : false,
                 msg : "internal server issue", 
                 error
             }, {status : 500}
        )
    }
}