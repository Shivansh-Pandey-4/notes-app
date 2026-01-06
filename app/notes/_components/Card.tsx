"use client"

import { ICardProps } from "@/lib/types";

export default function Card(props: ICardProps) {
    const {
        deleteBtn,
        deleteBtnId,
        editState,
        setEditState,
        startEdit,
        handleUpdate,
        cancelEdit,
    } = props;

    return (
        <>
            {editState.id === props.note.id ? (
                <div className="flex flex-col w-full">
                    <input
                        autoFocus
                        required
                        className="border border-gray-500 rounded-md p-2 my-3 focus:outline-none text-gray-700 focus:ring-1 ring-blue-500"
                        type="text"
                        placeholder="Enter Title"
                        value={editState.title}
                        onChange={(e) =>
                            setEditState((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />

                    <textarea
                        required
                        placeholder="Enter Content ..."
                        className="border border-gray-500 rounded-md mt-3 focus:outline-none text-gray-700 p-3 focus:ring-1 ring-blue-500"
                        rows={5}
                        value={editState.content}
                        onChange={(e) =>
                            setEditState((prev) => ({ ...prev, content: e.target.value }))
                        }
                    ></textarea>
                    <div>
                        <button
                            disabled={editState.updating}
                            onClick={() => handleUpdate(props.note.id)}
                            className="border border-white bg-blue-500 cursor-pointer px-3 py-1 rounded-md hover:bg-blue-600 mt-5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editState.updating ? "Saving" : "Save"}
                        </button>

                        <button
                            onClick={cancelEdit}
                            disabled={editState.updating}
                            className="ml-5 border bg-red-500 cursor-pointer px-2 py-1 rounded-md hover:bg-red-600 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <section>
                        <h1 className="text-xl font-semibold mt-2">Title - {props.note.title}</h1>
                        <p className="mt-1 text-lg">Content - {props.note.content}</p>
                        <div className="flex gap-5 mt-4">
                            <p className="text-gray-600">
                                CreatedAt - {props.note.createdAt?.toString().split("T")[0]}
                            </p>
                            <p className="text-gray-600">
                                UpdatedAt - {props.note.updatedAt?.toString().split("T")[0]}
                            </p>
                        </div>
                    </section>
                    <section>
                        <div className="flex gap-3">
                            <button
                                onClick={() => startEdit(props.note)}
                                className="border px-3 py-1 cursor-pointer hover:bg-green-400 rounded-md bg-green-300"
                            >
                                Edit
                            </button>

                            <button
                                disabled={deleteBtnId === props.note.id ? true : false}
                                onClick={() => deleteBtn(props.note.id)}
                                className="border px-3 py-1 cursor-pointer hover:bg-red-600 bg-red-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deleteBtnId === props.note.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
