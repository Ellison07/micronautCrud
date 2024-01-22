import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

export default function User() {
  const { id } = useParams();
  const location = useLocation();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employee/find/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmployeeDetails(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      // Handle the case when id is not available in location.state
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="container">
      <div className="py-4">
        {loading ? (
          <p>Loading employee details...</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{employeeDetails.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>{employeeDetails.employeeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>{employeeDetails.employeeId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee Email</TableCell>
                  <TableCell>{employeeDetails.employeeEmail}</TableCell>
                </TableRow>
                {/* Add additional attributes as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
