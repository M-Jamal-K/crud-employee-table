import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Buttons from "../Buttons/Buttons";
import useFetch from "../useFetch/useFetch";
import Skeleton from "@mui/material/Skeleton";
import { URL } from "../URL";

const EmployeeData = ({ reRender, counter }) => {
  const loadingSkeleton = [];
  for (let i = 0; i < 7; i++) {
    loadingSkeleton.push(
      <TableCell key={i}>
        <Skeleton animation="wave" />
      </TableCell>
    );
  }
  // for Getting DATA
  const { data, isPending, error } = useFetch(URL, "GET", counter);

  return (
    <TableContainer>
      <Table aria-label="Employee table">
        <TableHead>
          <TableRow
            sx={{
              borderBottom: "2px solid black",
              "& th": {
                fontSize: "1rem",
                fontWeight: "bolder"
              }
            }}
          >
            <TableCell>No.</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending && (
            <>
              <TableRow>{loadingSkeleton}</TableRow>
              <TableRow>{loadingSkeleton}</TableRow>
              <TableRow>{loadingSkeleton}</TableRow>
            </>
          )}
          {data &&
            !error &&
            !isPending &&
            data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor:
                    (index + 1) % 2 === 0 ? "" : "rgb(0 0 0 / 5%)",
                  "& td,th": {
                    fontSize: "1rem",
                    fontWeight: "600"
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.fName}</TableCell>
                <TableCell>{row.LName}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{`$${Number(row.Salary).toLocaleString(
                  "en-US"
                )}`}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell>
                  <Buttons id={row.id} row={row} reRender={reRender} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {error && <p className="error">{error}</p>}
    </TableContainer>
  );
};

export default EmployeeData;
