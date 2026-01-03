import { INOTES } from "@/lib/types";
import Link from "next/link";
import Card from "./Card";

export default function NotesBody({ value }: { value: INOTES }) {

    console.log(value);

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl">Notes ({value.Notes.length})</h1>
            <div className="border border-gray-200  shadow-md p-5 mt-5 rounded-lg">

                {
                    (value.Notes.length === 0) ? <div className="flex flex-col items-center"><h1 className="text-2xl font-bold">No Notes present.</h1>
                        <Link href={"/"}><button className="border bg-blue-500 text-lg font-bold cursor-pointer px-3 py-2 rounded-md hover:bg-blue-600 mt-5 text-white">Create Note</button></Link></div> : value.Notes.map((note) => <div key={note.id} className="border border-gray-200 bg-gray-200 shadow-md p-5 my-5 rounded-lg flex justify-between items-center">
                            <Card note={note} />
                        </div>)
                }
            </div>
        </div>
    )
}