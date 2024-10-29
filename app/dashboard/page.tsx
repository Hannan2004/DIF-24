'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, FolderPlus, ArrowUpCircle } from 'lucide-react';

interface FileType {
  _id: string;
  name: string;
  cid: string;
}

interface GroupType {
  id: number;
  name: string;
  files: FileType[];
}

const Test = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);
  const [groups, setGroups] = useState<GroupType[]>([
    { id: 1, name: 'Personal Documents', files: [] },
    { id: 2, name: 'Work Files', files: [] },
  ]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [error, setError] = useState('');
  
  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error(error);
      setError('Trouble fetching files');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    if (!selectedGroup) {
      setError('Please select a group first');
      return;
    }
    uploadFile(file);
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      
      const request = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      
      const response = await request.json();
      
      // Add file to selected group
      const newFile = {
        _id: response._id,
        name: fileToUpload.name,
        cid: response.IpfsHash
      };

      setGroups(groups.map(group => {
        if (group.id === selectedGroup) {
          return {
            ...group,
            files: [...group.files, newFile]
          };
        }
        return group;
      }));

      setCid(response.IpfsHash);
      setFile(null);
      if (inputFile.current) {
        inputFile.current.value = '';
      }
      
      await fetchFiles();
    } catch (e) {
      console.error(e);
      setError('Trouble uploading file');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGroups(groups.map(group => ({
          ...group,
          files: group.files.filter(file => file._id !== fileId)
        })));
        setUploadedFiles(uploadedFiles.filter(file => file._id !== fileId));
      } else {
        setError('Failed to delete file');
      }
    } catch (error) {
      console.error(error);
      setError('Trouble deleting file');
    }
  };

  const createNewGroup = () => {
    if (!newGroupName.trim()) {
      setError('Please enter a group name');
      return;
    }
    
    const newGroup: GroupType = {
      id: Date.now(),
      name: newGroupName,
      files: []
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setShowCreateGroup(false);
  };

  const removeFileFromGroup = (groupId: number, fileId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          files: group.files.filter(file => file._id !== fileId)
        };
      }
      return group;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-6 rounded-lg">
        <h1 className="text-2xl font-bold">Digital Identity Vault Dashboard</h1>
      </header>

      <main className="container mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">File Groups</h2>
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              <FolderPlus size={20} />
              Create Group
            </button>
          </div>

          {showCreateGroup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="w-full p-2 border rounded-md mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createNewGroup}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div
                key={group.id}
                className={`bg-white p-4 shadow-md rounded-lg cursor-pointer transition duration-300 ${
                  selectedGroup === group.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <h3 className="font-semibold mb-2">{group.name}</h3>
                <p className="text-sm text-gray-600">{group.files.length} files</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">File Management</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <input
              type="file"
              onChange={handleFileChange}
              ref={inputFile}
              className="mb-4"
            />
            <button
              onClick={handleFileUpload}
              disabled={uploading || !selectedGroup}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mt-2 disabled:bg-gray-400"
            >
              <ArrowUpCircle size={20} />
              {uploading ? 'Uploading...' : 'Upload to Selected Group'}
            </button>
            {cid && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                File uploaded successfully. CID: {cid}
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">All Uploaded Files</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {uploadedFiles.length > 0 ? (
              <ul className="space-y-2">
                {uploadedFiles.map((file) => (
                  <li key={file._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <Link 
                      href={`https://gateway.pinata.cloud/ipfs/${file.cid}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {file.name}
                    </Link>
                    <button
                      onClick={() => removeFile(file._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Group Files</h2>
          {groups.map(group => (
            <div key={group.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
              <h3 className="font-semibold mb-4">{group.name}</h3>
              {group.files.length > 0 ? (
                <div className="space-y-2">
                  {group.files.map(file => (
                    <div
                      key={file._id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <Link 
                        href={`https://gateway.pinata.cloud/ipfs/${file.cid}`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        {file.name}
                      </Link>
                      <button
                        onClick={() => removeFileFromGroup(group.id, file._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No files in this group</p>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Test;