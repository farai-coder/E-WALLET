import React, { useState } from 'react';
import Icon from "@mui/material/Icon";
import "assets/bootstrap/css/bootstrap.min.css";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

function RejectedApplications() {
    const [displayCount, setDisplayCount] = useState(10);

    // Dummy data for rejected applications
    const rejectedData = [
        { id: 1, visitor_name: 'John Doe', national_id: 'A123456789', number_plate: 'XYZ1234', rejection_reason: 'Incomplete documents' },
        { id: 2, visitor_name: 'Jane Smith', national_id: 'B987654321', number_plate: 'ABC5678', rejection_reason: 'Expired ID' },
        { id: 3, visitor_name: 'Alice Johnson', national_id: 'C112233445', number_plate: 'DEF6789', rejection_reason: 'Fraudulent information' },
        { id: 4, visitor_name: 'Bob Brown', national_id: 'D556677889', number_plate: 'GHI9876', rejection_reason: 'Unapproved visitor' },
        { id: 5, visitor_name: 'Charlie Lee', national_id: 'E334455667', number_plate: 'JKL1234', rejection_reason: 'Unauthorized access' },
        { id: 6, visitor_name: 'David White', national_id: 'F112233998', number_plate: 'MNO4567', rejection_reason: 'Not registered in system' },
        { id: 7, visitor_name: 'Eva Green', national_id: 'G998877665', number_plate: 'PQR8901', rejection_reason: 'Previous offenses' },
        { id: 8, visitor_name: 'Frank Black', national_id: 'H223344556', number_plate: 'STU2345', rejection_reason: 'Suspicious activity' },
        { id: 9, visitor_name: 'Grace Kim', national_id: 'I887766554', number_plate: 'VWX5678', rejection_reason: 'Invalid documents' },
        { id: 10, visitor_name: 'Hannah Blue', national_id: 'J445566778', number_plate: 'YZA8901', rejection_reason: 'Not in database' }
    ];

    const startIndex = Math.max(rejectedData.length - displayCount, 0);
    const displayedRejectedApplications = rejectedData.slice(startIndex).reverse();

    const handleViewClick = (id) => {
        alert(`Viewing details for application with ID: ${id}`);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold fs-6">Rejected Applications</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 text-nowrap">
                                <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                                    <label className="form-label">
                                        Show&nbsp;
                                        <select className="d-inline-block form-select form-select-sm"
                                            onChange={(e) => setDisplayCount(parseInt(e.target.value))}>
                                            <option value={10} selected>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>&nbsp;
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                    <label className="form-label">
                                        <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th className='fs-6'>Name</th>
                                        <th className='fs-6'>ID Number</th>
                                        <th className='fs-6'>Phone Number</th>
                                        <th className='fs-6'>Reason for Rejection</th>
                                        <th className='fs-6'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedRejectedApplications.map((application, index) => (
                                        <tr key={index}>
                                            <td className='fs-6'>{application.visitor_name}</td>
                                            <td className='fs-6'>{application.national_id}</td>
                                            <td className='fs-6'>{application.number_plate}</td>
                                            <td className='fs-6'>{application.rejection_reason}</td>
                                            <td>
                                                <span className="p-1">
                                                    <Icon fontSize="small" className="me-2 text-dark" onClick={() => handleViewClick(application.id)}>visibility</Icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong className='fs-6'>Name</strong></td>
                                        <td><strong className='fs-6'>ID Number</strong></td>
                                        <td><strong className='fs-6'>Phone Number</strong></td>
                                        <td><strong className='fs-6'>Reason for Rejection</strong></td>
                                        <td><strong className='fs-6'>Actions</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RejectedApplications;
