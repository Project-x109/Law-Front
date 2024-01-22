// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Swal from 'sweetalert2'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Icons Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getCsrf } from 'src/redux/actions/authActions'
import { registerNewIssues } from 'src/redux/actions/issuections'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateFormIssus } from 'src/@core/utils/validation'
import Loader from 'src/@core/utils/loader'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  // ** States
  const { csrfToken } = useSelector((state) => state.auth)
  const { error, loading, successMessage } = useSelector((state) => state.issue)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    issueType: '',
    issueRegion: '',
    requestingDepartment: '',
    issueRaisedPlace: '',
    issueRaisingOffice: '',
    issueRaisingOfficer: '',
    issueLevel: '',
    legalMotions: '',
    issueRequestDate: null,
    issueStartDate: null,
    issuedDate: null,
    issueOpenDate: null,
    issueDecisionDate: null

  });
  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleDateChange = (field) => (date) => {
    setFormValues({ ...formValues, [field]: date });
  };
  const dateFields = [
    { key: 'issueRequestDate', label: 'Issue Requested Date' },
    { key: 'issueStartDate', label: 'Issue Start Date' },
    { key: 'issuedDate', label: 'Issued Date' },
    { key: 'issueOpenDate', label: 'Issue Open Date' },
    { key: 'issueDecisionDate', label: 'Issue Decision Date' },
  ];
  useEffect(() => {
    if (error) {
      dispatch(getCsrf())
    }
  }, [dispatch, getCsrf()]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormIssus(formValues);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
      return;
    }
    try {
      dispatch(registerNewIssues(formValues, csrfToken, isLoggedIn))
    } catch (error) {
      toast.error('An error occurred during form submission.');
    }

  };
  useEffect(() => {
    if (error) {
      toast.error(error?.error)
    }
    if (successMessage?.message && !loading) {
      Swal.fire({
        icon: "success",
        title: "Registerd Successfully",
        text: successMessage.message,
      });
      setFormValues({
        issueType: '',
        issueRegion: '',
        requestingDepartment: '',
        issueRaisedPlace: '',
        issueRaisingOffice: '',
        issueRaisingOfficer: '',
        issueLevel: '',
        legalMotions: '',
        issueRequestDate: null,
        issueStartDate: null,
        issuedDate: null,
        issueOpenDate: null,
        issueDecisionDate: null
      });
    }
  }, [error, successMessage]);

  return (
    <Card>
      <ToastContainer />
      <CardHeader title='Add New Issues' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={handleSubmit}>
        {loading ? <Loader /> : null}
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Issue Type</InputLabel>
                <Select
                  label='issueType'
                  defaultValue=''
                  value={formValues.issueType}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('issueType')}
                >
                  <MenuItem value='civil'>Civil</MenuItem>
                  <MenuItem value='criminal'>Criminal</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Issue Raised Region</InputLabel>
                <Select
                  label='issueRegion'
                  defaultValue=''
                  value={formValues.issueRegion}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('issueRegion')}
                >
                  <MenuItem value='addis-ababa'>Addis Ababa</MenuItem>
                  <MenuItem value='oromia'>Oromia</MenuItem>
                  <MenuItem value='amhara'>Amhara</MenuItem>
                  <MenuItem value='tigray'>Tigray</MenuItem>
                  <MenuItem value='sidama'>Sidama</MenuItem>
                  <MenuItem value='snnpr'>Southern Nations, Nationalities, and Peoples' Region</MenuItem>
                  <MenuItem value='afar'>Afar</MenuItem>
                  <MenuItem value='somali'>Somali</MenuItem>
                  <MenuItem value='benishangul-gumuz'>Benishangul-Gumuz</MenuItem>
                  <MenuItem value='gambela'>Gambela</MenuItem>
                  <MenuItem value='harari'>Harari</MenuItem>
                  <MenuItem value='dire-dawa'>Dire Dawa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Requesting Department</InputLabel>
                <Select
                  label='requestingDepartment'
                  defaultValue=''
                  value={formValues.requestingDepartment}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('requestingDepartment')}
                >
                  <MenuItem value='humanresource'>Human Resource</MenuItem>
                  <MenuItem value='finance'>Finance</MenuItem>
                  <MenuItem value='it'>Information Technology</MenuItem>
                  <MenuItem value='marketing'>Marketing</MenuItem>
                  <MenuItem value='operations'>Operations</MenuItem>
                  <MenuItem value='sales'>Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Issue Raised Place' value={formValues.issueRaisedPlace} onChange={handleChange('issueRaisedPlace')} placeholder='Addis Ababa' />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Issue Raising Office</InputLabel>
                <Select
                  label='Issue Raising Office'
                  defaultValue=''
                  value={formValues.issueRaisingOffice}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('issueRaisingOffice')}
                >
                  <MenuItem value='high-court'>High Court</MenuItem>
                  <MenuItem value='first-instance'>First Instance</MenuItem>
                  <MenuItem value='supreme-court'>Supreme Court</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Issue Level</InputLabel>
                <Select
                  label='Issue Level'
                  value={formValues.issueLevel}
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('issueLevel')}
                >
                  <MenuItem value='high'>High</MenuItem>
                  <MenuItem value='low'>Low</MenuItem>
                  <MenuItem value='medium'>Medium</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Issue Raising Officer' value={formValues.issueRaisingOfficer} onChange={handleChange('issueRaisingOfficer')} placeholder='Amanuel' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Legal Motions</InputLabel>
                <Select
                  label='Motions'
                  defaultValue=''
                  value={formValues.legalMotions}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={handleChange('legalMotions')}
                >
                  <MenuItem value='complaint'>Complaint/Petition</MenuItem>
                  <MenuItem value='answer'>Answer/Response</MenuItem>
                  <MenuItem value='counterclaim'>Counterclaim/Counterpetition</MenuItem>
                  <MenuItem value='motion'>Motion</MenuItem>
                  <MenuItem value='discovery'>Discovery Requests</MenuItem>
                  <MenuItem value='subpoena'>Subpoena</MenuItem>
                  <MenuItem value='habeas-corpus'>Writ of Habeas Corpus</MenuItem>
                  <MenuItem value='injunction'>Injunction</MenuItem>
                  <MenuItem value='settlement-agreement'>Settlement Agreement</MenuItem>
                  <MenuItem value='affidavit'>Affidavit</MenuItem>
                  <MenuItem value='notice-of-appeal'>Notice of Appeal</MenuItem>
                  <MenuItem value='stipulation'>Stipulation</MenuItem>
                  <MenuItem value='brief'>Brief</MenuItem>
                  <MenuItem value='judgment'>Judgment</MenuItem>
                  <MenuItem value='plea-bargain'>Plea Bargain Agreement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Dates
              </Typography>
            </Grid>

            {dateFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.key}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={formValues[field.key]}
                    showYearDropdown
                    showMonthDropdown
                    placeholderText='MM-DD-YYYY'
                    customInput={<CustomInput label={field.label} />}
                    id={`form-layouts-separator-date-${field.key}`}
                    onChange={(date) => handleDateChange(field.key)(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                </DatePickerWrapper>
              </Grid>
            ))}

          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
