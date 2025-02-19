'use client';

import { useState, useEffect } from 'react';
import { archiveService } from '../api/archiveService';
import type { Department } from '../types';
import { Card } from '@/components/Layout/Card';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function DepartmentTable() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [newDepartment, setNewDepartment] = useState<Department>({
        name: '',
        description: '',
        location: '',
        noofemployees: ''
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
                noofemployees: ''
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
        <div className="space-y-6">
            <Card title="Add New Department">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Department Name</label>
                            <input
                                type="text"
                                value={newDepartment.name}
                                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                value={newDepartment.description}
                                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                value={newDepartment.location}
                                onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
                            <input
                                type="number"
                                value={newDepartment.noofemployees}
                                onChange={(e) => setNewDepartment({ ...newDepartment, noofemployees: e.target.value})}
                                className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Add Department
                    </button>
                </form>
            </Card>

            <Card title="Department List">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {departments.map((department) => (
                                <tr key={department.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{department.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{department.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{department.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{department.noofemployees}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => department.id && handleDelete(department.id)}
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