import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { allDeactivatedUsers, getCsrf, updateStatus } from 'src/redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import { clearSuccessMessage } from 'src/redux/actions/authActions';
import Loader from 'src/@core/utils/loader';
import { getUserStatusColor } from 'src/@core/utils/otherUtils';
import { Chip } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { OpenInNew } from 'mdi-material-ui';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
const DeacivatedUserLists = () => {
  const { csrfToken, error, usersLists, loading, successMessage } = useSelector((state) => state.auth);
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [all, setAll] = useState({
    id: null,
    status: ''
  });
  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf());
    }
    dispatch(allDeactivatedUsers(csrfToken, isLoggedIn));
  }, [dispatch, csrfToken, isLoggedIn]);

  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error]);

  const userLists = usersLists?.map((item) => ({
    id: item?._id,
    username: item?.username,
    firstName: item?.firstName,
    lastName: item?.lastName,
    birthDate: new Date(item?.birthDate).toLocaleString(),
    phoneNumber: item?.phoneNumber,
    status: item?.status
  }));

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'birthDate', headerName: 'Birth Date', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getUserStatusColor(params?.value),
            color: 'white'
          }}
        />
      )
    },
    {
      field: 'changeStatus',
      headerName: 'Update Status',
      flex: 1,
      renderCell: (params) => (
        <div>
          <OpenInNew
            onClick={() => handleStatusChange(params.row.id, params.row.status)}
            color="primary"
          />
        </div>
      )
    }
  ];
  const data = {
    rows: userLists || [],
    columns
  };
  const handleChange = (field) => (value) => {
    setAll({ ...all, [field]: value });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const StatusRadio = ({ status, onChange }) => {
    const handleChange = (event) => {
      onChange(event.target.value);
    };

    return (
      <RadioGroup row value={status} onChange={handleChange}>
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
        <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
      </RadioGroup>
    );
  };
  const handleStatusChange = (id, currentStatus) => {
    setAll({ status: currentStatus, id: id });
    handleOpenModal();
  };
  const handleUpdateStatus = () => {
    dispatch(updateStatus(all, csrfToken, isLoggedIn));
    handleCloseModal();
  };

  useEffect(() => {
    if (error && error?.error && error?.error.length > 0) {
      error?.error.map((singleError, index) => {
        toast.error(singleError);
        return null;
      });
    }
    if (successMessage?.message && !loading) {
      Swal.fire({
        icon: "success",
        title: "User Unblocked Successfully",
        text: successMessage.message,
      });
      setAll({
        id: null,
        status: '',
      })
      dispatch(clearSuccessMessage())
    }
  }, [error, successMessage]);

  return (
    <>
      <ToastContainer />
      {loading ? <Loader /> : null}
      <ToastContainer />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h5">
            <Link href="https://mui.com/components/tables/" target="_blank">
              Deactivated Accounts
            </Link>
          </Typography>
          <Typography variant="body2">Tables display sets of data. They can be fully customized</Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Deactivated Accounts" titleTypographyProps={{ variant: 'h6' }} />
            <DataGrid
              {...data}
              components={{
                Toolbar: GridToolbar
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Change User Status</DialogTitle>
        <DialogContent>
          <StatusRadio status={all.status} onChange={(value) => handleChange('status')(value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeacivatedUserLists;
