export const addTask = (task) => {
  console.log("contact=====>",task)
    return {
      type: "ADD_TASK",
      task:task
    };
  };
  
  export const deleteTask = (id) => {
    console.log("---id===>",id)
    return {
      type: "DELETE_TASK",
      id
    };
  };
  
  export const getTask = () => {
    return {
      type: "GET_TASK"
    };
  };
  export const updateTask = (id,task) => {
    return {
      type: "UPDATE_TASK",
      id,
      task:task 
    };
  };