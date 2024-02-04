// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'


import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDepartmentWiseAnalysis } from 'src/redux/actions/issuections'
import { clearSuccessMessage } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRandomColor } from 'src/@core/utils/otherUtils'
const TotalEarning = ({ csrfToken, isLoggedIn }) => {
  const { error, successMessage, departementAnalysis } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartmentWiseAnalysis(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error, successMessage]);
  return (
    <Card>
      <ToastContainer />
      <CardHeader
        title='5 Issue Raising Department'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {departementAnalysis?.map((item, index) => {
          return (
            <Box
              key={item._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== departementAnalysis.length - 1 ? { mb: 5.875 } : {})
              }}
            >
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
                {'NA'}
              </Avatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>


                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {item?._id.toUpperCase()}

                  </Typography>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    {"Raising Department "}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>{item?.totalIssues + " Issues"}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
