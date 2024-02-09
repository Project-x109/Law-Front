// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import { Comment, Information, Details } from 'mdi-material-ui'

// ** Demo Tabs Imports
import TabIssue from 'src/views/issue-details/TabIssue'
import IssueInfo from 'src/views/issue-details/IssueInfo'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import withAuth from 'src/@core/utils/withAuth'


const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const IssueDetails = () => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Information />
                <TabName>Basic-Information</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Details />
                <TabName>Details</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Comment />
                <TabName>Comments</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabIssue />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <IssueInfo />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default withAuth(IssueDetails, ['admin','employee'])
