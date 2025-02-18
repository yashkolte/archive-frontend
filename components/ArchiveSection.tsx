'use client';

import { useState } from 'react';
import { archiveService } from '../api/archiveService';

interface ArchiveSectionProps {
  type: 'employees' | 'departments';
}

export default function ArchiveSection({ type }: ArchiveSectionProps) {
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [archiveContent, setArchiveContent] = useState('');

  const handleCreateArchive = async () => {
    try {
      const result = type === 'employees'
        ? await archiveService.createEmployeeArchive(fileName)
        : await archiveService.createDepartmentArchive(fileName);
      setArchiveContent(result);
    } catch (error) {
      console.error('Failed to create archive:', error);
    }
  };

  const handleReadArchive = async () => {
    try {
      const result = type === 'employees'
        ? await archiveService.readEmployeeArchive(filePath)
        : await archiveService.readDepartmentArchive(filePath);
      setArchiveContent(result);
    } catch (error) {
      console.error('Failed to read archive:', error);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Archive Operations</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Create Archive</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Archive file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateArchive}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Read Archive</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Archive file path"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleReadArchive}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Read
            </button>
          </div>
        </div>

        {archiveContent && (
          <div>
            <h3 className="text-lg font-medium mb-2">Archive Content</h3>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
              {archiveContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}