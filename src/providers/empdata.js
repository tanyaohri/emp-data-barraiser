    import * as React from 'react';
    import { Paper } from '@mui/material';
    import { DataGrid } from '@mui/x-data-grid';
    import axios from 'axios';
    import { createStyles, makeStyles } from "@material-ui/core/styles";
    import { useLocation, useNavigate } from 'react-router';


const paperStyle = {
    marginTop: 30,
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        "& .MuiDataGrid-row": {
          "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235 , .7)" }
        }
    }
  })
);

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'First Name',
    width: 150,
    editable: true,
      
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    width: 150,
    editable: true,
  },
  {
    field: 'date_of_birth',
    headerName: 'Date of Birth',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    type:'text',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    },
{
    field: 'date_of_joining',
    headerName: 'Date of Joining',
    type: 'number',
    width: 140,
    editable: true,
    },
{
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 110,
    editable: true,
    renderCell: (params) => {
        return `$ ${params.value}`
    }
    },
{
    field: 'designation',
    headerName: 'Designation',
    type: 'text',
    width: 160,
    editable: true,
    },
{
    field: 'manager_id',
    headerName: 'Manager Id',
    type: 'id',
    width: 210,
    editable: true,
    },

];



export default function EmployeeData() {
    const classes = useStyles();
    const [apiData, setApiData] = React.useState([])
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => { 
        async function callApi() { 
            const apiResult = await axios.get('https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees');
            setApiData(apiResult.data)
        }
        callApi()

    }, [])
    
    React.useEffect(() => {
        console.log(apiData, "api data set")
    }, [apiData])
   
    return (
    <React.Fragment>
        <Paper elevation={8} style={paperStyle}>
            <div style={{ height: 600, width: 'auto' }}>
                <DataGrid
                    rows={apiData}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[5]}
                    className={classes.root}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowClick={(params) => {
                    if(localStorage){
                        localStorage.setItem("selectedEmployee", JSON.stringify(params.row))
                        }
                        navigate("/empDetails") 

                        }}
                    />
                    
            </div>
        </Paper>
    </React.Fragment>
  );
}
