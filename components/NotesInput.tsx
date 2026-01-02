"use client"
import { useState } from "react"


export default function NotesInput() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        if (!title || !content) {
            alert("title or content field cannot be empty");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content })
            })

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg || "something went wrong");
                return;
            }

            setContent("");
            setTitle("");
            setLoading(false);

            alert(data.msg || "data sent successfully");
            return;

        } catch (error) {
            alert(error);
            return;
        }
    }

    return (
        <div className="container mx-auto border border-gray-100 p-5 rounded-lg bg-white mt-8 shadow-md ">

            <h1 className="text-xl text-gray-800 font-semibold mb-3">Create New Note</h1>
            <form onSubmit={handleForm} >

                <input autoFocus required className="border border-gray-500 rounded-md p-2  w-full my-3 focus:outline-none text-gray-700 focus:ring-1 ring-blue-500" type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <textarea required placeholder="Enter Content ..." className="border border-gray-500 rounded-md w-full mt-3 focus:outline-none text-gray-700 p-3 focus:ring-1 ring-blue-500" rows={5} value={content} onChange={(e) => setContent(e.target.value)} ></textarea>

                <div className="flex flex-col items-center">
                    <button disabled={loading} className="border bg-blue-500 w-full text-lg font-bold cursor-pointer px-3 py-2 rounded-md hover:bg-blue-600 mt-5 text-white disabled:opacity-50 disabled:cursor-not-allowed"> {loading ? "Submitting..." : "Create Note"} </button>
                </div>

            </form>
        </div>
    )
}