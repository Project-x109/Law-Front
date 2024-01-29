import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { allUsers, getCsrf } from 'src/redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import { clearSuccessMessage } from 'src/redux/actions/authActions';
import Loader from 'src/@core/utils/loader';
import { getUserStatusColor } from 'src/@core/utils/otherUtils';
import { Chip } from '@mui/material';
const UserLists = () => {
  const { csrfToken, error, usersLists, loading } = useSelector((state) => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf())
    }
    dispatch(allUsers(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error)
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
  }))
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
            color: 'white',
          }}
        />
      )

    },
  ];

  const data = {
    rows: userLists || [],
    columns,
  };
  return (
    <>
      <ToastContainer />
      {loading ? <Loader /> : null}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Lists of Users
            </Link>
          </Typography>
          <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
            <DataGrid
              {...data}
              components={{
                Toolbar: GridToolbar
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserLists
