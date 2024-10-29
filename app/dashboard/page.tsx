'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Files from '@/components/Files';

const Test = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);
  const [groups, setGroups] = useState([]); useState([
    { id: 1, name: 'Personal Documents', files: []},
    { id: 2, name: 'Work Files', files: []},
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateGroup, setshowCreateGroup] = useState(false);
  const [newGroupName, setnewGroupName] = useState('');
  const [error, setError] = useState('');

  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFile(data);
    } catch (error) {
      console.log(error);
      alert('Trouble fetching files');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      const request = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const response = await request.json();
      console.log(response);
      setCid(response.IpfsHash);
      setUploading(false);
      fetchFiles(); // Fetch files again after upload
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold">Digital Identity Vault Dashboard</h1>
      </header>

      <main className="container mx-auto">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">File Management</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <input type="file" onChange={handleFileChange} ref={inputFile} />
            <button
              onClick={handleFileUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mt-2"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
            {cid && (
              <div className="mt-4">
                <p className="text-green-600">File uploaded successfully. CID: {cid}</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {file.length > 0 ? (
              <ul>
                {file.map((file: any) => (
                  <li key={file._id} className="mb-2">
                    <Link href={`https://gateway.pinata.cloud/ipfs/${file.cid}`}>
                      <a className="text-blue-600 hover:underline" target="_blank">
                        {file.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Test;