import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation,useNavigate } from 'react-router';
import { Button } from '@mui/material';

const mapping = {
    id: "Id",
    first_name:"First Name",
    last_name:"Last Name",
    date_of_birth:"Date Of Birth",
    address:"Address",
    date_of_joining: "Date Of Joining",
    salary:"Salary",
    designation:"Designation",
    manager_id:"Manager Id",
}

export default function EmployeeDetail() {
    const [clickedEmployee, setClickedEmployee] = React.useState({})
    const history = useLocation();
    React.useEffect(() => {
        
        if (localStorage){
            let selectedEmployee = localStorage.getItem("selectedEmployee");
            //console.log(localStorage.getItem("selectedEmployee"))
            if (selectedEmployee !== undefined && selectedEmployee !== null) {
                selectedEmployee = JSON.parse(selectedEmployee)
                setClickedEmployee(selectedEmployee)
                
            }
            
        }

        
    },[])
    
    const navigation = useNavigate();
    const handleBack = (values, props) => {
        navigation("/");
}

  return (
    <Paper elevation={8} align="center" style={{width: 400, height:"auto", marginTop:50,marginLeft:450}}>
      <Table sx={{ width: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {Object.keys(clickedEmployee).map((row, ind) => {
                      if (row === "details") { 
                          return <></>
                      }
                      else {
                          return (
                            <TableRow
                            key={ind}
                                sx={{ '&:last-child td, &:last-child th ,&:nth-of-type(odd)': { border: 0 ,  backgroundColor: "rgba(235, 235, 235 , .7)"} }}                  
                            >
                            <TableCell component="th" scope="row">
                                     {mapping[row]}
                                </TableCell>
                                  <TableCell align="right">
                                  {row==="salary" ? "$":""}{clickedEmployee[row]}
                                    </TableCell>
                          </TableRow>
                          )
                      }
                  }
              
                  )}
        </TableBody>
          </Table>
          <br/>
          <Button
            variant="contained"
            fullWidth
            color="primary" 
            onClick={handleBack}
          >
              Back to Main Page
          </Button>
    </Paper>
  );
}