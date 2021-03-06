import TreatmentRoutineContainer from "../treatmentRoutineContainer";
import SignupForm from "../SignupForm";
import WelcomeContainer from "../WelcomeContainer";
import DashboardContainer from "../DashboardContainer";
import AMRoutineContainer from "../amRoutineContainer";
import pmRoutineContainer from "../pmRoutineContainer";
import SkinDiaryContainer from "../SkinDiaryContainer";
import brandsContainer from "../brandsContainer";
import ShoppingListContainer from "../ShoppingListContainer";
import SigninForm from "../SigninForm";
import AddProductContainer from "../AddProductContainer";
import AddBrandProductContainer from "../AddBrandProductContainer";

export const routes = [
  {
    title: "Add to routine",
    path: "/brands/add",
    component: AddBrandProductContainer
  },
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
