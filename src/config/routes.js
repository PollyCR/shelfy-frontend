import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import WelcomeContainer from '../containers/WelcomeContainer'
import DashboardContainer from '../containers/DashboardContainer'



export const routes = [
  {
    title: 'Welcome to Shelfy!',
    path: '/welcome',
    component: WelcomeContainer
  },
  {
    title: 'Log in',
    path: '/login',
    component: LoginForm
  },
  {
    title: 'Sign up',
    path: '/signup',
    component: SignupForm
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    component: DashboardContainer
  },
  {
    title: 'Log out',
    path: '/logout',
    component: props => {
      props.logout()

      return null
    }
  }
]