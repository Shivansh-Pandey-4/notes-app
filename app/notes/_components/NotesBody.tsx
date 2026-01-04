"use client"

import { ICard } from "@/lib/types";
import Link from "next/link";
import Card from "./Card";
import { useEffect, useState } from "react";


export default function NotesBody({ value }: { value: ICard[] }) {

    const [state, setState] = useState<ICard[]>([]);
    const [editBtnId, setEditBtnId] = useState<string | number | null>(null);
    const [deleteBtnId, setDeleteBtnId] = useState<string | number | null>(null);

    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [updating, setUpdating] = useState(false);

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

    function startEdit(note: ICard) {
        setEditBtnId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    }

    function cancelEdit(note: ICard) {
        setEditBtnId(null);
        setEditTitle('');
        setEditContent('');
    }

    async function handleUpdate(id: string | number) {

        if (!editContent || !editTitle) {
            alert("plz provide title and content");
            return;
        }
        setUpdating(true);
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: editTitle, content: editContent })
            })

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg || "failed to update note")
                return;
            }

            setState(state.map(note => note.id === id ? data.updatedNote : note));

            alert(data.msg);
            return;

        } catch (error) {
            alert(error || "something went down");
            return;

        } finally {
            setEditBtnId(null);
            setEditContent('');
            setEditTitle('');
            setUpdating(false);
        }
    }


    useEffect(() => {
        setState([...value]);
    }, [value]);


    return (
        <div className="container mx-auto p-5">
            <div className="flex justify-between">
                <h1 className="text-2xl">Notes ({state.length})</h1>
                {
                    state.length !== 0 && <Link href={"/"}><h1 className="text-lg font-serif underline hover:text-green-700 cursor-pointer">Create New Notes</h1></Link>
                }
            </div>
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
                                <Card cancelEdit={cancelEdit} updating={updating} handleUpdate={handleUpdate} editTitle={editTitle} setEditTitle={setEditTitle} setEditContent={setEditContent} editContent={editContent} editBtnId={editBtnId} note={note} deleteBtn={deleteBtn} deleteBtnId={deleteBtnId} startEdit={startEdit} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}