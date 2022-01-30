import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Checkbox, Button, Select, MenuItem, Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import './todo.css'
import Dialog from './dialog';
import { updateTask } from '../redux/actions'


class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks,
            id: "",
            show: false,
            editId: ""
        };
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevProps.tasks != this.props.tasks){
            this.setState({tasks:this.props.tasks})
        }
    }

    handleDelete = (id) => {
        this.setState({ id: id })
        this.setState({ show: true })
    }
    handleEdit = (id) => {
        this.setState({ editId: id });
        this.setState({ edit: true });
        this.setState({ tasks: this.props.tasks });
    }
    handleChange = (e, id) => {
        let tasks= this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,radio: e.target.value }
            }
            return task
        })
       this.setState({tasks:tasks})
    };
    handleCheck = (e, id) => {
        let tasks=this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,[e.target.name]: e.target.checked}
            }
            return task
        })
        this.setState({tasks:tasks})
    };
    handleUser = (e, id) => {
        let regex = /^[A-Za-z ]{1,15}$/

        if (regex.test(e.target.value)) {
            let tasks = this.state.tasks.map((task)=>{
                if(task.id == id){
                   task={...task,user: e.target.value}
                }
                return task
            })
            this.setState({tasks:tasks})

        } else {
            alert('username should only be in alphabet with less than 15 character')
        }
    };
    handleDateChange = (date,id) => {
        let tasks=this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,selectedDate: date}
            }
            return task
        })
        this.setState({tasks:tasks})
    }
    handleTask = (e, id) => {
        let tasks=this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,task: e.target.value}
            }
            return task
        })
        this.setState({tasks:tasks})
    }
    handleRange = (e, id) => {
        let tasks=this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,range: e.target.value}
            }
            return task
        })
        this.setState({tasks:tasks})
    }
    handleStatus = (e, id) => {
        let tasks=this.state.tasks.map((task)=>{
            if(task.id == id){
               task={...task,status: e.target.value}
            }
            return task
        })
        this.setState({tasks:tasks})
    }
    setShow = (s) => {
        this.setState({ show: s })
    }
    updateTask = (id) => {
        let task = this.state.tasks.filter((task)=>task.id==id)
        console.log("TASK=--->",task)
        if (task[0].task) {
            this.props.dispatch(
                updateTask(id,task[0])
            );
            this.setState({editId:""})
        }
        else {
            alert('add task name')
        }
    }
    render() {
        return (
            <div className="centerTable" >
                <Dialog id={this.state.id} show={this.state.show} setShow={this.setShow} />
                <TableContainer component={Paper}>
                    <Table style={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>UserName</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Hobby</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Task</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tasks && this.state.tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell align="right"><TextField id="standard-basic" labl="username" value={task.user} onChange={(e) => this.handleUser(e, task.id)} disabled={ !(this.state.editId == task.id)} /></TableCell>
                                    <TableCell align="right">
                                        <RadioGroup aria-label="gender"  name="gender1" value={task.radio} disabled={ !(this.state.editId == task.id)} onChange={(e) => this.handleChange(e, task.id)}>
                                            <FormControlLabel value="female" control={<Radio color='error' />} label="Female" disabled={ !(this.state.editId == task.id)} />
                                            <FormControlLabel value="male" control={<Radio color='error'  />} label="Male" disabled={ !(this.state.editId == task.id)} />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell align="right">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={task.sports}
                                                    onChange={(e) => this.handleCheck(e, task.id)}
                                                    name="sports"
                                                    color="primary"
                                                    disabled={ !(this.state.editId == task.id)}
                                                />
                                            }
                                            label="Sports"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={task.reading}
                                                    onChange={(e) => this.handleCheck(e, task.id)}
                                                    name="reading"
                                                    color="primary"
                                                    disabled={ !(this.state.editId == task.id)}
                                                />
                                            }
                                            label="Reading"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={task.music}
                                                    onChange={(e) => this.handleCheck(e, task.id)}
                                                    name="music"
                                                    color="primary"
                                                    disabled={ !(this.state.editId == task.id)}
                                                />
                                            }
                                            label="Music"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField id="standard-basic" label="Age ( 18 to 55 )" value={task.range} type="range" min="18" max="28" onChange={(e) => this.handleRange(e, task.id)} disabled={ !(this.state.editId == task.id)} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField id="standard-basic" label="taskname" value={task.task} required disabled={ !(this.state.editId == task.id)} onChange={(e) => this.handleTask(e, task.id)} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={task.status}
                                            onChange={(e) => this.handleStatus(e, task.id)}
                                            disabled={ !(this.state.editId == task.id)}
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
                                                onChange={(e) => this.handleDateChange(e, task.id)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                disabled={ !(this.state.editId == task.id)}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </TableCell>
                                    <TableCell align="right"><div><DeleteIcon color='error' onClick={() => this.handleDelete(task.id)} />{ !(this.state.editId == task.id) && <EditIcon onClick={() => this.handleEdit(task.id)} />} {(this.state.editId == task.id) && <SaveIcon onClick={()=>this.updateTask(task.id)}/>}</div></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    };
}
const mapStateToprops = state => ({
    tasks: state
})
export default connect(mapStateToprops)(BasicTable);