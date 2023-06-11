import Navbar from "@/components/Navbar";
import Notebook from "@/components/Notebook/Notebook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start">
      <Navbar />
      <Notebook />
      <Footer />
    </main>
  );
}
