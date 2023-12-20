// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { Account } from 'mdi-material-ui'
import { AccountMultiple } from 'mdi-material-ui'



const navigation = (userRole) => {

  const commonLinks = [
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ];
  if (userRole === 'admin') {
    commonLinks.unshift(
      {
        title: 'Admin Dashboard',
        icon: HomeOutline,
        path: '/admin-dashboard'
      },
      {
        sectionTitle: 'User Interface'
      },
      {
        title: 'User Registration',
        icon: Account,
        path: '/user-registraion'
      },
      {
        title: 'User Lists',
        icon: AccountMultiple,
        path: '/lists-of-users'
      }

    );
  }
  if (userRole === 'employee') {
    commonLinks.unshift({
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    });
  }

  return commonLinks;
};

export default navigation;
