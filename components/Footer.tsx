import { SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { SiVercel } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiSupabase } from "react-icons/si";
import { SiFastapi } from "react-icons/si";

export default function Footer() {
  return (
    <div className="absolute bottom-0">
      <div className="flex w-screen flex-col items-center bg-gray-100 py-[1.5rem] text-slate-400">
        <p className="w-11/12 text-center">
          Built with love by{" "}
          <a
            href="https://www.linkedin.com/in/sanchezfdezjavier/"
            className="text-link text-blue-400 underline"
          >
            Javi Sanchez
          </a>{" "}
          for my future fellow colleagues of Stack AI 😉 © 2023
        </p>
        <div className="mt-[1rem] flex w-11/12 flex-row justify-center">
          <span className="m-2 inline-block hover:text-blue-600">
            <SiTypescript size={20} />
          </span>
          <span className="m-2 inline-block">
            <SiTailwindcss size={25} className="hover:text-blue-400" />
          </span>
          <span className="m-2 inline-block">
            <TbBrandNextjs size={25} className="hover:text-black" />
          </span>
          <span className="m-2 inline-block hover:text-black">
            <SiVercel size={20} />
          </span>
          <span className="m-2 inline-block hover:text-emerald-400">
            <SiSupabase size={20} />
          </span>
          <span className="m-2 inline-block hover:text-emerald-700">
            <SiFastapi size={20} />
          </span>
        </div>
      </div>
    </div>
  );
}
