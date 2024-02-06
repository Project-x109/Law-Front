// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getRecentActivities, getRecentActivity } from 'src/redux/actions/issuections'
import { clearSuccessMessage } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj = {
  pending: { color: 'info' },
  processing: { color: 'error' },
  closed: { color: 'primary' },
  high: { color: 'warning' },
  medium: { color: 'success' },
  low: { color: 'primary' }
}

const DashboardTable = ({ csrfToken, isLoggedIn }) => {
  const { error, activities, loading, successMessage, activity } = useSelector((state) => state.issue);
  const { profiles, userRole } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (profiles?.role === "admin" || userRole === "admin") {
      dispatch(getRecentActivities(csrfToken, isLoggedIn));
    } else {
      dispatch(getRecentActivity(csrfToken, isLoggedIn))
    }

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
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Issue Type</TableCell>
              <TableCell>Issue Region</TableCell>
              <TableCell>Legal Motion</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Issue Level</TableCell>
            </TableRow>
          </TableHead>
          {
            profiles?.role === 'admin' ?
              <TableBody>
                {activities?.map(row => (
                  <TableRow hover key={row.issueId} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.issueType.toUpperCase()}</Typography>
                        <Typography variant='caption'>{"The Issue is Raised By " + row.requestingDepartment.toUpperCase() + ' Department'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.issueRegion.toUpperCase()}</TableCell>
                    <TableCell>{row?.legalMotions?.toUpperCase()}</TableCell>
                    <TableCell>{row?.createdBy?.firstName?.toUpperCase()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusObj[row.status].color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.issueLevel}
                        color={statusObj[row?.issueLevel]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> :
              <TableBody>
                {activity?.map(row => (
                  <TableRow hover key={row.issueId} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.issueType.toUpperCase()}</Typography>
                        <Typography variant='caption'>{"The Issue is Raised By " + row.requestingDepartment.toUpperCase() + ' Department'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.issueRegion.toUpperCase()}</TableCell>
                    <TableCell>{row?.legalMotions?.toUpperCase()}</TableCell>
                    <TableCell>{row?.createdBy?.firstName?.toUpperCase()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusObj[row.status].color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.issueLevel}
                        color={statusObj[row?.issueLevel]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

          }
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
