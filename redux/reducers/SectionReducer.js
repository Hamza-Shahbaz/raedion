import { ADD_NEW_SECTION, DELETE_SECTION, EDIT_SECTION } from "../constant/constants";

const initialState = () => ({sections: [], lastId: 0});
  
  export const SectionReducerData = (state = initialState(), action) => {
    switch (action.type) {
      case ADD_NEW_SECTION:
        let id = state.lastId + 1
        return {
            sections: state.sections.concat({
            id,
            sectionName: action.payload.name,
          })
        };
  
      case EDIT_SECTION:
        return {
            sections: state.sections.map((entry) => {
                if (entry.id == action.payload.id) {
                    return {
                        id: entry.id,
                        sectionName: action.payload.name,
                    }
                }
                else return entry
            })
        };
  
      case DELETE_SECTION:
        return {
            sections: state.sections.filter((entry) => entry.id !== action.payload)
        };
  
      default:
        return state;
    }
  };
  