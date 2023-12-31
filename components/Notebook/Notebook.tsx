"use client";
import { useEffect, useRef, useState } from "react";
import Cell from "@/components/Notebook/Cell"
import { Button, Alert } from "flowbite-react";
import { FaPlus } from "react-icons/fa";

import { base_api_endpoint } from "@/config"
import BackToNotebooks from "../BackToNotebooks";

type Props = {
  id: string;
  name: string;
};

type Cell = {
  id: string;
  source: string;
  outputs?: string;
};


const Notebook = (props: Props) => {
  const [cells, setCells] = useState<
    Array<{ id: string; code: string; result?: string }>
  >([]);
  const [output, setOutput] = useState<string>("");
  const newCellRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${base_api_endpoint}/notebook/${props.id}`); // TODO: Change the endpoint when the backend is ready
      const data = await response.json();

      
      if (response.ok) {
        const notebookCells = data.document.notebook.cells.map((cell: Cell) => ({
          id: cell.id,
          code: cell.source,
          result: cell.outputs,
        }));
        
        setCells(notebookCells);
      } else {
        console.error("Failed to fetch notebook:", data);
      }
    };

    fetchData();
  }, [props.id]);

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

  const deleteCell = async (id: string) => {
    try {
      const response = await fetch(`${base_api_endpoint}/notebook/${props.id}/cell/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setCells(cells.filter((cell) => cell.id !== id));
      } else {
        throw new Error('Failed to delete cell');
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  const executeAndUpdateCode = async (id: string, code: string) => {
    try {
      if (!id) {
        throw new Error('Cell id is undefined');
      }
      const response = await fetch(`${base_api_endpoint}/notebook/${props.id}/cell/${id}/execute_and_update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source: code }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setOutput(data.output); // assuming 'output' is a property of the response body
  
        // Also update the 'result' property of the cell with the output
        setCells(cells.map((cell) => cell.id === id ? { ...cell, result: data.output } : cell));
      } else {
        throw new Error('Failed to execute and update code');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-11/12 pt-[2rem] lg:w-6/12 pb-[10rem]">
      <Alert
      color="warning"
      withBorderAccent
      className="mb-8"
    >
      <span>
        <p>
        <span className="font-bold">
          Make sure you have a stable internet connection!
        </span>
        {" "}Right now we only rely on HTTP, we&apos;re working on implementing websockets for a better real-time experience. Happy hacking! 🚀
        </p>
      </span>
    </Alert>
    <BackToNotebooks/>
      <h1 className="text-4xl tracking-tight mb-8">{props.name}.ipynb</h1>
      {cells.map((cell, index) => (
        <Cell
          key={cell.id}
          id={cell.id}
          code={cell.code}
          newCell={cell.id === "new-cell"}
          onExecute={executeAndUpdateCode}
          onDelete={deleteCell}
          inputRef={index === cells.length - 1 ? newCellRef : null}
          executionResult={cell.result}
        />
      ))}
    <div>
      {cells.length === 0 && (
        <div className="flex items-center">
          <p className="text-slate-400">Create a new cell to start coding!</p>
        </div>
      )}
      <Button
        onClick={addCell}
        color="light"
        size="xs"
        className="mt-2 hover:text-slate-400"
      >
        <FaPlus size={15} />
      </Button>
    </div>
    </div>
  );
};

export default Notebook;
