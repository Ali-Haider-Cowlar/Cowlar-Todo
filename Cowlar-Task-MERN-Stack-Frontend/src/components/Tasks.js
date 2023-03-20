import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Avatar, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

//Importing from directory
import "./Tasks.css";
import bitmapImg from "../img/Bitmap.jpg";

//Get All Tasks API Call
const URL = "http://localhost:5000/task";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Tasks = () => {
  const [input, setInput] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [toggleList, setToggleList] = useState(true);

  //Get Array of all Tasks
  const [tasks, setTasks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setTasks(data.tasks));
  }, []);

  const navigate = useNavigate();

  //Delete a Task
  const deleteItem = (value) => async () => {
    await axios
      .delete(`http://localhost:5000/task/${value}`)
      .then((res) => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/tasks"));
  };

  //Change Completion Status || Update Task
  const changeStatus = (value) => async () => {
    let changeStatus;
    if (value.completed === true) {
      changeStatus = false;
    } else {
      changeStatus = true;
    }
    await axios
      .put(`http://localhost:5000/task/${value._id}`, {
        task_Name: value.task_Name,
        completed: changeStatus,
        completed_Time: Date.now(),
      })
      .then((res) => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/tasks"));
  };

  //Update Input useState
  const handleChange = (event) => {
    setInput(event.target.value);
    setEmptyInputError(false);
  };

  //Add Task with Enter Key
  const onSubmit = async (event) => {
    event.preventDefault();
    if (input != null) {
      await axios
        .post("http://localhost:5000/task", {
          task_Name: String(input),
        })
        .then((res) => res.data)
        .then(() => navigate("/"))
        .then(() => navigate("/tasks"));
    } else {
      setEmptyInputError(true);
    }
  };

  //Add Task with AddTask Button
  const addTask = () => async () => {
    if (input != null) {
      await axios
        .post("http://localhost:5000/task", {
          task_Name: String(input),
        })
        .then((res) => res.data)
        .then(() => navigate("/"))
        .then(() => navigate("/tasks"));
    } else {
      setEmptyInputError(true);
    }
  };

  //------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <div className="backgroundImage" />

      <div>
        <Box display="flex" flexDirection="column" alignItems="center">
          <div
            className="avatar-person"
            style={{ height: 60, width: 60, marginTop: "90px" }}
          >
            <Avatar
              className="avatar"
              alt="Ali Haider"
              src={bitmapImg}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <br />
          <br />
          <Paper
            component="form"
            className="paper"
            value={input}
            onChange={handleChange}
            onSubmit={onSubmit}
            elevation={3}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#595554" }}
              placeholder="To do today"
              inputProps={{ "aria-label": "To do today" }}
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="KeyboardArrowDownIcon"
              onClick={() => setToggleList(!toggleList)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Paper>

          <br />
          {toggleList === true ? (
            <List
              className="list"
              sx={{
                padding: 0.2,
              }}
              component="nav"
              display="flex"
              position="relative"
              key={1}
            >
              {tasks ? (
                tasks.map((value) => (
                  <>
                    <ListItem
                      key={value._id}
                      sx={{ maxHeight: 40, padding: 2 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="Delete"
                          onClick={deleteItem(value._id)}
                        >
                          <DragIndicatorIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={changeStatus(value)}
                        dense
                        sx={{
                          borderRadius: "50%",
                          marginLeft: -4,
                        }}
                      >
                        {value.completed === true ? (
                          <ListItemIcon>
                            <Checkbox
                              label="CheckCircleIcon"
                              icon={<CheckCircleIcon />}
                            />
                          </ListItemIcon>
                        ) : (
                          <ListItemIcon>
                            <Checkbox
                              label="CheckCircleIcon"
                              icon={<RadioButtonUncheckedIcon />}
                            />
                          </ListItemIcon>
                        )}

                        <ListItemText
                          className="ListItemText"
                          id={value._id}
                          primary={value.task_Name}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ))
              ) : (
                <></>
              )}
            </List>
          ) : (
            <div />
          )}

          <br />
          <div>
            <Button
              data-testid="taskButton"
              className="addTaskButton"
              variant="contained"
              elevation={3}
              sx={{
                minWidth: 260,
                boxShadow: "2px 2px 8px #424242, 0px -1.5px 4px #355A54;",
                ":hover": {
                  bgcolor: "#5b7e78",
                  color: "white",
                },
              }}
              onClick={addTask()}
            >
              Add New Task
            </Button>
          </div>
          <br />
          {emptyInputError === true ? (
            <div className="error">
              <Alert testid="error" severity="error">
                Enter Task Name
              </Alert>
            </div>
          ) : (
            <div />
          )}
        </Box>
      </div>
    </div>
  );
};

export default Tasks;
