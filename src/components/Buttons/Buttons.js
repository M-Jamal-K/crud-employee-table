import useFetch from "../useFetch/useFetch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Model from "../MaterialUIModal/Model";
import { useState } from "react";
import { URL } from "../URL";

const Buttons = ({ id, row, reRender }) => {
  const [open, setOpen] = useState(false);
  const onUpdate = (e) => {
    setOpen(true);
  };

  // Deleting
  const {
    methodOptionHandler,
    isPending: delisPending,
    error: delError
  } = useFetch(`${URL}/${id}`, "DELETE");

  const onDelete = (e) => {
    methodOptionHandler();
    reRender();
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={onDelete} disabled={delisPending}>
        {delisPending ? "Deleting" : "Delete"}
      </Button>
      <Button variant="outlined" onClick={onUpdate}>
        Update
      </Button>

      <Model
        open={open}
        setOpen={setOpen}
        url={`${URL}/${id}`}
        method="PUT"
        row={row}
        reRender={reRender}
      />

      {delError && <p className="error">{delError}</p>}
    </Stack>
  );
};

export default Buttons;
