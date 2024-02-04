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

const depositData = [
  {
    logoWidth: 28,
    logoHeight: 29,
    amount: '+$4,650',
    subtitle: 'Sell UI Kit',
    title: 'Gumroad Account',
    logo: '/images/logos/gumroad.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    amount: '+$92,705',
    title: 'Mastercard',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/mastercard-label.png'
  },
  {
    logoWidth: 20,
    logoHeight: 28,
    amount: '+$957',
    title: 'Stripe Account',
    subtitle: 'iOS Application',
    logo: '/images/logos/stripe.png'
  },
  {
    logoWidth: 34,
    logoHeight: 32,
    amount: '+$6,837',
    title: 'American Bank',
    subtitle: 'Bank Transfer',
    logo: '/images/logos/american-bank.png'
  },
  {
    logoWidth: 33,
    logoHeight: 22,
    amount: '+$446',
    title: 'Bank Account',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/citi-bank.png'
  }
]

const withdrawData = [
  {
    logoWidth: 29,
    logoHeight: 30,
    amount: '-$145',
    title: 'Google Adsense',
    subtitle: 'Paypal deposit',
    logo: '/images/logos/google.png'
  },
  {
    logoWidth: 34,
    logoHeight: 34,
    amount: '-$1870',
    title: 'Github Enterprise',
    logo: '/images/logos/github.png',
    subtitle: 'Security & compliance'
  },
  {
    logoWidth: 30,
    logoHeight: 30,
    amount: '-$450',
    title: 'Upgrade Slack Plan',
    subtitle: 'Debit card deposit',
    logo: '/images/logos/slack.png'
  },
  {
    logoWidth: 30,
    logoHeight: 30,
    amount: '-$540',
    title: 'Digital Ocean',
    subtitle: 'Cloud Hosting',
    logo: '/images/logos/digital-ocean.png'
  },
  {
    logoWidth: 36,
    logoHeight: 21,
    amount: '-$21',
    title: 'AWS Account',
    logo: '/images/logos/aws.png',
    subtitle: 'Choosing a Cloud Platform'
  }
]

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
  }, [error, successMessage]);
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
