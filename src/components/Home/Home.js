import Model from "../MaterialUIModal/Model";
import { useState } from "react";
import Button from "@mui/material/Button";
import EmployeeData from "../EmployeeData/EmployeeData";
import { URL } from "../URL";

const Home = () => {
  const [open, setOpen] = useState(false);
  const AddEmployee = () => {
    setOpen(true);
  };
  // For Update Re rendering
  const [counter, setCounter] = useState(0);

  const reRender = () => {
    setTimeout(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
  };

  return (
    <div className="App">
      <Button variant="contained" onClick={AddEmployee}>
        Add Employee
      </Button>
      <Model
        open={open}
        setOpen={setOpen}
        url={URL}
        method="POST"
        reRender={reRender}
      />
      <EmployeeData counter={counter} reRender={reRender} />
    </div>
  );
};

export default Home;
