// StudentTable.jsx
import react, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_STUDENT, CHANGE_STUDENT_TABLE, DELETE_STUDENT, EDIT_CURRENT_STUDENT } from '../../redux/constant/constants';

function EditToolbar(props) {
    const dispatch = useDispatch()
    const { setRowModesModel } = props;
    const newId = useSelector((state) => state.StudentReducerData.lastId) + 1
  
    const handleClick = async () => {
      const id = randomId();
      console.log(newId)
      dispatch({type: CHANGE_STUDENT_TABLE, payload: {id: newId, isNew:true, name:"", class:"", section:""}})
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'studentName' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Student
        </Button>
      </GridToolbarContainer>
    );
  }

const StudentTable = () => {
    const initialStudents = [
        { id: 1, name: 'John Doe', class: '10th', section: 'A' },
        { id: 2, name: 'Jane Smith', class: '11th', section: 'B' },
        // Add more initial student data if needed
      ];

  const [row, setRows] = useState(initialStudents);
  const [rowModesModel, setRowModesModel] = useState({});
  const dispatch = useDispatch()

  const rows = useSelector((state) => state.StudentReducerData.students)
  console.log(rows, "here")

  const handleEditClick = (id) => () => {
    console.log(rowModesModel)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch({type: DELETE_STUDENT, payload: id})
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log("on every click")
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow, newRow) 
    dispatch({type: CHANGE_STUDENT_TABLE, payload: {id: newRow.id, ...updatedRow}})
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    {field: 'id', headerName: "ID", width:80, editable:true},
    { field: 'studentName', headerName: 'Name', width: 180, editable: true },
    { field: 'class', headerName: 'Class', width: 120, editable: true },
    { field: 'section', headerName: 'Section', width: 120, editable: true },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
  ];

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{toolbar: EditToolbar}}
        slotProps={{
            toolbar: { setRowModesModel },
          }}
      />
    </Box>
  );
};

export default StudentTable;
