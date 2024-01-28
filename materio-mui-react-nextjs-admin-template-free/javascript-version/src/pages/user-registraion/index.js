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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Swal from 'sweetalert2'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { registerEmployee, getCsrf } from 'src/redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateForm } from 'src/@core/utils/validation'
import Loader from 'src/@core/utils/loader'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  // ** States
  const { csrfToken, error, loading, successMessage } = useSelector((state) => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: '',
    ConfirmPassword: '',
    showPassword: false,
    showPassword2: false
  })
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    ConfirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    phoneNo: '',
  });

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, dateOfBirth: date });
  };
  useEffect(() => {
    if (error) {
      dispatch(getCsrf())
    }
  }, [dispatch, getCsrf()]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
      return;
    }
    try {
      dispatch(registerEmployee(formValues, csrfToken, isLoggedIn))
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
    if (successMessage?.message && !loading) {
      Swal.fire({
        icon: "success",
        title: "User Register Successfully",
        text: successMessage.message,
      });
      setFormValues({
        username: '',
        password: '',
        ConfirmPassword: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        phoneNo: '',
      })
      setValues({
        password: '',
        ConfirmPassword: ''
      })
    }
  }, [error, successMessage]);
  console.log(error)
  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    handleChange(prop)(event);
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    handleChange(prop)(event);
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }




  return (
    <Card>
      <ToastContainer />
      <CardHeader title='User Registration Form' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={handleSubmit}>
        {loading ? <Loader /> : null}
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='email' label='User Name' value={formValues.username} onChange={handleChange('username')} placeholder='carterleonard@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='form-layouts-separator-password'
                  onChange={handlePasswordChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                <OutlinedInput
                  value={values.ConfirmPassword}
                  label='Confirm Password'
                  id='form-layouts-separator-password-2'
                  onChange={handleConfirmChange('ConfirmPassword')}
                  type={values.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Personal Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='First Name' value={formValues.firstName} onChange={handleChange('firstName')} placeholder='Leonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Last Name' value={formValues.lastName} onChange={handleChange('lastName')} placeholder='Carter' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={formValues.dateOfBirth}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  id='form-layouts-separator-date'
                  onChange={date => handleDateChange(date)}
                />
              </DatePickerWrapper>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Phone No.' value={formValues.phoneNo} onChange={handleChange('phoneNo')} placeholder='+1-123-456-8790' />
            </Grid>
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
