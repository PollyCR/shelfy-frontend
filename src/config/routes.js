import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import WelcomeContainer from "../containers/WelcomeContainer";
import DashboardContainer from "../containers/DashboardContainer";
import AMRoutineContainer from "../containers/amRoutineContainer";
import pmRoutineContainer from "../containers/pmRoutineContainer";
import TreatmentRoutineContainer from "../containers/treatmentRoutineContainer";
import SkinDiaryContainer from "../containers/SkinDiaryContainer";
import brandsContainer from "../containers/brandsContainer";
import ShoppingListContainer from "../containers/ShoppingListContainer";
import AddProductContainer from '../containers/AddProductContainer'
import addBrandProductContainer from '../containers/AddBrandProductContainer'

export const routes = [
  { title: "Add to routine", path: "/brands/add", component: addBrandProductContainer },
  { title: "Skin diary", path: "/diary", component: SkinDiaryContainer },
  { title: "List", path: "/list", component: ShoppingListContainer },
  { title: "Brands you ♥️", path: "/brands", component: brandsContainer },
  { title: "Morning Routine", path: "/am", component: AMRoutineContainer },

  { title: "Evening Routine", path: "/pm", component: pmRoutineContainer },
  { title: "Add Product", path: "/add", component: AddProductContainer },

  {
    title: "Treatment Routine",
    path: "/treatment",
    component: TreatmentRoutineContainer
  },
  {
    title: "Welcome to Shelfy!",
    path: "/welcome",
    component: WelcomeContainer
  },
  {
    title: "Log in",
    path: "/login",
    component: LoginForm
  },
  {
    title: "Sign up",
    path: "/signup",
    component: SignupForm
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    component: DashboardContainer
  },
  {
    title: "Log out",
    path: "/logout",
    component: props => {
      props.logout();

      return null;
    }
  }
];
