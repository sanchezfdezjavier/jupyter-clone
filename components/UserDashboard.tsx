"use client";

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button, Modal, Label, TextInput, ListGroup } from "flowbite-react";
import Link from "next/link"; 
import { base_api_endpoint } from "@/config"

import { ImSpinner3 } from 'react-icons/im'

interface Props {
  username: string;
}

interface Document {
  filename: string;
  _id: string;
}

const UserDocuments = ({ username }: Props) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [openModal, setOpenModal] = useState<string | undefined>();
  const newFilenameRef = useRef<HTMLInputElement | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${base_api_endpoint}/notebooks/${username}`)
      const data = await response.json()

      if (response.ok) {
        setDocuments(data.user_documents)
        setError(null)
      } else {
        throw new Error(data.error || "An unknown error occurred.")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const createNewNotebook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFilename = newFilenameRef.current?.value;
    if (!newFilename) return;

    try {
      const response = await fetch(`${base_api_endpoint}/notebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename: newFilename, user: username })
      })

      if (response.ok) {
        fetchData()
      } else {
        const data = await response.json()
        throw new Error(data.error || "An unknown error occurred.")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setOpenModal(undefined)
    }
  }

  if (isLoading) {
    return <div className="pt-[6rem]"><ImSpinner3 size={30} className="animate-spin" /></div>
  }

  if (error) {
    return <div className="pt-[6rem]">An error occurred: {error}</div>
  }

  return (
    <div className="pt-[6rem] w-11/12 lg:w-6/12">
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size="sm">
        <Modal.Header>Create new notebook</Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-4" onSubmit={createNewNotebook}>
              <div>
                <div className="mb-2 block">
                </div>
                <TextInput
                  ref={newFilenameRef}
                  id="filename"
                  placeholder="Notebook name"
                  required
                  type="text"
                  sizing="sm"
                />
              </div>
              <div>
                <Button type="submit" color="success" size="xs">
                  Create new notebook
                </Button>
              </div>
            </form>
          </Modal.Body>
      </Modal>
      <div className="flex items-center justify-between mb-8"><h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-700">Your Notebooks</h1>
      <Button onClick={() => setOpenModal('default')} color="success" size="xs" className="self-align-center">Create new notebook</Button></div>
      <ListGroup className='mt-2'>
      {documents.map(doc => (
            <Link href={`/notebooks/${doc.filename}-${doc._id}`} passHref key={doc._id}>
              <ListGroup.Item key={doc._id}>
                  <span className="text-slate-600 text-xl" key={doc._id}>{doc.filename}.ipynb</span>
              </ListGroup.Item>
            </Link>
      ))}
      </ListGroup>
    </div>
  )
}

export default UserDocuments