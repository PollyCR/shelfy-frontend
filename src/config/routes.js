import TreatmentRoutineContainer from "../treatmentRoutineContainer";
import SignupForm from "../Components/SignupForm";
import WelcomeContainer from "../Containers/WelcomeContainer";
import DashboardContainer from "../Containers/DashboardContainer";
import AMRoutineContainer from "../Containers/amRoutineContainer";
import pmRoutineContainer from "../Containers/pmRoutineContainer";
import SkinDiaryContainer from "../Containers/SkinDiaryContainer";
import brandsContainer from "../Containers/brandsContainer";
import ShoppingListContainer from "../Containers/ShoppingListContainer";
import SigninForm from "../Components/SigninForm";
import AddProductContainer from "../Containers/AddProductContainer";
import AddBrandProductContainer from "../Containers/AddBrandProductContainer";

export const routes = [
  {
    title: "Add to routine",
    path: "/brands/add",
    component: AddBrandProductContainer
  },
  { title: "Skin diary", path: "/diary", component: SkinDiaryContainer },
  { title: "List", path: "/list", compsonent: ShoppingListContainer },
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
    component: SigninForm
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
