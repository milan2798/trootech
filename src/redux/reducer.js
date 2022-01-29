const contactReducer = (state = [], action) => {
    switch (action.type) {
      case "ADD_TASK":
        console.log("Store===>ADd",state,action.contact)
        return [...state, action.contact];
      case "DELETE_TASK":
        console.log("Store===>Delete",action.id,state,state.filter((task) => task.id !== action.id));
        return state.filter((task) => task.id !== action.id.id);
      case "GET_CONTACT":
        console.log("Store===>Get",state)
        return state;
      default:
        return state;
    }
  };
  
  export default contactReducer;