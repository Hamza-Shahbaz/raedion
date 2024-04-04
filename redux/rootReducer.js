import { combineReducers } from "redux";
import { BreadcrumbReducerData } from "./reducers/BreadcrumbsReducer";
import { ClassReducerData } from "./reducers/ClassReducer";
import { SectionReducerData } from "./reducers/SectionReducer";
import { StudentReducerData } from "./reducers/StudentReducer";

export default combineReducers({
  BreadcrumbReducerData,
  ClassReducerData,
  SectionReducerData,
  StudentReducerData
});
