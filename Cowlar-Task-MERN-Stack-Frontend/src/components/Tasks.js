import React, { useEffect, useState } from "react";
import axios from "axios";

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
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

//React Icons
import { HiCheckCircle } from "react-icons/hi";

//Toast React
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//React Spinner
import { ColorRing } from "react-loader-spinner";

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
  const [reload, setReload] = useState(false);

  const [emptyInputError, setEmptyInputError] = useState(false);
  const [toggleList, setToggleList] = useState(true);

  //Get Array of all Tasks
  const [tasks, setTasks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setTasks(data.tasks));
  }, []);

  useEffect(() => {
    fetchHandler().then((data) => setTasks(data.tasks));
  }, [reload]);

  //Delete a Task
  const deleteItem = (value) => async () => {
    await axios
      .delete(`http://localhost:5000/task/${value}`)
      .then((res) => res.data)
      .then(() => setReload(!reload));
    showToastMessageDelete();
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
      .then(() => setReload(!reload));
  };

  //Update Input useState
  const handleChange = (event) => {
    setInput(event.target.value);
    setEmptyInputError(false);
  };

  //Add Task with Enter Key
  const onSubmit = async (event) => {
    event.preventDefault();
    if ((input !== "") | null) {
      await axios
        .post("http://localhost:5000/task", {
          task_Name: String(input),
        })
        .then((res) => res.data)
        .then(() => setReload(!reload));
      showToastMessageAdd();
    } else {
      showToastMessageError();
      setEmptyInputError(true);
    }
  };

  //Add Task with AddTask Button
  const addTask = () => async () => {
    if ((input !== "") | null) {
      await axios
        .post("http://localhost:5000/task", {
          task_Name: String(input),
        })
        .then((res) => res.data)
        .then(() => setReload(!reload));
      showToastMessageAdd();
    } else {
      showToastMessageError();
      setEmptyInputError(true);
    }
  };

  //Toast Message Success
  const showToastMessageAdd = () => {
    toast.success("🎯 Task Added! 🐄", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Delete Toast
  const showToastMessageDelete = () => {
    toast.success("🗑️ Task Deleted! 🐄", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Error Toast
  const showToastMessageError = () => {
    toast.error("Task Name Missing! 🐄", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  //------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {/*Background Image*/}
      <div className="backgroundImage" />

      {/*Displaying toasts for 5 seconds*/}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div>
        {/*Profile Picture old man*/}
        <Box display="flex" flexDirection="column" alignItems="center">
          <div
            className="avatar-person"
            style={{ height: 60, width: 60, marginTop: "80px" }}
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

          {/*To do today component*/}
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
              className="nputBase"
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

          {/*List Component*/}
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
            >
              {tasks ? (
                tasks.map((value) => (
                  <React.Fragment key={value._id}>
                    <ListItem
                      key={value._id}
                      sx={{ maxHeight: 40, padding: 2 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          data-testid="delete"
                          aria-label="Delete"
                          onClick={deleteItem(value._id)}
                        >
                          {/*Delete Button*/}
                          <DragIndicatorIcon />
                        </IconButton>
                      }
                    >
                      {/*Checkbox*/}
                      <ListItemButton
                        onClick={changeStatus(value)}
                        dense
                        sx={{
                          borderRadius: "50%",
                          marginLeft: -4,
                        }}
                      >
                        {value.completed === true ? (
                          <ListItemIcon className="round">
                            {/*Checkbox when checked*/}

                            <Checkbox
                              label="CheckCircleIcon"
                              icon={
                                <HiCheckCircle
                                  style={{ fontSize: 22, color: "#948c77" }}
                                />
                              }
                            />
                          </ListItemIcon>
                        ) : (
                          <ListItemIcon className="round">
                            {/*Checkbox when Unchecked*/}
                            <Checkbox
                              label="CheckCircleIcon"
                              icon={
                                <RadioButtonUncheckedIcon
                                  style={{ fontSize: 20 }}
                                />
                              }
                            />
                          </ListItemIcon>
                        )}

                        {/*Text part of each task*/}
                        <ListItemText
                          className="ListItemText"
                          id={value._id}
                          primary={value.task_Name}
                          style={{ marginLeft: -10 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>
                  {/*React Spinner for Loading*/}

                  <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              )}
            </List>
          ) : (
            <div />
          )}

          <br />
          <div>
            {/*Add task button*/}
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

          {/*Error Alert*/}
          {emptyInputError === true ? (
            <Alert
              severity="error"
              style={{
                zIndex: 1,
                marginTop: 5,
                backgroundColor: "transparent",
                color: "#ff6666",
              }}
            >
              Enter Task Name
            </Alert>
          ) : (
            <div />
          )}
        </Box>
      </div>
    </div>
  );
};

export default Tasks;
