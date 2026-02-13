"use client";

import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import { fetchStudents, submitStudent, deleteStudent } from "./api/studentAPI";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // fetch all students
  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error Fetching Students: ", error);
    }
  };

  // submit student (add or update)
  const handleSubmit = async (student: Omit<Student, "_id">, id?: string) => {
    try {
      await submitStudent(student, id);
      setSelectedStudent(null);
      await loadStudents();
    } catch (error) {
      console.error("Error Submitting StudentForm.", error);
    }
  };
  // delete student by ID
  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (error) {
      console.error("Error Deleting Student", error);
    }
  };

  // initial data fetch
  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Students</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg mb-8">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Current College
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.firstName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.age}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {student.currentCollege}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg mr-2 text-sm"
                    onClick={() => setSelectedStudent(student)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg mr-2 text-sm"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StudentForm
        student={selectedStudent}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={() => setSelectedStudent(null)}
      />
    </div>
  );
};

export default StudentPage;
