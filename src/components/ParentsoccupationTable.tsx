// // components/ParentsOccupationTable.tsx

// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation } from '../services/api';

// // Define a TypeScript interface for Parents Occupation data
// interface ParentsOccupation {
//     id?: string;
//     occupation: string;
// }

// const ParentsOccupationTable: React.FC = () => {
//     const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//     useEffect(() => {
//         fetchParentsOccupations();
//     }, []);

//     const fetchParentsOccupations = async () => {
//         try {
//             const response = await getParentsOccupations();
//             console.log("Fetched parents occupations data:", response.data); // Log fetched data
//             setParentsOccupations(response.data);
//         } catch (error) {
//             console.error("Error fetching parents occupations:", error);
//         }
//     };

//     const handleOpen = (parentsOccupation: ParentsOccupation | null = null) => {
//         setCurrentParentsOccupation(parentsOccupation);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentParentsOccupation(null);
//     };

//     const handleSave = async () => {
//         if (!currentParentsOccupation) return;

//         try {
//             if (currentParentsOccupation.id) {
//                 await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//             } else {
//                 await addParentsOccupation(currentParentsOccupation);
//             }
//             fetchParentsOccupations();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving parents occupation:", error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteParentsOccupation(id);
//             fetchParentsOccupations();
//         } catch (error) {
//             console.error("Error deleting parents occupation:", error);
//         }
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Parents Occupation</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Occupation</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parentsOccupations.map((parentsOccupation) => (
//                             <TableRow key={parentsOccupation.id}>
//                                 <TableCell>{parentsOccupation.id}</TableCell>
//                                 <TableCell>{parentsOccupation.occupation}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(parentsOccupation)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(parentsOccupation.id!)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentParentsOccupation?.id ? 'Edit Parents Occupation' : 'Add Parents Occupation'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Occupation"
//                         value={currentParentsOccupation?.occupation || ''}
//                         onChange={(e) => setCurrentParentsOccupation({ ...currentParentsOccupation, occupation: e.target.value })}
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

// export default ParentsOccupationTable;


// // ParentsOccupationTable.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
// } from '@mui/material';

// import {
//   getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation,
// } from '../services/api';
// import Reuse from './Basic/Reuse';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }

// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
//   }

// const columns :ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await getParentsOccupations();
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleSearchChange = (query: string) => {
//     // Add search functionality here if required
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteParentsOccupation(id);
//       fetchParentsOccupations();
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//       } else {
//         await addParentsOccupation(currentParentsOccupation);
//       }
//       fetchParentsOccupations();
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   return (
//     <>
//       <Reuse
//         data={parentsOccupations}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={setOpen}
//         idField="id"
//         title="Parents Occupations"
//       />

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentParentsOccupation?.id ? 'Edit' : 'Add'} Parents Occupation</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Occupation"
//             fullWidth
//             value={currentParentsOccupation?.occupation || ''}
//             onChange={(e) =>
//               setCurrentParentsOccupation({
//                 ...currentParentsOccupation,
//                 occupation: e.target.value,
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ParentsOccupationTable;


// ParentsOccupationTable.tsx
import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
} from '@mui/material';

import {
  getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation,
} from '../services/api';
import Reuse from './Basic/Reuse';

interface ParentsOccupation {
  id: string;
  occupation: string;
}
interface ColumnConfig<T> {
    field: keyof T;
    headerName: string;
    sortable: boolean;
  }
const columns:ColumnConfig<ParentsOccupation>[] = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'occupation', headerName: 'Occupation', sortable: true },
];

const ParentsOccupationTable: React.FC = () => {
  const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
  const [open, setOpen] = useState(false);
  const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

  useEffect(() => {
    fetchParentsOccupations();
  }, []);

  const fetchParentsOccupations = async () => {
    try {
      const response = await getParentsOccupations();
      setParentsOccupations(response.data);
    } catch (error) {
      console.error('Error fetching parents occupations:', error);
    }
  };

  const handleSearchChange = (query: string) => {
    // Add search functionality here if required
  };

  const handleEdit = (item: ParentsOccupation) => {
    setCurrentParentsOccupation(item);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteParentsOccupation(id);
      fetchParentsOccupations();
    } catch (error) {
      console.error('Error deleting parents occupation:', error);
    }
  };

  const handleSave = async () => {
    if (!currentParentsOccupation) return;

    try {
      if (currentParentsOccupation.id) {
        await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
      } else {
        await addParentsOccupation(currentParentsOccupation);
      }
      fetchParentsOccupations();
      handleClose();
    } catch (error) {
      console.error('Error saving parents occupation:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentParentsOccupation(null);
  };

  return (
    <>
      <Reuse
        data={parentsOccupations}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setShowPopup={setOpen}
        idField="id"
        title="Parents Occupations"
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentParentsOccupation?.id ? 'Edit' : 'Add'} Parents Occupation</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Occupation"
            fullWidth
            value={currentParentsOccupation?.occupation || ''}
            onChange={(e) =>
              setCurrentParentsOccupation((prev) => ({
                ...(prev || { id: '' }),
                occupation: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParentsOccupationTable;
