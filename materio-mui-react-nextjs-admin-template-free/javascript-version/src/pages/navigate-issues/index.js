import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getCsrf } from 'src/redux/actions/authActions';
import { getAllIssues } from 'src/redux/actions/issuections';
import { ToastContainer, toast } from 'react-toastify';
import { Chip } from '@mui/material';
import { getStatusColor, getLevelColor } from 'src/@core/utils/otherUtils';
import { OpenInNew } from 'mdi-material-ui';
import withAuth from 'src/@core/utils/withAuth'
const UserLists = () => {
  const { error, issues } = useSelector((state) => state.issue)
  const { csrfToken } = useSelector((state) => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf())
    }
    dispatch(getAllIssues(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error)
    }
  }, [error]);
  const issue = issues?.reverse()?.map((item) => ({
    id: item?._id,
    requestingDepartment: item?.requestingDepartment?.toUpperCase(),
    issuedDate: new Date(item?.issuedDate)?.toLocaleDateString(),
    issueType: item?.issueType?.toUpperCase(),
    issueStartDate: new Date(item?.issueStartDate)?.toLocaleDateString(),
    issueRequestDate: new Date(item?.issueRequestDate)?.toLocaleDateString(),
    issueRegion: item?.issueRegion?.toUpperCase(),
    issueRaisedPlace: item?.issueRaisedPlace?.toUpperCase(),
    issueOpenDate: new Date(item?.issueOpenDate)?.toLocaleDateString(),
    issueLevel: item?.issueLevel?.toUpperCase(),
    issueDecisionDate: new Date(item?.issueDecisionDate)?.toLocaleDateString(),
    status: item?.status?.toUpperCase(),
    createdBy: (item?.createdBy?.firstName)?.toUpperCase(),
  }))
  const columns = [
    { field: 'requestingDepartment', headerName: 'Department', flex: 100 },
    { field: 'issuedDate', headerName: 'Issued Date', flex: 100 },
    { field: 'issueType', headerName: 'Issue Type', flex: 100 },
    { field: 'issueStartDate', headerName: 'Issue Start Date', flex: 100 },
    { field: 'issueRequestDate', headerName: 'Issue Requested Date', flex: 100 },
    { field: 'issueRegion', headerName: 'Issue Region', flex: 100 },
    { field: 'issueRaisedPlace', headerName: 'Issue Raised Place', flex: 100 },
    { field: 'issueOpenDate', headerName: 'Issue Open Date', flex: 100 },
    {
      field: 'issueLevel',
      headerName: 'Issue Level',
      flex: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getLevelColor(params.value),
            color: 'white',
          }}
        />
      )
    },
    { field: 'issueDecisionDate', headerName: 'Issue Decision Date', flex: 100 },
    {
      field: 'status',
      headerName: 'status',
      flex: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getStatusColor(params?.value),
            color: 'white',
          }}
        />
      )
    },
    { field: 'createdBy', headerName: 'CreatedBy', flex: 100 },
    {
      field: 'details',
      headerName: 'See Detail',
      flex: 100,
      renderCell: (params) => <OpenInNew
        style={{ cursor: "pointer", color: "#9155FD" }}
        onClick={() => handleOpenInNew(params?.row?.id)}


      />,
    },
  ];
  const data = {
    rows: issue || [],
    columns,
  };
  const handleOpenInNew = (id) => {
    const url = `/issue-details?id=${id}`;
    window.open(url, '_blank');
  };
  return (
    <>
      <ToastContainer />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Lists of Issues
            </Link>
          </Typography>
          <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Lists of All Issues' titleTypographyProps={{ variant: 'h6' }} />
            <DataGrid
              {...data}
              components={{
                Toolbar: GridToolbar,
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

export default withAuth(UserLists, ['admin', 'employee'])
