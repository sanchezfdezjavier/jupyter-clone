"use client";
import { useEffect, useRef, useState } from "react";
import Cell from "@/components/Notebook/Cell"
import Output from "@/components/Notebook/Output";
import { Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa";

const Notebook = () => {
  const [cells, setCells] = useState<
    Array<{ id: string; code: string; result?: string }>
  >([{ id: "new-cell", code: "", result: "" }]);
  const [output, setOutput] = useState<string>("");
  const newCellRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (newCellRef.current) {
      newCellRef.current.focus();
    }
  }, [cells]);

  const addCell = () => {
    setCells((prevCells) => [
      ...prevCells,
      { id: Date.now().toString(), code: "", result: "" },
    ]);
  };

  const deleteCell = (id: string) => {
    setCells(cells.filter((cell) => cell.id !== id));
  };

  const executeCode = async (id: string, code: string) => {
    // HTTP Call
  };

  return (
    <div className="w-11/12 pt-[6rem] lg:w-6/12">
      {cells.map((cell, index) => (
        <Cell
          key={cell.id}
          id={cell.id}
          code={cell.code}
          newCell={cell.id === "new-cell"}
          onExecute={executeCode}
          onDelete={deleteCell} // Add the deleteCell function
          inputRef={index === cells.length - 1 ? newCellRef : null}
        />
      ))}
    <div><Button
        onClick={addCell}
        color="light"
        size="xs"
        className="mt-2 hover:text-slate-400"
      >
        <FaPlus size={15} />
      </Button></div>
      <Output output={output} />
    </div>
  );
};

export default Notebook;
