'use client';

import { useState, useEffect } from 'react';
import { archiveService } from '../api/archiveService';
import type { Employee } from '../types';
import { Card } from '@/components/Layout/Card';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: '',
    designation: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await archiveService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await archiveService.saveEmployee(newEmployee);
      setNewEmployee({ name: '', designation: '', email: '', phone: '', address: '' });
      loadEmployees();
    } catch (error) {
      console.error('Failed to save employee:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await archiveService.deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Add New Employee">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['name', 'designation', 'email', 'address', 'phone'].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-900 capitalize">{field}</label>
                <input
                  type="text"
                  value={newEmployee[field as keyof Employee]}
                  onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 placeholder-black text-black"
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Employee
          </button>
        </form>
      </Card>

      <Card title="Employee List">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Designation', 'Email', 'Address', 'Phone', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  {['name', 'designation', 'email', 'address', 'phone'].map((field) => (
                    <td key={field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee[field as keyof Employee]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => employee.id && handleDelete(employee.id)}
                      className="inline-flex items-center text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
