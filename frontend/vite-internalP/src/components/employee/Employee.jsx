import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Employee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/employee/getAll')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const deleteUser = (id) => {
    // Implement the delete logic here
    if (window.confirm('Are you sure you want to delete this employee?')) {
      fetch(`http://localhost:8080/employee/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Filter out the deleted employee from the state
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
          } else {
            console.error('Error deleting employee:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  const viewUser = (id) => {
    navigate(`/user/${id}`);
  };

  const updateUser = (id) => {
    navigate(`/updateUser/${id}`)
  };

  const addUser = (id) => {
    // Implement your add logic here if needed
  };

  return (
    <div className="container">
      <div className="py-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.N</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.employeeName}</TableCell>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.employeeEmail}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => viewUser(employee.employeeId)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateUser(employee.employeeId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteUser(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
