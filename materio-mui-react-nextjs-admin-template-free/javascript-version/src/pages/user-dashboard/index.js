// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCsrf, clearSuccessMessage } from 'src/redux/actions/authActions'
import { getIssueLevelCounts } from 'src/redux/actions/issuections'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from 'src/@core/utils/withAuth'
const Dashboard = () => {
  const { csrfToken } = useSelector((state) => state.issue);
  const { issueLevelCount, error, successMessage } = useSelector((state) => state.issue);
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;

  const dispatch = useDispatch()

  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf());
    }
    dispatch(getIssueLevelCounts(csrfToken, isLoggedIn))
  }, [dispatch, csrfToken, isLoggedIn]);

  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
    dispatch(clearSuccessMessage())
  }, [error, successMessage, dispatch]);

  return (
    <ApexChartWrapper>
      <ToastContainer />
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={issueLevelCount?.high}
                icon={<Poll />}
                color='success'
                trendNumber='issues'
                title='High Level'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={issueLevelCount?.low}
                title='Low Level'
                trend='negative'
                color='secondary'
                trendNumber='issues'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={issueLevelCount?.medium}
                title='Medium Level'
                trend='negative'
                trendNumber='issues'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={issueLevelCount?.high + issueLevelCount?.medium + issueLevelCount?.low}
                color='warning'
                trend='negative'
                trendNumber='issues'
                subtitle='Last Week'
                title='Total'
                icon={<HelpCircleOutline />}
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={12}>
          <Table csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard, ['employee'])
