// import React, { useState, useEffect, useMemo } from 'react';
// import {Button, Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Select,
//   MenuItem,
//   Container,
//   Typography,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
// } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
// import { useTable } from 'react-table';
// import axios from 'axios';

// interface Lagnam {
//   id: number;
//   name: string;
// }

// const LagnamList: React.FC = () => {
//   const [lagnams, setLagnams] = useState<Lagnam[]>([]);
//   const [newLagnam, setNewLagnam] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [editLagnamId, setEditLagnamId] = useState<number | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [lagnamToDelete, setLagnamToDelete] = useState<number | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [pageSize, setPageSize] = useState<number>(20);
//   const [currentPage, setCurrentPage] = useState<number>(0);

//   useEffect(() => {
//     fetchLagnams();
//   }, []);

//   const fetchLagnams = async () => {
//     const response = await axios.get("http://103.214.132.20:8000/api/lagnams/",);
//     setLagnams(response.data);
//   };

//   const addOrUpdateLagnam = async () => {
//     const lagnamData = { name: newLagnam };
//     if (editLagnamId) {
//       await axios.put(`http://localhost:8000/api/accounts/lagnams/${editLagnamId}/`, lagnamData);
//     } else {
//       await axios.post('http://localhost:8000/api/accounts/lagnams/', lagnamData);
//     }
//     setNewLagnam('');
//     setShowPopup(false);
//     setEditLagnamId(null);
//     fetchLagnams();
//     setShowSuccessPopup(true);
//   };

//   const handleEditLagnam = (lagnam: Lagnam) => {
//     setEditLagnamId(lagnam.id);
//     setNewLagnam(lagnam.name);
//     setShowPopup(true);
//   };

//   const handleDeleteLagnam = (id: number) => {
//     setLagnamToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteLagnam = async () => {
//     if (lagnamToDelete !== null) {
//       await axios.delete(`http://localhost:8000/api/accounts/lagnams/${lagnamToDelete}/`);
//       setLagnamToDelete(null);
//       setDeleteConfirmation(false);
//       fetchLagnams();
//     }
//   };

//   const cancelDeleteLagnam = () => {
//     setLagnamToDelete(null);
//     setDeleteConfirmation(false);
//   };

//   const handlePopupOpen = () => {
//     setShowPopup(true);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     setNewLagnam('');
//     setEditLagnamId(null);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPage(value - 1);
//   };

//   const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setPageSize(event.target.value as number);
//     setCurrentPage(0); // Reset to first page whenever page size changes
//   };

//   const filteredLagnams = lagnams.filter((lagnam) =>
//     lagnam.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const data = useMemo(() => filteredLagnams, [filteredLagnams]);
//   const columns = useMemo(
//     () => [
//       {
//         Header: 'ID',
//         accessor: 'id',
//       },
//       {
//         Header: 'Name',
//         accessor: 'name',
//       },
//       {
//         Header: 'Actions',
//         Cell: ({ row }: any) => (
//           <div>
//             <IconButton edge="end" aria-label="edit" onClick={() => handleEditLagnam(row.original)}>
//               <EditIcon />
//             </IconButton>
//             <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLagnam(row.original.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({columns, data });

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Lagnams
//       </Typography>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div>
//           <Select value={pageSize} onChange={handlePageSizeChange}>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={20}>20</MenuItem>
//             <MenuItem value={30}>30</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </div>
//         <div>
//           <TextField
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search Lagnam"
//             style={{ marginRight: '10px' }}
//           />
//           <Button onClick={handlePopupOpen}>
//             <AddIcon />
//           </Button>
//         </div>
//       </div>
//       <TableContainer component={Paper}>
//         <Table {...getTableProps()}>
//           <TableHead>
//             {headerGroups.map(headerGroup => (
//               <TableRow {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <TableCell {...column.getHeaderProps()}>
//                     {column.render('Header')}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHead>
//           <TableBody {...getTableBodyProps()}>
//             {rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(row => {
//               prepareRow(row);
//               return (
//                 <TableRow {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <TableCell {...cell.getCellProps()}>
//                       {cell.render('Cell')}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         count={Math.ceil(filteredLagnams.length / pageSize)}
//         page={currentPage + 1}
//         onChange={handlePageChange}
//         style={{ marginTop: '20px', display: 'flex', justifyContent: 'end' }}
//       />
//       {showPopup && (
//         <Dialog open={showPopup} onClose={handlePopupClose}>
//           <DialogTitle>{editLagnamId ? 'Edit Lagnam' : 'Add Lagnam'}</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Lagnam"
//               value={newLagnam}
//               onChange={(e) => setNewLagnam(e.target.value)}
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handlePopupClose}>Cancel</Button>
//             <Button onClick={addOrUpdateLagnam} disabled={!newLagnam.trim()}>
//               {editLagnamId ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       {deleteConfirmation && (
//         <Dialog open={deleteConfirmation} onClose={cancelDeleteLagnam}>
//           <DialogTitle>Confirmation</DialogTitle>
//           <DialogContent>
//             <p>Are you sure you want to delete this Lagnam?</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={confirmDeleteLagnam}>Yes</Button>
//             <Button onClick={cancelDeleteLagnam}>No</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       {showSuccessPopup && (
//         <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
//           <DialogTitle>Success</DialogTitle>
//           <DialogContent>
//             <p>Lagnam has been successfully {editLagnamId ? 'updated' : 'added'}!</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default LagnamList;


import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Container,
  Typography,
  IconButton,
  Pagination,
  Box,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';


interface Lagnam {
  id: number;
  name: string;
}


interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const LagnamList: React.FC = () => {
  const [lagnams, setLagnams] = useState<Lagnam[]>([]);
  const [newLagnam, setNewLagnam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editLagnamId, setEditLagnamId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [lagnamToDelete, setLagnamToDelete] = useState<number | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchLagnams();
  }, []);

  const fetchLagnams = async () => {
    const response = await axios.get('http://103.214.132.20:8000/api/lagnams/');
    setLagnams(response.data);
  };

  const addOrUpdateLagnam = async () => {
    const lagnamData = { name: newLagnam };
    if (editLagnamId) {
     let response = await axios.put(`http://103.214.132.20:8000/api/lagnams/${editLagnamId}/`, lagnamData);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
     let response = await axios.post('http://103.214.132.20:8000/api/lagnams/', lagnamData);
     if (response.status >= 200 && response.status <= 201) {
      notify('Successfully updated');
    }
    }
    setNewLagnam('');
    setShowPopup(false);
    setEditLagnamId(null);
    fetchLagnams();
    setShowSuccessPopup(true);
  };

  const handleEditLagnam = (lagnam: Lagnam) => {
    setEditLagnamId(lagnam.id);
    setNewLagnam(lagnam.name);
    setShowPopup(true);
  };

  const handleDeleteLagnam = (id:number) => {
    setLagnamToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteLagnam = async () => {
    if (lagnamToDelete !== null) {
     let response=await axios.delete(`http://103.214.132.20:8000/api/lagnams/${lagnamToDelete}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
      }
      setLagnamToDelete(null);
      setDeleteConfirmation(false);
      fetchLagnams();
    }
  };

  // const cancelDeleteLagnam = () => {
  //   setLagnamToDelete(null);
  //   setDeleteConfirmation(false);
  // };

  const columns : ColumnConfig<Lagnam>[] = useMemo(() => [
    {
      field: 'id',
      headerName: 'ID',
      sortable: true,
    },
    {
      field: 'name',
      headerName: 'Lagnam',
      sortable: true,
    },
  ], []);

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px' }}>
      <Reuse
        data={lagnams}
        columns={columns}
        handleSearchChange={setSearchQuery}
        handleEdit={handleEditLagnam}
        handleDelete={(id) => handleDeleteLagnam(Number(id))} 
        setShowPopup={setShowPopup}
        idField="id"
        title="Lagnam List"
      />

      {/* {showPopup && (
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <DialogTitle>{editLagnamId ? 'Edit Lagnam' : 'Add Lagnam'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Lagnam"
              value={newLagnam}
              onChange={(e) => setNewLagnam(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPopup(false)}>Cancel</Button>
            <Button onClick={addOrUpdateLagnam} disabled={!newLagnam.trim()}>
              {editLagnamId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
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
                {editLagnamId ? 'Edit Lagnam' : 'Add Lagnam'}
              </DialogTitle>
            </Box>
            <DialogContent style={{ padding: '50px 50px' }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Lagnam Name"
                    value={newLagnam}
                    onChange={(e) => setNewLagnam(e.target.value)}
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
                onClick={addOrUpdateLagnam} disabled={!newLagnam.trim()}
              >
                {editLagnamId ? 'Update' : 'Submit'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      {/* {deleteConfirmation && (
        <Dialog open={deleteConfirmation} onClose={cancelDeleteLagnam}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this Lagnam?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDeleteLagnam}>Yes</Button>
            <Button onClick={cancelDeleteLagnam}>No</Button>
          </DialogActions>
        </Dialog>
      )} */}

{deleteConfirmation && (
          <Dialog
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
              Are you sure you want to delete this Rasi?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={confirmDeleteLagnam} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}

<Notification />
      {/* {showSuccessPopup && (
        <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <p>Lagnam has been successfully {editLagnamId ? 'updated' : 'added'}!</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )} */}
    </Container>
  );
  
};

export default LagnamList;
