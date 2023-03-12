// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Buttons from "../Buttons/Buttons";
// import useFetch from "../useFetch/useFetch";
// import Skeleton from "@mui/material/Skeleton";
// import { URL } from "../URL";

// const EmployeeData = () => {
//   const loadingSkeleton = [];
//   for (let i = 0; i < 7; i++) {
//     loadingSkeleton.push(
//       <TableCell key={i}>
//         <Skeleton animation="wave" />
//       </TableCell>
//     );
//   }
//   // for Getting DATA
//   const { data, isPending, error } = useFetch(URL);
//   return (
//     <TableContainer>
//       <Table aria-label="Employee table">
//         <TableHead>
//           <TableRow
//             sx={{
//               borderBottom: "2px solid black",
//               "& th": {
//                 fontSize: "1rem",
//                 fontWeight: "bolder"
//               }
//             }}
//           >
//             <TableCell>No.</TableCell>
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Salary</TableCell>
//             <TableCell>date</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {isPending && (
//             <>
//               <TableRow>{loadingSkeleton}</TableRow>
//               <TableRow>{loadingSkeleton}</TableRow>
//               <TableRow>{loadingSkeleton}</TableRow>
//             </>
//           )}
//           {data &&
//             !error &&
//             !isPending &&
//             data.map((row, index) => (
//               <TableRow
//                 key={row.id}
//                 sx={{
//                   backgroundColor:
//                     (index + 1) % 2 === 0 ? "" : "rgb(0 0 0 / 5%)",
//                   "& td,th": {
//                     fontSize: "1rem",
//                     fontWeight: "600"
//                   }
//                 }}
//               >
//                 <TableCell component="th" scope="row">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell>{row.fName}</TableCell>
//                 <TableCell>{row.LName}</TableCell>
//                 <TableCell>{row.Email}</TableCell>
//                 <TableCell>{`$${Number(row.Salary).toLocaleString(
//                   "en-US"
//                 )}`}</TableCell>
//                 <TableCell>{row.Date}</TableCell>
//                 <TableCell>
//                   <Buttons id={row.id} row={row} />
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//       {error && <p className="error">{error}</p>}
//     </TableContainer>
//   );
// };

// export default EmployeeData;

// GRID LAYOUT
import Stack from "@mui/material/Stack";
import Buttons from "../Buttons/Buttons";
import useFetch from "../useFetch/useFetch";
import Skeleton from "@mui/material/Skeleton";
import { URL } from "../URL";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "No.", width: 10 },
  { field: "fName", headerName: "First Name", width: 150 },
  { field: "LName", headerName: "Last Name", width: 150 },
  { field: "Email", headerName: "Email", width: 150 },
  { field: "Salary", headerName: "Salary", width: 150 },
  { field: "Date", headerName: "Date", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => <Buttons id={params.row.id} row={params.row} />,
    width: 200
  }
];

const EmployeeData = () => {
  const loadingSkeleton = [];
  for (let i = 0; i < 7; i++) {
    loadingSkeleton.push(
      <div key={i}>
        <Skeleton animation="wave" />
      </div>
    );
  }

  // for Getting DATA
  const { data, isPending, error } = useFetch(URL);

  const rows = data
    ? data.map((row, index) => ({
        id: index + 1,
        itmID: row.id,
        fName: row.fName,
        LName: row.LName,
        Email: row.Email,
        Salary: `$${Number(row.Salary).toLocaleString("en-US")}`,
        Date: row.Date,
        actions: <Buttons row={row} />
      }))
    : [];

  return (
    <div style={{ marginTop: "30px" }}>
      {data && !isPending && !error && (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          style={{
            width: "fit-content",
            paddingRight: "10px",
            margin: "10px auto"
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
        />
      )}
      {isPending && <Stack>{loadingSkeleton}</Stack>}
      {!isPending && error && <p className="error">{error}</p>}
    </div>
  );
};

export default EmployeeData;
