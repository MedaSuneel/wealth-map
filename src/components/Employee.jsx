import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase"; // Adjust the path as necessary
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee",
    organization: "",
    joiningDate: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const usersRef = collection(db, "Users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDocs(usersRef);
        const currentUser = snapshot.docs.find((doc) => doc.id === user.uid);
        const role = currentUser?.data()?.role || "Employee";
        setCurrentUserRole(role);
        fetchEmployees();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchEmployees = async () => {
    const snapshot = await getDocs(usersRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmployees(data);
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    try {
      await addDoc(usersRef, newEmployee);

      setNewEmployee({
        name: "",
        email: "",
        phone: "",
        role: "Employee",
        organization: "",
        joiningDate: "",
        status: "Active",
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Users", id));
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setNewEmployee(emp);
    setEditId(emp.id);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "Users", editId), newEmployee);
    setEditId(null);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      role: "Employee",
      organization: "",
      joiningDate: "",
      status: "Active",
    });
    fetchEmployees();
  };

  return (
    <div className="p-6 bg-[#005A76] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-white ">Employee Management</h2>

      {currentUserRole === "Admin" && (
        <div className="mb-6 bg-white p-4 rounded-4xl shadow">
          <h3 className="text-xl font-semibold mb-2">
            {editId ? "Edit Employee" : "Add New Employee"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="phone"
              value={newEmployee.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded"
            />
            <select
              name="role"
              value={newEmployee.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              name="organization"
              value={newEmployee.organization}
              onChange={handleChange}
              placeholder="Organization"
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="joiningDate"
              value={newEmployee.joiningDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="status"
              value={newEmployee.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-4">
            {editId ? (
              <button
                onClick={handleUpdate}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-2xl font-lg cursor-pointer "
              >
                Update Employee
              </button>
            ) : (
              <button
                onClick={handleAddEmployee}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-2xl font-lg cursor-pointer"
              >
                Add Employee
              </button>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-500 text-md text-center rounded-4xl">
          <thead>
            <tr className="bg-black text-white " >
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2 ">Email</th>
              <th className="px-4 py-2 ">Phone</th>
              <th className="px-4 py-2 ">Role</th>
              <th className="px-4 py-2 ">Organization</th>
              <th className="px-4 py-2 ">Joining Date</th>
              <th className="px-4 py-2 ">Status</th>
              {currentUserRole === "Admin" && (
                <th className="px-4 py-2 ">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="text-md font-semibold">
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className=" px-4 py-2">{emp.name}</td>
                <td className=" px-4 py-2">{emp.email}</td>
                <td className=" px-4 py-2">{emp.phone}</td>
                <td className=" px-4 py-2">{emp.role}</td>
                <td className=" px-4 py-2">{emp.organization}</td>
                <td className=" px-4 py-2">{emp.joiningDate}</td>
                <td className=" px-4 py-2">{emp.status}</td>
                {currentUserRole === "Admin" && (
                  <td className=" px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-white text-white px-2 py-1 rounded cursor-pointer hover:scale-130"
                    >
                      <img src="/edit-icon.png" alt="Edit" className=" w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-white  text-white px-2 py-1 rounded cursor-pointer hover:scale-130"
                    >
                      <img src="/delete_icon.jpg" alt="Edit" className=" w-6   h-6" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
