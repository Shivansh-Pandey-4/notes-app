import { ICard } from "@/lib/types"


export default function Card({ note }: { note: ICard }) {
    return (
        <>
            <section>
                <h1 className="text-xl font-semibold mt-2">Title - {note.title}</h1>
                <p className="mt-1 text-lg">Content - {note.content}</p>
                <div className="flex gap-5 mt-4">
                    <p className="text-gray-600">CreatedAt - {note.createdAt?.toString().split("T")[0]}</p>
                    <p className="text-gray-600">UpdatedAt - {note.updatedAt?.toString().split("T")[0]}</p>
                </div>
            </section>
            <section>
                <div className="flex gap-3">
                    <button className="border px-3 py-1 cursor-pointer hover:bg-green-400 rounded-md bg-green-300">Edit</button>

                    <button className="border px-3 py-1 cursor-pointer hover:bg-red-600 bg-red-400 rounded-md">Delete</button>

                </div>
            </section>
        </>
    )
}