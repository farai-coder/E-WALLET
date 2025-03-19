import React, { useState, useEffect } from 'react';
import Icon from "@mui/material/Icon";
import "assets/bootstrap/css/bootstrap.min.css";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

function NewApplications() {
    const [displayCount, setDisplayCount] = useState(10);
    const [dummyApplications, setDummyApplications] = useState([]);

    // Generate dummy data
    useEffect(() => {
        const dummyData = Array.from({ length: 100 }, (_, i) => ({
            application_name: `Applicant ${i + 1}`,
            id_number: `ID-${1000 + i}`,
            phone_number: `+26377${Math.floor(Math.random() * 100000)}`,
            application_type: i % 2 === 0 ? "Business Permit" : "Residence Permit",
        }));
        setDummyApplications(dummyData);
    }, []);

    // Determine displayed applications
    const startIndex = Math.max(dummyApplications.length - displayCount, 0);
    const displayedApplications = dummyApplications.slice(startIndex).reverse();

    const handleViewClick = (id) => {
        console.log(`Viewing application with ID: ${id}`);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold fs-6">New Applications</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 text-nowrap">
                                <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                                    <label className="form-label">
                                        Show&nbsp;
                                        <select
                                            className="d-inline-block form-select form-select-sm"
                                            onChange={(e) => setDisplayCount(parseInt(e.target.value))}
                                        >
                                            <option value={10} selected>
                                                10
                                            </option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                        &nbsp;
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                    <label className="form-label">
                                        <input
                                            type="search"
                                            className="form-control form-control-sm"
                                            aria-controls="dataTable"
                                            placeholder="Search"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th className="fs-6">Name</th>
                                        <th className="fs-6">ID Number</th>
                                        <th className="fs-6">Phone Number</th>
                                        <th className="fs-6">Application Type</th>
                                        <th className="fs-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedApplications.map((application, index) => (
                                        <tr key={index}>
                                            <td className="fs-6">{application.application_name}</td>
                                            <td className="fs-6">{application.id_number}</td>
                                            <td className="fs-6">{application.phone_number}</td>
                                            <td className="fs-6">{application.application_type}</td>
                                            <td>
                                                <span className="p-1">
                                                    <Icon
                                                        fontSize="small"
                                                        className="me-2 text-dark"
                                                        onClick={() => handleViewClick(application.id_number)}
                                                    >
                                                        visibility
                                                    </Icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong className="fs-6">Name</strong></td>
                                        <td><strong className="fs-6">ID Number</strong></td>
                                        <td><strong className="fs-6">Phone Number</strong></td>
                                        <td><strong className="fs-6">Application Type</strong></td>
                                        <td><strong className="fs-6">Actions</strong></td>
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

export default NewApplications;
