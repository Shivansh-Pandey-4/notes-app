"use client"

import { ICard, INOTES } from "@/lib/types";
import Link from "next/link";
import Card from "./Card";
import { useEffect, useState } from "react";

export default function NotesBody({ value }: { value: ICard[] }) {

    const [state, setState] = useState<ICard[]>([]);
    const [deleteBtnId, setDeleteBtnId] = useState<string | number | null>(null);

    async function deleteBtn(id: string | number) {
        setDeleteBtnId(id);
        try {

            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: "DELETE"
            })
            const data = await response.json();
            if (!response.ok) {
                alert(data.msg || "failed to delete");
                return;
            }

            alert(data.msg);
            setState(prev => prev.filter(note => note.id !== id));

            return;

        } catch (error) {
            alert(error || "something went wrong");
            return;
        }
        finally {
            setDeleteBtnId(null);
        }
    }

    useEffect(() => {
        setState([...value]);
    }, [value]);


    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl">Notes ({state.length})</h1>
            <div className="border border-gray-200  shadow-md p-5 mt-5 rounded-lg">

                {
                    state.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">No Notes present.</h1>
                            <Link href="/">
                                <button className="border bg-blue-500 text-lg font-bold px-3 py-2 rounded-md hover:bg-blue-600 mt-5 text-white cursor-pointer">
                                    Create Note
                                </button>
                            </Link>
                        </div>
                    ) : (
                        state.map(note => (
                            <div
                                key={note.id}
                                className="border border-gray-200 bg-gray-200 shadow-md p-5 my-5 rounded-lg flex justify-between items-center"
                            >
                                <Card note={note} deleteBtn={deleteBtn} deleteBtnId={deleteBtnId} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}