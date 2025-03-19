// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images from your project
import team1 from "assets/images/team-1.jpg";  // Placeholder for vehicle image
import team2 from "assets/images/team-2.jpg";  // Placeholder for vehicle image
import team3 from "assets/images/team-3.jpg";  // Placeholder for vehicle image
import team4 from "assets/images/team-4.jpg";  // Placeholder for vehicle image

export default function vehicleData() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Vehicle = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "vehicle", accessor: "vehicle", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "location", accessor: "location", align: "center" },
      { Header: "plates", accessor: "plates", align: "center" },
    ],

    rows: [
      {
        vehicle: 123,
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Stolen
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Entrance Gate
          </MDTypography>
        ),
        plates: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            N/A
          </MDTypography>
        ),
      },
      {
        vehicle: 912,
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Unregistered
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Exit Gate
          </MDTypography>
        ),
        plates: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            ABC123
          </MDTypography>
        ),
      },
      {
        vehicle: 708,
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Missing Plates
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Entrance Gate
          </MDTypography>
        ),
        plates: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            N/A
          </MDTypography>
        ),
      },
    ],
  };
}
