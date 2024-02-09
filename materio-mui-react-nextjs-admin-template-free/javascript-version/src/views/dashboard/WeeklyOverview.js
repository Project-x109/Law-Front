// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getWeeklyReview } from 'src/redux/actions/issuections'
import { clearSuccessMessage } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeeklyOverview = ({ csrfToken, isLoggedIn }) => {
  // ** Hook
  const { error, successMessage, weeklyReview } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeeklyReview(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);
  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error, successMessage]);
  const theme = useTheme()
  const chartData = {
    labels: weeklyReview ? Object.keys(weeklyReview) : [],
    series: [{ data: weeklyReview ? Object.values(weeklyReview) : [] }]
  };
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '20%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: chartData.labels.map(label => {
      switch (label) {
        case "pending":
          return theme.palette.warning.light;
        case "processing":
          return theme.palette.info.dark;
        case "closed":
          return theme.palette.success.main;
        default: return theme.palette.error.main;
      }
    }),
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: chartData?.labels?.map((lable) => lable.toUpperCase()),
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }
  const closingPerformance = weeklyReview?.closed ? (" " + (((weeklyReview?.closed / (weeklyReview?.closed + weeklyReview?.processing + weeklyReview?.pending))).toFixed(2) * 100) + "%") : " " + 0 + "%"

  return (
    <Card>
      <ToastContainer />
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={chartData?.series} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            {closingPerformance}
          </Typography>

          <Typography variant='body2'>Your issue closing performance is
            {closingPerformance}
          </Typography>
        </Box>
        <Button fullWidth variant='contained'>
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
