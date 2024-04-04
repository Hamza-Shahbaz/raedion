import { ADD_NEW_CLASS, DELETE_CLASS, EDIT_CLASS } from "../constant/constants";

const initialState = () => ({classes: [{id: 1, name:"First", description:"random"}], lastId: 1});
  
  export const ClassReducerData = (state = initialState(), action) => {
    switch (action.type) {
      case ADD_NEW_CLASS:
        let id = state.lastId + 1
        console.log("id from the reducer", id)
        return {
            classes: state.classes.concat({
            id,
            className: action.payload.name,
            description : action.payload.description,
          }),
          lastId : id
        };
  
      case EDIT_CLASS:
        return {
            classes: state.classes.map((entry) => {
                if (entry.id == action.payload.id) {
                    return {
                        id: entry.id,
                        className: action.payload.name,
                        description : action.payload.description,
                    }
                }
                else return entry
            }),
            lastId : id
        };
  
      case DELETE_CLASS:
        return {
          classes: state.classes.filter((entry) => entry.id !== action.payload)
        };

      case "clearClasses" : 
        return {
          classes: [{id: 1, name:"First", description:"random"}], lastId: 1
        }

  
      default:
        return state;
    }
  };
  