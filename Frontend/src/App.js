import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import StudentList from './StudentList';
import StudentFormPage from './StudentFormPage'; // Import StudentFormPage component
import ParentComponent from './ParentComponent';
// import RemoveStudentPage from './RemoveStudentPage'; 
const URL = process.env.REACT_APP_SERVER_URL;
function App() {
  const [name, setName] = useState('');
  const [rollnumber, setRollnumber] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    Axios.get(`${URL}/read`)
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student list:', error);
      });
  }, []);

  const addToList = () => {
    Axios.post(`${URL}/insert`, { name: name, rollnumber: rollnumber })
      .then((response) => {
        console.log('Student added successfully');
        // Update the student list with the new student
        setStudentList((prevList) => [...prevList, response.data]);
        // Reset the form inputs
        setName('');
        setRollnumber(0);
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  const handleAttendanceChange = (studentId, attendance) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: attendance,
    }));
  };

  // const handleUpdateAttendance = () => {
  //   const attendanceArray = Object.entries(attendanceData).map(([studentId, attendance]) => ({
  //     studentId,
  //     attendance,
  //   }));

  //   Axios.post(`${URL}/attendance`, { attendanceData: attendanceArray })
  //     .then(() => {
  //       console.log('Attendance recorded successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error recording attendance:', error);
  //     });
  // };
  




  return (

      <div className="App">
        <nav className="MenuBar">
          {/* Menu bar with links to StudentFormPage and RemoveStudentPage */}
          <Link to="/form">ADD VOLUNTEER</Link>
        <Link to="/remove">REMOVE VOLUNTEER</Link>
        <Link to="/data">DOWNLOAD ATTENDANCE</Link>
        </nav>

      <StudentList
          studentList={studentList}
          attendanceData={attendanceData}
          handleAttendanceChange={handleAttendanceChange}
        />
      {/* <ParentComponent studentlist={studentList} /> */}
      <div className="ButtonContainer">
        {/* <button className="UpdateButton" onClick={handleUpdateAttendance}>
          Update
        </button> */}
        
      </div>
      </div>
  );
}

export default App;
