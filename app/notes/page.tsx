import { type INOTES } from "@/lib/types";
import NotesBody from "./_components/NotesBody";


async function getNotes() {
    try {
        const response = await fetch("http://localhost:3000/api/notes");
        const data = await response.json();
        if (!response.ok) {
            alert(data.msg || "something went wrong");
            return;
        }

        return data;

    } catch (error) {
        alert(error || "something went wrong");
        return;
    }
}

export default async function Notes() {

    const data: INOTES = await getNotes();

    return (
        <div>
            <NotesBody value={data.Notes} />
        </div>
    )
}