export const addTask = (contact) => {
  console.log("contact=====>",contact)
    return {
      type: "ADD_TASK",
      contact
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