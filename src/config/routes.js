import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import WelcomeContainer from '../containers/WelcomeContainer'
import DashboardContainer from '../containers/DashboardContainer'
import amRoutineContainer from '../containers/amRoutineContainer'
import pmRoutineContainer from '../containers/pmRoutineContainer'
import treatmentRoutineContainer from '../containers/treatmentRoutineContainer'



export const routes = [
  {title: 'Morning Routine',
  path: "/am",
  component: amRoutineContainer
},

{title: 'Evening Routine',
path: "/pm",
component: pmRoutineContainer
},

{title: 'Treatment Routine',
path: "/treatment",
component: treatmentRoutineContainer
},
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