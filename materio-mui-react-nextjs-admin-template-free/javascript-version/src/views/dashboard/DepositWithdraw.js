// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUserPerformances } from 'src/redux/actions/issuections'
import { clearSuccessMessage } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRandomColor } from 'src/@core/utils/otherUtils'

// Styled Divider component
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const DepositWithdraw = ({ csrfToken, isLoggedIn }) => {
  const { error, successMessage, userPerformances } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserPerformances(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error, successMessage, userPerformances]);
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <ToastContainer />
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Issues/Resolution Time'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {userPerformances?.slice(0, 5)?.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== userPerformances.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      marginRight: 3,
                      fontSize: '1rem',
                      color: 'common.white',
                      backgroundColor: `${getRandomColor()}.main`
                    }}
                  >
                    {item?.initials}
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.firstName + " " + item.lastName}</Typography>

                    </Box>
                    <Typography variant='caption'>{"Number of Issues " + item.numberOfResolvedIssues}</Typography>
                  </Box>
                  <Box variant='subtitle2' sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', fontWeight: "600", color: "success.main", lineHeight: 1.72, letterSpacing: '0.22px' }}>
                      {item?.averageResolutionTime + " Days"}
                    </Typography>
                    <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                      {"Resolution Time"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Average Resolution Time'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {userPerformances?.slice(6, 10)?.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== userPerformances.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      marginRight: 3,
                      fontSize: '1rem',
                      color: 'common.white',
                      backgroundColor: `${getRandomColor()}.main`
                    }}
                  >
                    {item?.initials}
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.firstName + " " + item.lastName}</Typography>

                    </Box>
                    <Typography variant='caption'>{"Number of Issues " + item.numberOfResolvedIssues}</Typography>
                  </Box>
                  <Box variant='subtitle2' sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', fontWeight: "600", color: "success.main", lineHeight: 1.72, letterSpacing: '0.22px' }}>
                      {item?.averageResolutionTime + " Days"}
                    </Typography>
                    <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                      {"Resolution Time"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
    </Card>
  )
}

export default DepositWithdraw
