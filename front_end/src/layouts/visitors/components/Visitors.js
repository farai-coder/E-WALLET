import React, { useState, useEffect } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import "assets/bootstrap/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import VisitorNavBar from './VisitorNavBar';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import axios from 'axios';
import EditVisitor from './EditVisitor';
import ViewVisitor from './ViewVisitor';
import DeleteVisitor from './DeleteVisitor';

import { BASE_URL } from 'Api';

function Visitors() {
    const [showEditVisitor, setShowEditVisitor] = useState(false);
    const [showViewVisitor, setShowViewVisitor] = useState(false);
    const [showDeleteVisitor, setShowDeleteVisitor] = useState(false);
    const [visitorData, setVisitorData] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);
    const [id, setId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/show_visitor`)  // Update this URL to your API endpoint
            .then(response => {
                setVisitorData(response.data); // Set the visitor data to state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [refresh]); // Dependency array ensures this runs when `refresh` changes
     
    console.log("visitor data", visitorData)
    const startIndex = Math.max(visitorData.length - displayCount, 0);
    const displayedVisitors = visitorData.slice(startIndex).reverse();

    const handleEditClick = (id) => {
        setShowEditVisitor(!showEditVisitor);
        setId(id);
    };

    const handleViewClick = (id) => {
        setShowViewVisitor(!showViewVisitor);
        setId(id);
    };

    const handleDeleteClick = (id) => {
        setShowDeleteVisitor(!showDeleteVisitor);
        setId(id);
        setRefresh(true);
    };

    return (
        
            <div>
            <VisitorNavBar setRefresh={setRefresh}/>
            {showEditVisitor && <EditVisitor setShowEditVisitor={setShowEditVisitor} id={id} setRefresh={setRefresh}/>}
            {showViewVisitor && <ViewVisitor setShowViewVisitor={setShowViewVisitor} id={id} setRefresh={setRefresh}/>}
            {showDeleteVisitor && <DeleteVisitor setShowDeleteVisitor={setShowDeleteVisitor} id={id} setRefresh={setRefresh}/>}
            <div className="container-fluid">
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold fs-6">Approved Visitors</p>
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
                                        <th className='fs-6'>Location</th>
                                        <th className='fs-6'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedVisitors.map((visitor, index) => (
                                        <tr key={index}>
                                            <td className='fs-6'>{visitor.visitor_name}</td>
                                            <td className='fs-6'>{visitor.national_id}</td>
                                            <td className='fs-6'>{visitor.number_plate}</td>
                                            <td className='fs-6'>{visitor.address}</td>
                                            <td>
                                                <span className="border border-radius-0 border-2 border-black p-1">
                                                    <Icon fontSize="small" className="me-2" onClick={() => handleViewClick(visitor.id)} style={{ color: '#90cef5' }}>visibility</Icon>
                                                    <span className="border-start border-2 border-black"></span>
                                                    <Icon fontSize="small" className="me-2" onClick={() => handleEditClick(visitor.id)} style={{ color: '#77ba77' }}>edit</Icon>
                                                    <span className="border-start border-2 border-black"></span>
                                                    <Icon fontSize="small" onClick={() => handleDeleteClick(visitor.id)} style={{ color: '#f27d74' }}>delete</Icon>
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
                                        <td><strong className='fs-6'>Location</strong></td>
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

export default Visitors;
