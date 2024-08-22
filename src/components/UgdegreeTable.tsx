// // components/UgDegreeTable.tsx

// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getUgDegrees, addUgDegree, updateUgDegree, deleteUgDegree } from '../services/api';

// // Define a TypeScript interface for UG Degree data
// interface UgDegree {
//     id?: string;
//     degree: string;
// }

// const UgDegreeTable: React.FC = () => {
//     const [ugDegrees, setUgDegrees] = useState<UgDegree[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentUgDegree, setCurrentUgDegree] = useState<UgDegree | null>(null);

//     useEffect(() => {
//         fetchUgDegrees();
//     }, []);

//     const fetchUgDegrees = async () => {
//         try {
//             const response = await getUgDegrees();
//             console.log("Fetched UG degrees data:", response.data); // Log fetched data
//             setUgDegrees(response.data);
//         } catch (error) {
//             console.error("Error fetching UG degrees:", error);
//         }
//     };

//     const handleOpen = (ugDegree: UgDegree | null = null) => {
//         setCurrentUgDegree(ugDegree);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentUgDegree(null);
//     };

//     const handleSave = async () => {
//         if (!currentUgDegree) return;

//         try {
//             if (currentUgDegree.id) {
//                 await updateUgDegree(currentUgDegree.id, currentUgDegree);
//             } else {
//                 await addUgDegree(currentUgDegree);
//             }
//             fetchUgDegrees();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving UG degree:", error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteUgDegree(id);
//             fetchUgDegrees();
//         } catch (error) {
//             console.error("Error deleting UG degree:", error);
//         }
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add UG Degree</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Degree</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {ugDegrees.map((ugDegree) => (
//                             <TableRow key={ugDegree.id}>
//                                 <TableCell>{ugDegree.id}</TableCell>
//                                 <TableCell>{ugDegree.degree}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(ugDegree)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(ugDegree.id!)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentUgDegree?.id ? 'Edit UG Degree' : 'Add UG Degree'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Degree"
//                         value={currentUgDegree?.degree || ''}
//                         onChange={(e) => setCurrentUgDegree({ ...currentUgDegree, degree: e.target.value })}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Paper>
//     );
// };

// export default UgDegreeTable;


// import React, { useEffect, useState } from 'react';
// import {
//   Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import { getUgDegrees, addUgDegree, updateUgDegree, deleteUgDegree } from '../services/api';
// import Reuse from './Basic/Reuse';


// interface UgDegree {
//   id?: string;
//   degree: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }
// const UgDegreeTable: React.FC = () => {
//   const [ugDegrees, setUgDegrees] = useState<UgDegree[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentUgDegree, setCurrentUgDegree] = useState<UgDegree | null>(null);

//   useEffect(() => {
//     fetchUgDegrees();
//   }, []);

//   const fetchUgDegrees = async () => {
//     try {
//       const response = await getUgDegrees();
//       console.log("Fetched UG degrees data:", response.data);
//       setUgDegrees(response.data);
//     } catch (error) {
//       console.error("Error fetching UG degrees:", error);
//     }
//   };

//   const handleOpen = (ugDegree: UgDegree | null = null) => {
//     setCurrentUgDegree(ugDegree);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentUgDegree(null);
//   };

//   const handleSave = async () => {
//     if (!currentUgDegree) return;

//     try {
//       if (currentUgDegree.id) {
//         await updateUgDegree(currentUgDegree.id, currentUgDegree);
//       } else {
//         await addUgDegree(currentUgDegree);
//       }
//       fetchUgDegrees();
//       handleClose();
//     } catch (error) {
//       console.error("Error saving UG degree:", error);
//     }
//   };

//   const columns : ColumnConfig<UgDegree>[]= [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field: 'degree', headerName: 'Degree', sortable: true },
//   ];

//   const handleSearchChange = (query: string) => {
//     // Implement search functionality if needed
//   };

//   const handleEdit = (ugDegree: UgDegree) => {
//     handleOpen(ugDegree);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteUgDegree(id);
//       fetchUgDegrees();
//     } catch (error) {
//       console.error("Error deleting UG degree:", error);
//     }
//   };

//   return (
//     <Paper>
//       <Reuse
//         data={ugDegrees}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={setOpen}
//         idField="id"
//         title="Ug Degrees"
//       />

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentUgDegree?.id ? 'Edit UG Degree' : 'Add UG Degree'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Degree"
//             value={currentUgDegree?.degree || ''}
//             onChange={(e) => setCurrentUgDegree({ ...currentUgDegree, degree: e.target.value })}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default UgDegreeTable;


import React, { useEffect, useState } from 'react';
import {
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Box, Grid
} from '@mui/material';
import { getUgDegrees, addUgDegree, updateUgDegree, deleteUgDegree } from '../services/api';
import Reuse from './Basic/Reuse';

interface UgDegree {
  id?: string;
  degree: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const UgDegreeTable: React.FC = () => {
  const [ugDegrees, setUgDegrees] = useState<UgDegree[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUgDegree, setCurrentUgDegree] = useState<UgDegree | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    fetchUgDegrees();
  }, []);

  const fetchUgDegrees = async () => {
    try {
      const response = await getUgDegrees();
      console.log("Fetched UG degrees data:", response.data);
      setUgDegrees(response.data);
    } catch (error) {
      console.error("Error fetching UG degrees:", error);
    }
  };

  const handleOpen = (ugDegree: UgDegree | null = null) => {
    setCurrentUgDegree(ugDegree);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUgDegree(null);
  };

  const handleSave = async () => {
    if (!currentUgDegree) return;

    try {
      if (currentUgDegree.id) {
        await updateUgDegree(currentUgDegree.id, currentUgDegree);
      } else {
        await addUgDegree(currentUgDegree);
      }
      fetchUgDegrees();
      handleClose();
    } catch (error) {
      console.error("Error saving UG degree:", error);
    }
  };

  const columns: ColumnConfig<UgDegree>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'degree', headerName: 'Degree', sortable: true },
  ];

  const handleSearchChange = (query: string) => {
    // Implement search functionality if needed
  };

  const handleEdit = (ugDegree: UgDegree) => {
    handleOpen(ugDegree);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUgDegree(id);
      fetchUgDegrees();
    } catch (error) {
      console.error("Error deleting UG degree:", error);
    }
  };

  return (
    <Paper>
      <Reuse
        data={ugDegrees}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setShowPopup={setOpen}
        idField="id"
        title="Ug Degrees"
      />

      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUgDegree?.id ? 'Edit UG Degree' : 'Add UG Degree'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Degree"
            value={currentUgDegree?.degree || ''}
            onChange={(e) => setCurrentUgDegree({ ...currentUgDegree, degree: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog> */}

{showPopup && (
          <Dialog
            open={showPopup}
            onClose={() => setShowPopup(false)}
            maxWidth="sm"
            sx={{ background: '#f5f0ef ' }}
          >
            <Box>
              <DialogTitle
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '20px',
                  fontSize: '50px',
                }}
              >
                {currentUgDegree?.id ? 'Edit UG Degree' : 'Add UG Degree'}
              </DialogTitle>
            </Box>
            <DialogContent style={{ padding: '50px 50px' }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Rasi Name"
                    value={currentUgDegree?.degree || ''}
                    onChange={(e) => setCurrentUgDegree({ ...currentUgDegree, degree: e.target.value })}
                    fullWidth
                  />
                </Grid>
              
              </Grid>
            </DialogContent>
            <DialogActions style={{ marginRight: '43px' }}>
              <Button
                style={{
                  background: '#FFFDFF',
                  color: 'red',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
              <Button
                style={{
                  background: 'red',
                  color: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                }}
                onClick={handleSave} disabled={!newLagnam.trim()}
              >
                {currentUgDegree ? 'Update' : 'Submit'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
        
    </Paper>
  );
};

export default UgDegreeTable;
