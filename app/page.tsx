import NotesInput from "@/components/NotesInput";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5 container mx-auto">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <nav>
          <ul>
            <Link href={"/notes"}>
              <li className="text-lg font-serif underline hover:text-green-700 cursor-pointer">See All Notes</li>
            </Link>
          </ul>
        </nav>
      </header>
      <NotesInput />
    </div>
  );
}
