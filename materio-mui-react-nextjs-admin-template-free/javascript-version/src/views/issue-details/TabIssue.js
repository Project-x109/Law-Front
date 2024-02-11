// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { getCsrf } from 'src/redux/actions/authActions'
import { getIndividualIssue, updateIssue } from 'src/redux/actions/issuections'
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'src/@core/utils/loader'
import Divider from '@mui/material/Divider'
import { clearSuccessMessage } from 'src/redux/actions/authActions'

// ** Icons Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Swal from 'sweetalert2'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validateFormIssus } from 'src/@core/utils/validation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const TabIssue = () => {
  // ** State
  const router = useRouter()
  const dispatch = useDispatch();
  const { error, issue, loading, successMessage } = useSelector((state) => state.issue)
  const { csrfToken } = useSelector((state) => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const [values, setValues] = useState({ issueId: '' });
  const [visibility, setVisibility] = useState(false);
  const [createdBy, setCreatedBy] = useState('');
  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf());
    }
    dispatch(getIndividualIssue(csrfToken, isLoggedIn, values?.issueId));
  }, [dispatch, csrfToken, isLoggedIn, values.issueId, getCsrf]);
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setValues({ ...values, issueId: id });
    }
  }, [router.query]);
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
  useEffect(() => {
    setCreatedBy(`${issue?.createdBy?.firstName} ${issue?.createdBy?.lastName}` || '');
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      issueType: (issue?.issueType || ''),
      issueRegion: (issue?.issueRegion || ''),
      requestingDepartment: (issue?.requestingDepartment || ''),
      issueRaisedPlace: (issue?.issueRaisedPlace || ''),
      issueRaisingOffice: (issue?.issueRaisedOffice || ''),
      issueRaisingOfficer: (issue?.issuedOfficer || ''),
      issueLevel: (issue?.issueLevel || ''),
      legalMotions: (issue?.legalMotions || ''),
      issueRequestDate: new Date(issue?.issueRequestDate || null),
      issueStartDate: new Date(issue?.issueStartDate || null),
      issuedDate: new Date(issue?.issuedDate || null),
      issueOpenDate: new Date(issue?.issueOpenDate || null),
      issueDecisionDate: new Date(issue?.issueDecisionDate || null),
    }));
  }, [issue]);
  const handleChangeFormValues = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };
  const handleDateChange = (key) => (date) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [key]: date,
    }));
  };

  const handleVisibility = () => {
    setVisibility(!visibility)
  }
  const dateFields = [
    { key: 'issueRequestDate', label: 'Issue Requested Date' },
    { key: 'issueStartDate', label: 'Issue Start Date' },
    { key: 'issuedDate', label: 'Issued Date' },
    { key: 'issueOpenDate', label: 'Issue Open Date' },
    { key: 'issueDecisionDate', label: 'Issue Decision Date' },
  ];

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
      dispatch(updateIssue(csrfToken, isLoggedIn, values?.issueId, formValues))
    } catch (error) {
      toast.error('An error occurred during form submission.');
    }

  };

  useEffect(() => {
    if (error && error?.error && error?.error.length > 0) {
      error?.error.map((singleError, index) => {
        toast.error(singleError);
        return null;
      });
    }
    if (successMessage?.message) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: successMessage.message,
      });
      dispatch(clearSuccessMessage())
    }
  }, [error, successMessage]);

  return (
    <CardContent>
      <ToastContainer />
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              1. Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Issue Type</InputLabel>
              <Select
                readOnly={!visibility}
                label='Issue Type'
                value={formValues?.issueType}
                onChange={(e) => {
                  handleChangeFormValues('issueType')(e);
                }}

              >
                <MenuItem value={formValues.issueType}>{formValues.issueType}</MenuItem>
                <MenuItem value='criminal'>Criminal</MenuItem>
                <MenuItem value='civil'>Civil</MenuItem>
                <MenuItem value='other'>Other</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Issue Raised Region</InputLabel>
              <Select
                label='Issue Region'
                defaultValue=''
                readOnly={!visibility}
                value={formValues?.issueRegion}
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                onChange={(e) => {
                  handleChangeFormValues('issueRegion')(e);
                }}
              >
                <MenuItem value={formValues?.issueRegion}>{formValues?.issueRegion}</MenuItem>
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
                label='Requesting Department'
                defaultValue=''
                readOnly={!visibility}
                value={formValues.requestingDepartment}
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                onChange={(e) => {
                  handleChangeFormValues('requestingDepartment')(e);
                }}
              >
                <MenuItem value={formValues.requestingDepartment}>{formValues.requestingDepartment}</MenuItem>
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
            <TextField
              fullWidth
              readOnly={!visibility}
              label='Issue Raised Place'
              value={formValues.issueRaisedPlace}
              onChange={(e) => {
                handleChangeFormValues('issueRaisedPlace')(e);
              }}
              placeholder='Addis Ababa' />
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
            <TextField fullWidth onChange={(e) => { handleChangeFormValues('issueRaisingOffice')(e) }} readOnly={!visibility} label='Issue Raising Office' value={formValues.issueRaisingOffice} defaultValue='ABC Pvt. Ltd.' />
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Issue Level</InputLabel>
              <Select
                label='Issue Level'
                readOnly={!visibility}
                value={formValues.issueLevel}
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                onChange={(e) => {
                  handleChangeFormValues('issueLevel')(e);
                }}
              >
                <MenuItem value={formValues.issueLevel}>{formValues.issueLevel}</MenuItem>
                <MenuItem value='high'>High</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Issue Raising Officer' onChange={(e) => { handleChangeFormValues('issueRaisingOfficer')(e) }} readOnly value={formValues.issueRaisingOfficer} defaultValue='ABC Pvt. Ltd.' />
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Legal Motions</InputLabel>
              <Select
                label='Motions'
                defaultValue=''
                readOnly={!visibility}
                value={formValues.legalMotions}
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                onChange={(e) => {
                  handleChangeFormValues('legalMotions')(e);
                }}
              >
                <MenuItem value={formValues.legalMotions}>{formValues.legalMotions}</MenuItem>
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
                  readOnly={!visibility}
                  showYearDropdown
                  showMonthDropdown
                  customInput={<CustomInput label={field.label} />}
                  id={`form-layouts-separator-date-${field.key}`}
                  onChange={(date) => handleDateChange(field.key)(date)}

                />
              </DatePickerWrapper>
            </Grid>
          ))}


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Created by' readOnly value={createdBy} defaultValue='ABC Pvt. Ltd.' />
          </Grid>
          <Grid item xs={12}>

            {
              visibility ?
                <Button
                  onClick={(e) => {
                    handleVisibility(e);
                  }}
                  variant='contained' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button> :

                <Button
                  type='submit'
                  onClick={(e) => {
                    handleVisibility(e);
                  }}
                  variant='contained' sx={{ marginRight: 3.5 }}>
                  Update
                </Button>
            }
            <Button onClick={handleVisibility} type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabIssue
