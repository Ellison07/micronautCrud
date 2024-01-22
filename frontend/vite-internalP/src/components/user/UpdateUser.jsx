import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from '@mui/material';

export default function UpdateUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    employeeName: '',
    employeeId: '',
    employeeEmail: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employee/find/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = () => {
    fetch('http://localhost:8080/employee/saveEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., redirect to the user details page
          console.log('User updated successfully');
        } else {
          // Handle error
          console.error('Error updating user:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update User
        </Typography>

        {/* User Details Form */}
        <form>
          <TextField
            label="Employee Name"
            type="text"
            value={userData.employeeName}
            onChange={(e) => setUserData({ ...userData, employeeName: e.target.value })}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Employee ID"
            type="text"
            value={userData.employeeId}
            onChange={(e) => setUserData({ ...userData, employeeId: e.target.value })}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Employee Email"
            type="email"
            value={userData.employeeEmail}
            onChange={(e) => setUserData({ ...userData, employeeEmail: e.target.value })}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* Add additional form fields for other attributes as needed */}
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update User
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
