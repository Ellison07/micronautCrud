import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from '@mui/material';

export default function AddUser() {
  const [userData, setUserData] = useState({
    employeeName: '',
    employeeId: '',
    employeeEmail: '',
    // Add additional attributes as needed
  });

  const handleAddUser = () => {
    fetch('http://localhost:8080/employee/saveEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., redirect to the user list page
          console.log('User added successfully');
        } else {
          // Handle error
          console.error('Error adding user:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add User
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
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add User
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
