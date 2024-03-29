// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useEffect } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useSelector } from "react-redux";
import { profile } from 'src/redux/actions/authActions'
import { getCsrf } from 'src/redux/actions/authActions'
import { useDispatch } from 'react-redux'

const UserLayout = ({ children }) => {
  // ** Hooks
  const { profiles, csrfToken, userRole } = useSelector((state) => state.auth)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
  const dispatch = useDispatch();
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  useEffect(() => {
    if (!csrfToken) {
      dispatch(getCsrf())
    }
  }, [dispatch,csrfToken]);
  useEffect(() => {
    if (csrfToken && isLoggedIn) {
      dispatch(profile(csrfToken, isLoggedIn));
    }
  }, [dispatch, csrfToken, isLoggedIn, profile]);



  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          <img width={230} alt='upgrade to premium' src={`/images/misc/upgrade-banner-${settings.mode}.png`} />
        </a>
      </Box>
    )
  }

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems(profiles ? profiles?.role : userRole)} // Navigation Items
      //afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      <UpgradeToProButton />
    </VerticalLayout>
  )
}

export default UserLayout
