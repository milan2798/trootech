import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Checkbox, Button, Select, MenuItem, Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import './todo.css'
import Dialog from './dialog'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function BasicTable(props) {
    const classes = useStyles();
    console.log("propssss===>", props);
    const [id,setId] = useState("");
    const [show,setShow] = useState(false);
    const handleDelete = (id) => {
        setId(id)
        setShow(true)
    }
    return (
        <div className="centerTable" >
            <Dialog id={id} show={show} setShow={setShow}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>UserName</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Hobby</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Task</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasks && props.tasks.map((task) => (
                            <TableRow key={task.name}>
                                <TableCell align="right"><TextField id="standard-basic" label="username" value={task.user} disabled /></TableCell>
                                <TableCell align="right">
                                    <RadioGroup aria-label="gender" name="gender1" value={task.radio} disabled>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" disabled />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" disabled />
                                    </RadioGroup>
                                </TableCell>
                                <TableCell align="right">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={task.sports}
                                                name="sports"
                                                color="primary"
                                                disabled
                                            />
                                        }
                                        label="Sports"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={task.reading}
                                                name="reading"
                                                color="primary"
                                                disabled
                                            />
                                        }
                                        label="Reading"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={task.music}
                                                name="music"
                                                color="primary"
                                                disabled
                                            />
                                        }
                                        label="Music"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="standard-basic" label="Age ( 18 to 55 )" value={task.range} type="range" min="18" max="28" disabled />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField id="standard-basic" label="taskname" value={task.task} required disabled />
                                </TableCell>
                                <TableCell align="right">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={task.status}
                                        // onChange={this.handleStatus}
                                        disabled
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">InActive</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="right">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={task.selectedDate}
                                            // onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            disabled
                                        />
                                    </MuiPickersUtilsProvider>
                                </TableCell>
                                <TableCell align="right"><DeleteIcon color='error' onClick={()=>handleDelete(task.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
const mapStateToProps = state => ({
    tasks: state
})
export default connect(mapStateToProps)(BasicTable);