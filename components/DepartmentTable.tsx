'use client';

import { useState, useEffect } from 'react';
import { archiveService } from '../api/archiveService';
import type { Department } from '../types';

export default function DepartmentTable() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [newDepartment, setNewDepartment] = useState<Department>({
        name: '',
        description: '',
        location: '',
        noofemployees: 0,
        id: 0 // or remove this line if id should not be set initially
    });

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await archiveService.getAllDepartments();
            setDepartments(data);
        } catch (error) {
            console.error('Failed to load departments:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await archiveService.saveDepartment(newDepartment);
            setNewDepartment({
                name: '',
                description: '',
                location: '',
                noofemployees: 0
            });
            loadDepartments();
        } catch (error) {
            console.error('Failed to save department:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await archiveService.deleteDepartment(id);
            loadDepartments();
        } catch (error) {
            console.error('Failed to delete department:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDepartment.description}
                        onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newDepartment.location}
                        onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="No of Employees"
                        value={newDepartment.noofemployees}
                        onChange={(e) => setNewDepartment({ ...newDepartment, noofemployees: Number(e.target.value) })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Department
                </button>
            </form>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No of Employees
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {departments.map((department) => (
                            <tr key={department.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{department.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{department.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{department.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{department.noofemployees}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => department.id && handleDelete(department.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}