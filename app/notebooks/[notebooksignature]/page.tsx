"use client";
import Notebook from "@/components/Notebook/Notebook";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function page() {
    const pathname = usePathname()
    const notebookName = pathname.split('/')[2].split('-')[0]
    const notebookId = pathname.split('-')[1]
    
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start">
      <Notebook id={notebookId} name={notebookName}/>
    </main>
  )
}