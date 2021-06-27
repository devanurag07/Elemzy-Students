import React from 'react'
import {Grid,Paper,Typography,makeStyles} from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Classroom from './Classroom';

const useStyles=makeStyles((theme)=>({
    
    root:{
        
    }
}))

function Dashboard() {
    
    return (
        <div>
        <Grid container>
            <Grid item sm={1}>
                <Sidebar/>
            </Grid>
            <Grid item sm={10}>
                <Classroom/>
            </Grid>
        </Grid>
        </div>
    )
}

export default Dashboard
