import React, { useState } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import "assets/bootstrap/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import StaffNavBar from './StaffNavBar';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import EditStaff from './EditStaff';
import ViewStaff from './ViewStaff';
import DeleteStaff from './DeleteStaff';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'Api';

function Staff() {
    const [showEditStaff, setShowEditStaff] = useState(false);
    const [showViewStaff, setShowViewStaff] = useState(false);
    const [showDeleteStaff, setShowDeleteStaff] = useState(false);
    const [staffData, setStaffData] = useState([]);
    console.log('staffs', staffData)
    const [displayCount, setDisplayCount] = useState(10);
    const[id, setId] = useState(null)
    const[reflesh, setReflesh] = useState(false)

    useEffect(() => {
        // Fetch data from the API
        axios.get(`${BASE_URL}/show_staff`)
            .then(response => {
                setStaffData(response.data); // Set the staff data to state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [reflesh]); // Empty dependency array means this useEffect runs once on mount

    let displayedStaffs;
    const startIndex = Math.max(staffData.length - displayCount, 0);
    displayedStaffs = staffData.slice(startIndex).reverse();
    
    const handleEditClick = (id) => {
        setShowEditStaff(!showEditStaff);
        setId(id)
    
    };

    const handleViewClick = (id) => {
        setShowViewStaff(!showViewStaff);
        setId(id)
        
    };

    const handleDeleteClick = (id) => {
        setShowDeleteStaff(!showDeleteStaff);
        setId(id)
    
    };

    return (
        <div>
        
            <StaffNavBar setReflesh={setReflesh}/>
            {showEditStaff && <EditStaff setShowEditStaff={setShowEditStaff} id={id} setReflesh={setReflesh}/>}
            {showViewStaff && <ViewStaff setShowViewStaff={setShowViewStaff} id={id} setReflesh={setReflesh}/>}
            {showDeleteStaff && <DeleteStaff setShowDeleteStaff={setShowDeleteStaff} id={id} setReflesh={setReflesh}/>}
            <div className="container-fluid">
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold fs-6">Staff Members</p>
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
                                        <th className='fs-6'>National Id</th>
                                        <th className='fs-6'>Department</th>
                                        <th className='fs-6'>Start date</th>
                                        <th className='fs-6'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedStaffs.map((staff, index) => (
                                        <tr key={index}>
                                            <td className='fs-6'>{staff.name}</td>
                                            <td className='fs-6'>{staff.national_id}</td>
                                            <td className='fs-6'>{staff.department}</td>
                                            <td className='fs-6'>{staff.start_date}</td>
                                            <td>
                                                <span className="border border-radius-0 border-2 border-black p-1">
                                                    <Icon fontSize="small" className="me-2" onClick={() => handleViewClick(staff.id)} style={{ color: '#90cef5' }}>visibility</Icon>
                                                    <span className="border-start border-2 border-black"></span>
                                                    <Icon fontSize="small" className="me-2" onClick={() => handleEditClick(staff.id)} style={{ color: '#77ba77' }}>edit</Icon>
                                                    <span className="border-start border-2 border-black"></span>
                                                    <Icon fontSize="small" onClick={() => handleDeleteClick(staff.id)} style={{ color: '#f27d74' }}>delete</Icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong className='fs-6'>Name</strong></td>
                                        <td><strong className='fs-6'>National Id</strong></td>
                                        <td><strong className='fs-6'>Department</strong></td>
                                        <td><strong className='fs-6'>Start date</strong></td>
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

export default Staff;
