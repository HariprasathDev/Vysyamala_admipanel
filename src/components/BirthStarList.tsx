// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Container,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';

// import BasicTable from './BirthstarTable';
// import { BirthStarApi } from '../services/api';

// import Notification, { notify, notifyDelete } from './TostNotification';

// interface BirthStar {
//   id: number;
//   star: string;
//   tamil_series: string;
//   telugu_series: string;
//   kannada_series: string;
// }

// const BirthStarList: React.FC = () => {
//   const [birthStars, setBirthStars] = useState<BirthStar[]>([]);
//   const [newBirthStar, setNewBirthStar] = useState<string | null>('');
//   const [tamilSeries, setTamilSeries] = useState<string | null>('');
//   const [TeluguSeries, setTeluguSeries] = useState<string | null>('');
//   const [canadaSeries, SetCanadaSeries] = useState<string | null>('');
//   const [editStarId, setEditStarId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [starToDelete, setStarToDelete] = useState<number | null>(null);

//   const valDis = Boolean(
//     tamilSeries && TeluguSeries && canadaSeries && newBirthStar,
//   );

//   const adddata = {
//     star: newBirthStar,
//     tamil_series: tamilSeries,
//     telugu_series: TeluguSeries,
//     kannada_series: canadaSeries,
//   };
//   useEffect(() => {
//     fetchBirthStars();
//   }, []);

//   const handleDelete = async (id: number) => {
//     let response;
//     try {
//       response = await axios.delete(`${BirthStarApi}${id}/`);

//       if (response.status >= 200 || response.status <= 201) {
//         notifyDelete('successfully Deleted');
//       }
//     } catch (error) {
//       console.error('Error deleting birth star:', error);
//     }
//   };

//   const fetchBirthStars = async () => {
//     try {
//       const response = await axios.get(BirthStarApi);
//       setBirthStars(response.data);
//     } catch (error) {
//       console.error('Error fetching birth stars:', error);
//     }
//   };
//   const handleDeleteStar = (id: number) => {
//     console.log(id);
//     setStarToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteStar = async () => {
//     if (starToDelete !== null) {
//       await handleDelete(starToDelete);
//       setStarToDelete(null);
//       setDeleteConfirmation(false);
//       fetchBirthStars();
//     }
//   };

//   const handleAddOrUpdateBirthStar = async () => {
//     const starData = adddata;
//     let response;
//     if (editStarId) {
//       response = await axios.put(`${BirthStarApi}${editStarId}/`, starData);
//       if (response.status >= 200 || response.status <= 201) {
//         notify('successfully updated');
//       }
//     } else {
//       response = await axios.post(BirthStarApi, starData);
//       if (response.status >= 200 || response.status <= 201) {
//         notify('Birthstar Added successfully');
//       }
//     }
//     setNewBirthStar(null);
//     setTamilSeries(null);
//     setTeluguSeries(null);
//     SetCanadaSeries(null);
//     setEditStarId(null);
//     setShowPopup(false);
//     fetchBirthStars();
//   };

//   const handleEditStar = (star: BirthStar) => {
//     setEditStarId(star.id);
//     setNewBirthStar(star.star);
//     setTamilSeries(star.tamil_series);
//     setTeluguSeries(star.telugu_series);
//     SetCanadaSeries(star.kannada_series);
//     setShowPopup(true);
//   };

//   const clear_val = () => {
//     setEditStarId(null);
//     setNewBirthStar(null);
//     setTamilSeries(null);
//     setTeluguSeries(null);
//     SetCanadaSeries(null);
//     setShowPopup(false);
//   };
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleItemsPerPageChange = (
//     event: React.ChangeEvent<{ value: unknown }>,
//   ) => {
//     setItemsPerPage(parseInt(event.target.value as string, 10));

//     setCurrentPage(1);
//   };

//   return (
//     <Container
//       style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         width: '100%',
//         maxWidth: '100vw',
//         boxSizing: 'border-box',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '8px',
//         }}
//       >
//         {
//           <div>
//             <BasicTable
//               setShowPopup={setShowPopup}
//               handleDelete={handleDeleteStar}
//               handleEdit={handleEditStar}
//               birthStar={birthStars}
//               handleItemsPerPageChange={handleItemsPerPageChange}
//               handleSearchChange={handleSearchChange}
//               itemsPerPage={itemsPerPage}
//             />
//           </div>
//         }

//         {showPopup && (
//           <Dialog
//             open={showPopup}
//             onClose={() => setShowPopup(false)}
//             maxWidth="sm"
//             sx={{ background: '#f5f0ef ' }}
//           >
//             <Box>
//               <DialogTitle
//                 style={{
//                   color: 'red',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   marginTop: '20px',
//                   fontSize: '30px',
//                 }}
//               >
//                 {editStarId ? 'Edit Birth Star' : 'Add Birth Star'}
//               </DialogTitle>
//             </Box>
//             <DialogContent style={{ padding: '50px 50px' }}>
//               <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Birth Star"
//                     value={newBirthStar}
//                     onChange={(e) => setNewBirthStar(e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={tamilSeries}
//                     onChange={(e) => setTamilSeries(e.target.value)}
//                     label="Tamil Series"
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={TeluguSeries}
//                     onChange={(e) => setTeluguSeries(e.target.value)}
//                     label="Telugu Series"
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={canadaSeries}
//                     onChange={(e) => SetCanadaSeries(e.target.value)}
//                     label="Canada Series"
//                     fullWidth
//                   />
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions style={{ marginRight: '43px' }}>
//               <Button
//                 style={{
//                   background: '#FFFDFF',
//                   color: 'red',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 }}
//                 onClick={clear_val}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 style={{
//                   background: 'red',
//                   color: 'white',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//                 }}
//                 onClick={handleAddOrUpdateBirthStar}
//                 disabled={!valDis}
//               >
//                 {editStarId ? 'Update' : 'Submit'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//         {deleteConfirmation && (
//           <Dialog
//             open={deleteConfirmation}
//             onClose={() => setDeleteConfirmation(false)}
//           >
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <Typography>
//                 Are you sure you want to delete this birth star?
//               </Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDeleteConfirmation(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={confirmDeleteStar} color="secondary">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Notification />
//       </div>
//     </Container>
//   );
// };

// export default BirthStarList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  TextField,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { BirthStarApi } from '../services/api';
import Notification, { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';

interface BirthStar {
  id: number;
  star: string;
  tamil_series: string;
  telugu_series: string;
  kannada_series: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}
const BirthStarList: React.FC = () => {
  const [birthStars, setBirthStars] = useState<BirthStar[]>([]);
  const [newBirthStar, setNewBirthStar] = useState<string | null>('');
  const [tamilSeries, setTamilSeries] = useState<string | null>('');
  const [teluguSeries, setTeluguSeries] = useState<string | null>('');
  const [kannadaSeries, setKannadaSeries] = useState<string | null>('');
  const [editStarId, setEditStarId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [starToDelete, setStarToDelete] = useState<number | null>(null);

  const valDis = Boolean(
    tamilSeries && teluguSeries && kannadaSeries && newBirthStar,
  );

  const addData = {
    star: newBirthStar,
    tamil_series: tamilSeries,
    telugu_series: teluguSeries,
    kannada_series: kannadaSeries,
  };

  useEffect(() => {
    fetchBirthStars();
  }, []);

  const fetchBirthStars = async () => {
    try {
      const response = await axios.get(BirthStarApi);
      setBirthStars(response.data);
    } catch (error) {
      console.error('Error fetching birth stars:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${BirthStarApi}${id}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
        fetchBirthStars();
      }
    } catch (error) {
      console.error('Error deleting birth star:', error);
    }
  };

  const handleDeleteStar = (id: number) => {
    setStarToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteStar = async () => {
    if (starToDelete !== null) {
      await handleDelete(starToDelete);
      setStarToDelete(null);
      setDeleteConfirmation(false);
      fetchBirthStars();
    }
  };

  const handleAddOrUpdateBirthStar = async () => {
    const starData = addData;
    try {
      let response;
      if (editStarId) {
        response = await axios.put(`${BirthStarApi}${editStarId}/`, starData);
        if (response.status >= 200 || response.status <= 201) {
          notify('Successfully updated');
        }
      } else {
        response = await axios.post(BirthStarApi, starData);
        if (response.status >= 200 || response.status <= 201) {
          notify('Birth Star Added Successfully');
        }
      }
      setNewBirthStar(null);
      setTamilSeries(null);
      setTeluguSeries(null);
      setKannadaSeries(null);
      setEditStarId(null);
      setShowPopup(false);
      fetchBirthStars();
    } catch (error) {
      console.error('Error adding/updating birth star:', error);
    }
  };

  const handleEditStar = (star: BirthStar) => {
    setEditStarId(star.id);
    setNewBirthStar(star.star);
    setTamilSeries(star.tamil_series);
    setTeluguSeries(star.telugu_series);
    setKannadaSeries(star.kannada_series);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditStarId(null);
    setNewBirthStar(null);
    setTamilSeries(null);
    setTeluguSeries(null);
    setKannadaSeries(null);
    setShowPopup(false);
  };

  const columns :ColumnConfig<BirthStar>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'star', headerName: 'Star', sortable: true },
    { field: 'tamil_series', headerName: 'Tamil Series', sortable: true },
    { field: 'telugu_series', headerName: 'Telugu Series', sortable: true },
    { field: 'kannada_series', headerName: 'Kannada Series', sortable: true },
  ];

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '20px',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <Reuse
          data={birthStars}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditStar}
          handleDelete={(id) => handleDeleteStar(Number(id))} 
          setShowPopup={setShowPopup}
          idField="id"
          title="Birt Star List"
        />

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
                  fontSize: '30px',
                }}
              >
                {editStarId ? 'Edit Birth Star' : 'Add Birth Star'}
              </DialogTitle>
            </Box>
            <DialogContent style={{ padding: '50px 50px' }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Birth Star"
                    value={newBirthStar}
                    onChange={(e) => setNewBirthStar(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={tamilSeries}
                    onChange={(e) => setTamilSeries(e.target.value)}
                    label="Tamil Series"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={teluguSeries}
                    onChange={(e) => setTeluguSeries(e.target.value)}
                    label="Telugu Series"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={kannadaSeries}
                    onChange={(e) => setKannadaSeries(e.target.value)}
                    label="Kannada Series"
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
                onClick={clearValues}
              >
                Cancel
              </Button>
              <Button
                style={{
                  background: 'red',
                  color: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                }}
                onClick={handleAddOrUpdateBirthStar}
                disabled={!valDis}
              >
                {editStarId ? 'Update' : 'Submit'}
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {deleteConfirmation && (
          <Dialog
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this birth star?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={confirmDeleteStar} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <Notification />
    </Container>
  );
};

export default BirthStarList;
