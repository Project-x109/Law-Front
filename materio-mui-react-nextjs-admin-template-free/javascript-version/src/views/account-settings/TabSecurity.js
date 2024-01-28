// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

import { changeOldPassword, getCsrf, clearSuccessMessage } from 'src/redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'src/@core/utils/loader'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

const TabSecurity = () => {
  const dispatch = useDispatch()
  const { error, successMessage, loading, csrfToken } = useSelector(state => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  // ** States
  const [values, setValues] = useState({
    password: '',
    currentPassword: '',
    showpassword: false,
    confirmPassword: '',
    showCurrentPassword: false,
    showconfirmPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handlepasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowpassword = () => {
    setValues({ ...values, showpassword: !values.showpassword })
  }

  const handleMouseDownpassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleconfirmPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowconfirmPassword = () => {
    setValues({ ...values, showconfirmPassword: !values.showconfirmPassword })
  }

  const handleMouseDownconfirmPassword = event => {
    event.preventDefault()
  }

  useEffect(() => {
    if (error) {
      dispatch(getCsrf())
    }
  }, [dispatch, getCsrf()])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.password || !values.confirmPassword || !values.currentPassword) {
      toast.error("All fields are Required");
      return;
    }
    if (values.currentPassword === values.password) {
      toast.error("Old Password and New Password Can not be the same");
      return;
    }
    if (values.password.length < 8) {
      toast.warning("Password should be Eight digits or above");
      return;
    }
    if (values.confirmPassword !== values.password) {
      toast.error("Confirm password and Password should match");
      return;
    }

    try {
      dispatch(changeOldPassword(values, csrfToken, isLoggedIn))
      setValues({
        password: '',
        currentPassword: '',
        showpassword: false,
        confirmPassword: '',
        showCurrentPassword: false,
        showconfirmPassword: false
      })

    } catch (error) {
      toast.error('An error occurred during form submission.');
    }
  }
  useEffect(() => {
    if (error && error?.error && error?.error.length > 0) {
      error?.error.map((singleError, index) => {
        toast.error(singleError);
        return null;
      });
    }
    if (successMessage && !loading) {
      Swal.fire({
        icon: "success",
        title: "Password Changed Successfully",
        text: successMessage.message,
      });
      dispatch(clearSuccessMessage())
    }
  }, [error, successMessage, loading, dispatch]);
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      {loading ? <Loader /> : null}
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.password}
                    id='account-settings-new-password'
                    onChange={handlepasswordChange('password')}
                    type={values.showpassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowpassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownpassword}
                        >
                          {values.showpassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showconfirmPassword ? 'text' : 'password'}
                    onChange={handleconfirmPasswordChange('confirmPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowconfirmPassword}
                          onMouseDown={handleMouseDownconfirmPassword}
                        >
                          {values.showconfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', password: '', confirmPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
