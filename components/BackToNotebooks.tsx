import { Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function BackToNotebooks() {
    const router = useRouter();
    const handleBackToMain = () => {
        router.push("/");
    };
    return (
        <Button color="light" size="sm" onClick={handleBackToMain}>
            <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
            <p>Notebooks</p>
        </Button>
    )
}