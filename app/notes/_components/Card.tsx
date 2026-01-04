import { ICard } from "@/lib/types"

interface ICardProps {
    note: ICard;
    deleteBtn: (id: string | number) => void;
    deleteBtnId: string | number | null;
    startEdit: (note: ICard) => void;
    editBtnId: string | number | null;
    editTitle: string;
    editContent: string;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
    handleUpdate: (id: string | number) => void;
    updating: boolean;
    cancelEdit: (note: ICard) => void;
}



export default function Card(props: ICardProps) {

    const { deleteBtn, deleteBtnId, editBtnId, editContent, editTitle, note, setEditContent, setEditTitle, startEdit, handleUpdate, updating, cancelEdit } = props;

    return (
        <>
            {
                note.id === editBtnId ?
                    (
                        <div className="flex flex-col w-full">

                            <input autoFocus required className="border border-gray-500 rounded-md p-2 my-3 focus:outline-none text-gray-700 focus:ring-1 ring-blue-500" type="text" placeholder="Enter Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                            <textarea required placeholder="Enter Content ..." className="border border-gray-500 rounded-md mt-3 focus:outline-none text-gray-700 p-3 focus:ring-1 ring-blue-500" rows={5} value={editContent} onChange={(e) => setEditContent(e.target.value)} ></textarea>
                            <div>
                                <button disabled={updating} onClick={() => handleUpdate(note.id)} className="border border-white bg-blue-500 cursor-pointer px-3 py-1 rounded-md hover:bg-blue-600 mt-5 text-white disabled:opacity-50 disabled:cursor-not-allowed">{updating ? "Saving" : "Save"} </button>

                                <button onClick={() => cancelEdit(note)} disabled={updating} className="ml-5 border bg-red-500 cursor-pointer px-2 py-1 rounded-md hover:bg-red-600 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"> Cancel </button>
                            </div>
                        </div>
                    ) :
                    (
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
                                    <button onClick={() => startEdit(note)} className="border px-3 py-1 cursor-pointer hover:bg-green-400 rounded-md bg-green-300">Edit</button>

                                    <button disabled={deleteBtnId === note.id ? true : false} onClick={() => deleteBtn(note.id)} className="border px-3 py-1 cursor-pointer hover:bg-red-600 bg-red-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">{deleteBtnId === note.id ? "Deleting..." : "Delete"}</button>

                                </div>
                            </section>
                        </>
                    )
            }

        </>
    )
}