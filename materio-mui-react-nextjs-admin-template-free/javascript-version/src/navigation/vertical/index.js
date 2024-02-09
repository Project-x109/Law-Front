// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import { Account } from 'mdi-material-ui'
import { AccountMultiple } from 'mdi-material-ui'
import { CheckboxMarkedCircleMinusOutline } from 'mdi-material-ui'
import { StarFourPointsCircleOutline } from 'mdi-material-ui'
import withAuth from 'src/@core/utils/withAuth'

const navigation = (userRole) => {

  const commonLinks = [
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Issue Related'
    },
    {
      title: 'Add New Issue',
      icon: AccountCogOutline,
      path: '/add-new-issue'
    },
    {
      title: 'Navigate Issues',
      icon: CheckboxMarkedCircleMinusOutline,
      path: '/navigate-issues'
    },
    {
      title: 'Specific Issues',
      icon: StarFourPointsCircleOutline,
      path: '/navigate-specific-issues'
    }

  ];
  if (userRole === 'admin') {
    commonLinks.unshift(
      {
        sectionTitle: 'Admin Pages'
      },
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
      },
      {
        sectionTitle: 'Admin Pages'
      },
      {
        title: 'Deavtivated Accounts',
        icon: Account,
        path: '/deactivated-accounts'
      }

    );
  }
  if (userRole === 'employee') {
    commonLinks.unshift(
      {
        sectionTitle: 'User Pages'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/user-dashboard'
      });
  }

  return commonLinks;
};

export default navigation;
