const contactReducer = (state = [], action) => {
    switch (action.type) {
      case "ADD_TASK":
        console.log("Store===>ADd",state,action.task)
        return [...state, action.task];
      case "DELETE_TASK":
        console.log("Store===>Delete",action.id,state,state.filter((task) => task.id !== action.id));
        return state.filter((task) => task.id !== action.id.id);
      case "UPDATE_TASK":
        console.log("Store===>Update",action.id,state,state.filter((task) => task.id !== action.id));
        let updateState = {...state.filter((task) => task.id == action.id)};
        let actionState = state.filter((task) => task.id != action.id);
        updateState = {...updateState,...action.task}
        return [...actionState,updateState]
      case "GET_CONTACT":
        console.log("Store===>Get",state)
        return state;
      default:
        return state;
    }
  };
  
  export default contactReducer;