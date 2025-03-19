import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Box } from '@mui/material';

const StudentsTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentsData = [
    {
      id: 1,
      accountNumber: 'ACC001',
      feesBalance: 150.75,
      name: 'John Doe',
      semesters: [
        {
          year: 2023,
          semester: '1',
          partNumber: '1',
          transactionDetails: [
            { service: 'Tuition', price: 100.00, date: '2023-09-01' },
            { service: 'Library Usage', price: 20.00, date: '2023-09-02' },
          ],
          paymentDetails: [
            { amount: 100.00, date: '2023-08-25' },
            { amount: 30.00, date: '2023-09-01' }
          ]
        },
        {
          year: 2024,
          semester: '2',
          partNumber: '2',
          transactionDetails: [
            { service: 'Tuition', price: 110.00, date: '2024-01-10' },
            { service: 'Medical Fee', price: 30.00, date: '2024-01-15' },
          ],
          paymentDetails: [
            { amount: 130.00, date: '2024-01-01' },
          ]
        }
      ]
    },
    {
      id: 2,
      accountNumber: 'ACC002',
      feesBalance: 200.50,
      name: 'Jane Smith',
      semesters: [
        {
          year: 2023,
          semester: '1',
          partNumber: '1',
          transactionDetails: [
            { service: 'Tuition', price: 120.00, date: '2023-03-04' },
            { service: 'Library Usage', price: 15.00, date: '2023-03-05' }
          ],
          paymentDetails: [
            { amount: 150.00, date: '2023-02-20' }
          ]
        },
        {
          year: 2024,
          semester: '2',
          partNumber: '2',
          transactionDetails: [
            { service: 'Tuition', price: 125.00, date: '2024-09-01' },
            { service: 'Sports Fee', price: 50.00, date: '2024-09-02' },
          ],
          paymentDetails: [
            { amount: 175.00, date: '2024-08-25' },
          ]
        }
      ]
    },
    {
      id: 3,
      accountNumber: 'ACC003',
      feesBalance: 320.00,
      name: 'Alice Johnson',
      semesters: [
        {
          year: 2023,
          semester: '1',
          partNumber: '1',
          transactionDetails: [
            { service: 'Tuition', price: 200.00, date: '2023-03-06' },
            { service: 'Library Usage', price: 25.00, date: '2023-03-07' },
          ],
          paymentDetails: [
            { amount: 700.00, date: '2023-02-28' },
          ]
        },
        {
          year: 2024,
          semester: '2',
          partNumber: '2',
          transactionDetails: [
            { service: 'Tuition', price: 220.00, date: '2024-09-06' },
            { service: 'Lab Usage', price: 30.00, date: '2024-09-07' },
          ],
          paymentDetails: [
            { amount: 800.00, date: '2024-08-30' },
          ]
        }
      ]
    }
  ];

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell align="center"><Typography variant="h6">Student Name</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Account Number</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Actions</Typography></TableCell>
            </TableRow>
            {studentsData.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.accountNumber}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(student)} className='text-white'>
                    View Transactions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: '20px', backgroundColor: '#fdfdfd', margin: '50px auto', maxWidth: '600px', borderRadius: '8px', boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Transaction Details for {selectedStudent?.name || ''}
          </Typography>

          {selectedStudent?.semesters.map((semester, semesterIndex) => {
            let previousBalance = semesterIndex === 0 ? selectedStudent.feesBalance : 0;

            return (
              <div key={semesterIndex}>
                <Typography variant="subtitle1" gutterBottom>
                  Year: {semester.year} | Semester: {semester.semester} | Part Number: {semester.partNumber}
                </Typography>
                
                <Table>
                  <TableHead>
                    
                  </TableHead>
                  <TableBody>
                  <TableRow>
                      <TableCell align="center"><Typography variant="subtitle1">Service</Typography></TableCell>
                      <TableCell align="center"><Typography variant="subtitle1">Debited (Services)</Typography></TableCell>
                      <TableCell align="center"><Typography variant="subtitle1">Credited (Fees Paid)</Typography></TableCell>
                      <TableCell align="center"><Typography variant="subtitle1">New Balance</Typography></TableCell>
                    </TableRow>
                    {semester.transactionDetails.map((transaction, index) => {
                      const newBalance = previousBalance - transaction.price;
                      const paymentAmount = semester.paymentDetails[index] ? semester.paymentDetails[index].amount : 0;

                      previousBalance = newBalance; // Update for next iteration

                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{transaction.service}</TableCell>
                          <TableCell align="center">${transaction.price.toFixed(2)}</TableCell>
                          <TableCell align="center">${paymentAmount.toFixed(2)}</TableCell>
                          <TableCell align="center">${newBalance.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Row for Total Fees Paid */}
                    <TableRow>
                      <TableCell align="center"><Typography variant="subtitle1">Total Fees Paid</Typography></TableCell>
                      <TableCell align="center">$0.00</TableCell>
                      <TableCell align="center">${semester.paymentDetails.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}</TableCell>
                      <TableCell align="center">${(previousBalance).toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            );
          })}
          
          <Button onClick={handleClose} variant="contained" color="secondary" sx={{ marginTop: '10px' }} className='text-white'>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StudentsTable;
