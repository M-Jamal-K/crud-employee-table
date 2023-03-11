import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import useFetch from "../useFetch/useFetch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Model({
  open,
  setOpen,
  url,
  method,
  row = false,
  reRender
}) {
  const [fName, setfName] = useState("");
  const [LName, setLName] = useState("");
  const [Email, setEmail] = useState("");
  const [Salary, setSalary] = useState("");

  useEffect(() => {
    if (row) {
      setfName(row.fName);
      setLName(row.LName);
      setEmail(row.Email);
      setSalary(row.Salary);
    }
    return () => {};
  }, []);

  const Reset = () => {
    setfName("");
    setLName("");
    setEmail("");
    setSalary("");
  };

  const { methodOptionHandler, isPending, error } = useFetch(url, method);

  const submitted = () => {
    if (!fName.trim() || !LName.trim() || !Salary || !Email.trim()) {
      alert("Please Fill all the inputs");
      return;
    }
    if (!Email.trim().includes("@")) {
      alert("Email Must Contain @");
      return;
    }
    if (
      row &&
      row.fName === fName &&
      row.LName === LName &&
      row.Email === Email &&
      row.Salary === Salary
    ) {
      alert("Change input feild to update the database");
      return;
    }
    if (method === "PUT") {
      methodOptionHandler({
        fName,
        LName,
        Email,
        Salary,
        Date: row.Date
      });
    } else {
      methodOptionHandler({
        fName,
        LName,
        Email,
        Salary,
        Date: new Date().toLocaleDateString()
      });
    }
    Reset();
    setOpen(false);
    reRender();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} spacing={2}>
          <TextField
            value={fName}
            onChange={(e) => {
              setfName(e.target.value);
            }}
            label="First Name"
            id="outlined-size-small"
            size="small"
          />
          <TextField
            value={LName}
            onChange={(e) => {
              setLName(e.target.value);
            }}
            label="Last Name"
            id="outlined-size-small"
            size="small"
          />
          <TextField
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            type="email"
            id="outlined-size-small"
            size="small"
          />
          <TextField
            value={Salary}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && value > 0) {
                setSalary(value);
              }
            }}
            label="Salary"
            id="outlined-size-small"
            type="number"
            size="small"
          />
          <Button variant="contained" onClick={submitted} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="error">{error}</p>}
        </Stack>
      </Modal>
    </div>
  );
}
