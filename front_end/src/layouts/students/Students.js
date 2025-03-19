import React from 'react';
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import StudentsTable from './StudentTable';

function Students() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
        <MDBox mb={3}>
          <h2>Students Information</h2>
        </MDBox>
      <MDBox>
        <StudentsTable /> {/* Integrate the StudentsTable here */}
      </MDBox>
    </DashboardLayout>
  );
}

export default Students;
