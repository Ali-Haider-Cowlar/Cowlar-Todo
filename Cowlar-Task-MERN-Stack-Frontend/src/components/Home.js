import React, { useEffect, useState } from "react";

import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";

const URL = "http://localhost:5000/task";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Home = () => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setTasks(data.tasks));
  }, []);

  return (
    <>
      <div className="backgroundImage">
        <div>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              LinkComponent={Link}
              to="/tasks"
              sx={{
                color: "#bddbd3",
                bgcolor: "#5a7d78",
                marginTop: 8,
                ":hover": {
                  bgcolor: "#5b7e78",
                  color: "white",
                },
              }}
              variant="contained"
            >
              <Typography variant="h4">View All Tasks</Typography>
            </Button>
          </Box>
        </div>

        <div style={{ margin: 100, marginTop: 20 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#232F3D" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }} align="left">
                    Task Name{" "}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    Creation Time
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    Completion Status
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    Completion Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks ? (
                  tasks.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.task_Name}
                      </TableCell>

                      <TableCell align="center">
                        {" "}
                        {moment(` ${row.creation_Time}`).format(
                          "MMM Do YYYY, h:mm a"
                        )}
                      </TableCell>
                      {row.completed === true ? (
                        <TableCell align="center">{"Yes"}</TableCell>
                      ) : (
                        <TableCell align="center">{"Pending"}</TableCell>
                      )}
                      {row.completed === true ? (
                        <TableCell align="center">
                          {" "}
                          {moment(` ${row.completed_Time}`).format(
                            "MMM Do YYYY, h:mm a"
                          )}
                        </TableCell>
                      ) : (
                        <TableCell align="center">{"Pending"}</TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <div />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Home;
