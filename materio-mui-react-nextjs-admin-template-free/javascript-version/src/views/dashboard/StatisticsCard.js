// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { Handshake, ProgressClock, Loading, ArrowAll, DotsVertical } from 'mdi-material-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserDashboardSummary, getDashboardSummary } from 'src/redux/actions/issuections'
import { clearSuccessMessage } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const statusObj = {
  pending: { color: 'error', icon: <ProgressClock sx={{ fontSize: '1.75rem' }} />, label: "Pending" },
  processing: { color: 'info', icon: <Loading sx={{ fontSize: '1.75rem' }} />, label: "Processing" },
  closed: { color: 'primary', icon: <Handshake sx={{ fontSize: '1.75rem' }} />, label: "Closed" },
  other: { color: 'success', icon: <Handshake sx={{ fontSize: '1.75rem' }} />, label: "Closed" }
}
const StatisticsCard = ({ csrfToken, isLoggedIn }) => {
  const { error, adminSummery, loading, successMessage, userSummery } = useSelector((state) => state.issue);
  const { user, userRole } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.role === "admin" || userRole === "admin") {
      dispatch(getDashboardSummary(csrfToken, isLoggedIn));
    } else {
      dispatch(getUserDashboardSummary(csrfToken, isLoggedIn))
    }

  }, [dispatch, csrfToken, isLoggedIn, user?.role]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error, successMessage]);
  const renderStats = () => {
    if (user?.role === "employee" || userRole === "employee") {
      if (!userSummery || !userSummery.issuesByStatus) {
        return null;
      }

      return userSummery.issuesByStatus.map((statusItem, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: `${statusObj[statusItem._id ? statusItem._id : 'other'].color}.main`
              }}
            >
              {statusObj[statusItem._id ? statusItem._id : 'other'].icon}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>{statusItem?._id?.toUpperCase() || 'Others'}</Typography>
              <Typography variant='h6'>{statusItem?.count + " Issue"}</Typography>
            </Box>
          </Box>
        </Grid>
      ));
    } else {
      if (!adminSummery || !adminSummery.issuesByStatus) {
        return null;
      }

      return adminSummery.issuesByStatus.map((statusItem, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: `${statusObj[statusItem._id ? statusItem._id : 'other'].color}.main`
              }}
            >
              {statusObj[statusItem._id ? statusItem._id : 'other'].icon}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>{statusItem?._id?.toUpperCase() || 'Others'}</Typography>
              <Typography variant='h6'>{statusItem?.count + " Issue"}</Typography>
            </Box>
          </Box>
        </Grid>
      ));
    }
  };

  return (
    <Card>
      <ToastContainer />
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Average Resolution Time
            </Box>{' '}
            {user?.role === "admin" ? adminSummery?.averageResolutionTime : userSummery?.averageResolutionTime}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
          <Grid item xs={12} sm={3} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'success.main'
                }}
              >
                <ArrowAll sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>{"TOTAL"}</Typography>
                {
                  user?.role === "admin" ?
                    <Typography variant='h6'>{adminSummery?.totalIssues + " Issue"}</Typography> :
                    <Typography variant='h6'>{userSummery?.totalIssues + " Issue"}</Typography>
                }
              </Box>
            </Box>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default StatisticsCard
