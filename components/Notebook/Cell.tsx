"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Button } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import Output from "@/components/Notebook/Output";

interface CellProps {
  id: string;
  code?: string;
  newCell?: boolean;
  onExecute: (id: string, code: string) => void;
  onDelete: (id: string) => void;
  inputRef?: any; // FIXME: Add the correct type
  executionResult?: string;
}

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const Cell = ({
  id,
  code = "",
  newCell = false,  // TODO: Drop?
  onExecute,
  onDelete,
  inputRef,
  executionResult,
}: CellProps) => {
  const [cellCode, setCellCode] = useState(code);

  useEffect(() => {
    setCellCode(code);
  }, [code]);

  const handleExecute = () => {
    onExecute(id, cellCode);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setCellCode(newCode);
  };

  return (
    <div className="my-4" ref={inputRef}>
      <div>
        <CodeEditor
          value={cellCode}
          language="python"
          onChange={handleCodeChange}
          padding={10}
          style={{
            fontSize: 14,
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            borderRadius: 4,
            border: "2px solid #ddd",
          }}
        />
      </div>
      <div className="flex mt-2">
      <Button color="light" size="xs" onClick={handleExecute}>
        <FaPlay size={12} className="text-slate-800" />
      </Button>
      <Button
        color="light"
        size="xs"
        onClick={handleDelete}
        className="ml-2"
      >
        <FaTrash size={12} className="text-slate-800" />
      </Button></div>
      {executionResult ? <Output content={executionResult} /> : null}
    </div>
  );
};

export default Cell;
