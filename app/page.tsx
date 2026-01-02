import NotesInput from "@/components/NotesInput";

export default function Home() {
  return (
    <div className="p-5 container mx-auto">
      <h1 className="text-2xl font-bold">Notes App</h1>
      <NotesInput />
    </div>
  );
}
