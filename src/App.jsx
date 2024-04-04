import { Box } from '@mui/material'
import './App.css'
import StudentTable from './components/Table'
import ClassTable from './components/ClassTable'

function App() {
  return (
    <>
      <Box>
        <h1>
          Students
        </h1>
        <StudentTable/>
      </Box>
      <Box>
        <h1>
          Classes
        </h1>
        <ClassTable/>
      </Box>
    </>
  )
}

export default App
