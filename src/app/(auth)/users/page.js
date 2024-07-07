"use client";

import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal, Typography } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import AddUserForm from "@/app/componnets/addUser";
import UpdateUserForm from "@/app/componnets/updateUser";
import constant from "@/app/constant";
export default function Users() {
  const [data, setData] = useState([]);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const handleOpenUpdate = (userData) => {
    console.log("userdaat==", userData);
    setSelectedUserId(userData.id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${constant.baseurl}viewAllUsers`);
      const result = response.data;

      // Transform the data to match the table structure
      const formattedData = result.map((user) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        gender: user.gender,
        dob: new Date(user.dob).toLocaleDateString(),
        bloodGroup: user.bloodGroup,
        maritalStatus: user.maritalStatus,
        email: user.email,
        mobileNo: user.mobileNo,
        note: user.note,
        status: "Active",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EE534F",
      cancelButtonColor: "#689E38",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${constant.baseurl}deleteUser/${userId}`);

        fetchData();
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error", "Failed to delete the user.", "error");
      }
    }
  };

  const columns = [
    {
      name: "sr_no",
      label: "SR No",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "id",
      label: "User Id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
      },
    },
    {
      name: "dob",
      label: "DOB",
      options: {
        filter: false,
      },
    },
    {
      name: "mobileNo",
      label: "Contact No.",
      options: {
        filter: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
      },
    },

    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div>
            <VisibilityIcon
              style={{
                marginRight: "10px",
                background: "#689E38",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "30px",
              }}
            />
            <SaveAsIcon
              style={{
                marginRight: "10px",
                background: "#009AE4",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "30px",
              }}
              onClick={() => handleOpenUpdate(data[tableMeta.rowIndex])}
            />
            <DeleteIcon
              style={{
                marginRight: "10px",
                background: "#EE534F",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "30px",
              }}
              onClick={() => handleDelete(data[tableMeta.rowIndex].id)}
            />
          </div>
        ),
      },
    },
  ];

  const options = {
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
  };

  return (
    <>
      <Box
        style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}
      >
        <Button variant="contained" color="success" onClick={handleAddUserOpen}>
          ADD
        </Button>
      </Box>

      <MUIDataTable
        title={"List"}
        data={data}
        columns={columns}
        options={options}
      />

      <Modal
        open={addUserOpen}
        onClose={handleAddUserClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        className="adduser-model"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: "50%" },
            height: "85%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "4px",
            overflowY: "auto",
          }}
        >
          <AddUserForm open={addUserOpen} onClose={handleAddUserClose} />
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        className="adduser-model"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: "50%" },
            height: "85%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "4px",
            overflowY: "auto",
          }}
        >
          <UpdateUserForm userId={selectedUserId} onClose={handleCloseUpdate} />
        </Box>
      </Modal>
    </>
  );
}
