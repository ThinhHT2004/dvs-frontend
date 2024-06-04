import React, { useState } from "react";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(id, amount, status, diamondList = []) {
  diamondList = diamondList || [];
  return {
    id,
    amount,
    status,
    diamondList,
  };
}

function createDiamond(diamondID) {
  return {
    diamondID,
    appraiser1: "",
    appraiser2: "",
    appraiser3: "",
  };
}

const diamondList = [
  createDiamond("#DIA01"),
  createDiamond("#DIA02"),
  createDiamond("#DIA03"),
];

const initRequestList = [
  createData("#00001", "5", "Appraising", diamondList),
  createData("#00002", "5", "Appraising", diamondList),
  createData("#00003", "5", "Appraising", diamondList),
  createData("#00004", "5", "Appraising", diamondList),
  createData("#00005", "5", "Appraising", diamondList),
];

const appraiserList = ["T.Thinh", "H.Thinh", "T.Liem", "T.Khang"];

const Manager_ReceiptManagement = () => {
  const [data, setData] = useState(initRequestList);
  const [open, setOpen] = useState({});
  const [appraisers, setAppraisers] = useState(() => {
    const initialAppraisers = {};
    diamondList.forEach((diamond) => {
      initialAppraisers[diamond.diamondID] = {
        appraiser1: "",
        appraiser2: "",
        appraiser3: "",
      };
    });
    return initialAppraisers;
  });

  const [boxOpen, setBoxOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState(null);

  const drawerWidth = 240;

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const handleAppraiserChange = (diamondID, appraiserNumber, event) => {
    setAppraisers((prevAppraisers) => {
      const updatedAppraisers = {
        ...prevAppraisers,
        [diamondID]: {
          ...prevAppraisers[diamondID],
          [appraiserNumber]: event.target.value,
        },
      };
      return updatedAppraisers;
    });
  };

  const handleBoxOpen = (diamond) => {
    setCurrentDiamond(diamond);
    setBoxOpen(true);
  };

  const handleBoxClose = () => {
    setBoxOpen(false);
    setCurrentDiamond(null);
  };

  return (
    <Grid container spacing={0}>
      <StaffDrawer
        mylist={[
          "Home",
          "Pending Request",
          "Receipt Management",
          "Report Management",
          "Sign Out",
        ]}
        state="Receipt Management"
        handleClick={manager_navigator}
      />

      <Grid item xs={6}>
        <Box
          sx={{
            p: 3,

            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer component={Paper} sx={{ width: 800 }}>
            <Table sx={{ minWidth: 600, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleToggle(row.id)}
                        >
                          {open[row.id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open[row.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 0 }}>
                            <Table size="small" aria-label="purchases">
                              <TableBody>
                                {row.diamondList.map(
                                  (diamondRow, diamondIndex) => (
                                    <TableRow
                                      key={diamondRow.diamondID}
                                      sx={
                                        diamondIndex ===
                                        row.diamondList.length - 1
                                          ? { borderBottom: 0 }
                                          : {}
                                      }
                                    >
                                      <TableCell>
                                        {diamondRow.diamondID}
                                      </TableCell>
                                      <TableCell>
                                        <Typography>
                                          Appraiser 1 :{" "}
                                          {appraisers[diamondRow.diamondID]
                                            ?.appraiser1 || "None"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography>
                                          Appraiser 2 :{" "}
                                          {appraisers[diamondRow.diamondID]
                                            ?.appraiser2 || "None"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography>
                                          Appraiser 3 :{" "}
                                          {appraisers[diamondRow.diamondID]
                                            ?.appraiser3 || "None"}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Link
                                          href="#"
                                          sx={{
                                            color: "#69CEE2",
                                            paddingLeft: "16px",
                                          }}
                                          underline="none"
                                          onClick={() =>
                                            handleBoxOpen(diamondRow)
                                          }
                                        >
                                          Edit
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      {boxOpen && currentDiamond && (
        <Grid item xs={4}>
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }}>
                <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      Edit Appraiser - {currentDiamond.diamondID}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                    <TableCell>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="appraiser1-box-label">
                          Appraiser 1
                        </InputLabel>
                        <Select
                          labelId="appraiser1-box-label"
                          value={
                            appraisers[currentDiamond.diamondID]?.appraiser1 ||
                            ""
                          }
                          onChange={(event) =>
                            handleAppraiserChange(
                              currentDiamond.diamondID,
                              "appraiser1",
                              event
                            )
                          }
                        >
                          {appraiserList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                    <TableCell>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="appraiser2-box-label">
                          Appraiser 2
                        </InputLabel>
                        <Select
                          labelId="appraiser2-box-label"
                          value={
                            appraisers[currentDiamond.diamondID]?.appraiser2 ||
                            ""
                          }
                          onChange={(event) =>
                            handleAppraiserChange(
                              currentDiamond.diamondID,
                              "appraiser2",
                              event
                            )
                          }
                        >
                          {appraiserList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                    <TableCell>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="appraiser3-box-label">
                          Appraiser 3
                        </InputLabel>
                        <Select
                          labelId="appraiser3-box-label"
                          value={
                            appraisers[currentDiamond.diamondID]?.appraiser3 ||
                            ""
                          }
                          onChange={(event) =>
                            handleAppraiserChange(
                              currentDiamond.diamondID,
                              "appraiser3",
                              event
                            )
                          }
                        >
                          {appraiserList.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        onClick={handleBoxClose}
                        sx={{ backgroundColor: "#69CEE2" }}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleBoxClose}
                        variant="outlined"
                        sx={{ marginLeft: 1, borderColor: "red", color: "red" }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Manager_ReceiptManagement;
