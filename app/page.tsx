'use client';

import { useState, useEffect } from 'react';
import { archiveService } from '../api/archiveService';
import EmployeeTable from '../components/EmployeeTable';
import DepartmentTable from '../components/DepartmentTable';
import ArchiveSection from '../components/ArchiveSection';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'employees' | 'departments'>('employees');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Archive Management System</h1>
          
          <div className="mb-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`${
                    activeTab === 'employees'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                >
                  Employees
                </button>
                <button
                  onClick={() => setActiveTab('departments')}
                  className={`${
                    activeTab === 'departments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Departments
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'employees' ? <EmployeeTable /> : <DepartmentTable />}
          
          <div className="mt-8">
            <ArchiveSection type={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}