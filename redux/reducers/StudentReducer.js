import { ADD_NEW_STUDENT, DELETE_STUDENT, EDIT_CURRENT_STUDENT } from "../constant/constants";

const initialState = () => ({
  students: [{ id: 1, studentName: "try", class: "Initial", section: "None" }],
  lastId: 1, // Adjusted to match the initial student's id
});

export const StudentReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case ADD_NEW_STUDENT:
      const newId = state.lastId + 1;
      return {
        students: state.students.concat({
          id: newId,
          studentName: action.payload.name,
          class: action.payload.class,
          section: action.payload.section,
        }),
        lastId: newId, // Update lastId after adding a new student
      };

    case EDIT_CURRENT_STUDENT:
      return {
        students: state.students.map((entry) => {
          if (entry.id === action.payload.id) {
            return {
              id: entry.id,
              studentName: action.payload.name || action.payload.studentName,
              class: action.payload.class,
              section: action.payload.section,
            };
          } else {
            return entry;
          }
        }),
        lastId: state.lastId, // Keep lastId unchanged
      };

    case DELETE_STUDENT:
      return {
        students: state.students.filter((entry) => entry.id !== action.payload),
        lastId: state.lastId, // Keep lastId unchanged
      };

    default:
      return state;
  }
};
