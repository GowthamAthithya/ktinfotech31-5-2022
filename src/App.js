import "./App.css";
import "./commonstyle.css";
import AdminLogin from "./adminLogin";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route /*Link*/ } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Announcement from "./dashboard/announcement";
import Employees from "./dashboard/employees";
import EmployeeAttendence from "./dashboard/employeeAttendence";
import Attendance from "./dashboard/attendance";
import Leave from "./dashboard/leaveRequest";
import Task from "./dashboard/task";
import { db } from "./Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [setUsers] = useState();
  const usersRef = collection(db, "Users");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(usersRef);

      setUsers(data);
    };
    fetchData();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/adminLogin" index element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/task" element={<Task />} />
          <Route path="/leaveRequest" element={<Leave />} />
          <Route path="/employeeAttendence" element={<EmployeeAttendence />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
