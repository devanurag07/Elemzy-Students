import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles=makeStyles((theme)=>({
    root:{
        height:"100vh",
        background:"red"
    }
}))


// Hello
function Sidebar() {

    const classes=useStyles();
    return (
        <div className={classes.root} > 
            Side Baras
        </div>
    )
}

export default Sidebar
