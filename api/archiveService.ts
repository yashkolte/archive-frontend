const BASE_URL = 'http://localhost:8080';

import type{ Employee, Department } from '../types';

export const archiveService = {
  // Employee endpoints
  async getAllEmployees() {
    const response = await fetch(`${BASE_URL}/table/allEmployees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },

  async saveEmployee(employee: Employee) {
    const response = await fetch(`${BASE_URL}/table/saveEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) throw new Error('Failed to save employee');
    return response.json();
  },

  async deleteEmployee(id: number) {
    const response = await fetch(`${BASE_URL}/table/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete employee');
    return response.json();
  },

  // Department endpoints
  async getAllDepartments() {
    const response = await fetch(`${BASE_URL}/table/allDepts`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
  },

  async saveDepartment(department: Department) {
    const response = await fetch(`${BASE_URL}/table/saveDept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error('Failed to save department');
    return response.json();
  },

  async deleteDepartment(id: number) {
    const response = await fetch(`${BASE_URL}/table/deleteDept/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete department');
    return response.json();
  },

  // Archive endpoints
  async createEmployeeArchive(fileName: string) {
    const response = await fetch(`${BASE_URL}/archive/create-employee-archive?archiveFileName=${fileName}`);
    if (!response.ok) throw new Error('Failed to create employee archive');
    return response.text();
  },

  async createDepartmentArchive(fileName: string) {
    const response = await fetch(`${BASE_URL}/archive/create-department-archive?archiveFileName=${fileName}`);
    if (!response.ok) throw new Error('Failed to create department archive');
    return response.text();
  },

  async readEmployeeArchive(filePath: string) {
    const response = await fetch(`${BASE_URL}/archive/read-employee-archive?archiveFilePath=${filePath}`);
    if (!response.ok) throw new Error('Failed to read employee archive');
    return response.text();
  },

  async readDepartmentArchive(filePath: string) {
    const response = await fetch(`${BASE_URL}/archive/read-department-archive?archiveFilePath=${filePath}`);
    if (!response.ok) throw new Error('Failed to read department archive');
    return response.text();
  },
};