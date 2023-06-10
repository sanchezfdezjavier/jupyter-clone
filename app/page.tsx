"use client";
import { Alert } from "flowbite-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Hello Jupyter</h1>
      <Alert color="failure">Alert!</Alert>
    </main>
  );
}
