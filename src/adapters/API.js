const BASE_URL = "http://localhost:3000/";

const LOGIN_URL = `${BASE_URL}api/v1/login`;
const SIGNUP_URL = `${BASE_URL}api/v1/signup`;
const VALIDATE_URL = `${BASE_URL}api/v1/validate`;
const BRANDS_URL = `${BASE_URL}api/v1/brands`;
const DIARY_URL = `${BASE_URL}api/v1/diaries`;
const LIST_URL = `${BASE_URL}api/v1/lists`;
const ROUTINE_PRODUCTS_URL = `${BASE_URL}api/v1/routine_products`;
const USERS_URL = `${BASE_URL}api/v1/users`

const headers = (more = {}) => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  ...more
});
const authHeader = (more = {}) => ({
  "Authorisation": localStorage.getItem("token"),
  ...more
});

const handleError = () => {
  console.error("something went wrong");
};

const getProducts = () => {
  // console.log(data)
  return fetch("http://localhost:3000/api/v1/products", {
    method: "GET",
    headers: headers(authHeader())
    //   body: JSON.stringify({ data })
  }).then(resp => resp.json());
};

const getRoutine = (user, type) => {
  // console.log(user)
  // console.log(type)
  return fetch("http://localhost:3000/api/v1/routines", {
    method: "POST",
    headers: headers(authHeader()),
    body: JSON.stringify({ routine: { user_id: user.id, routine_type: type } })
  }).then(resp => resp.json()).then(console.log);
};

const handleServerResponse = res => {
  if (res.ok) {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return { staticPageContent: text };
      }
    });
  } else if (res.status === 503) {
    return { code: 503 };
  } else if (res.status === 500) {
    return { code: 500, error: "IDEK what is going on " };
  } else {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return res;
      }
    });
  }
};

const getUser = id => {
  return fetch(`${USERS_URL}/${id}`, {
    method: "GET"
  }).then(resp => resp.json())}


const signup = userDetails =>
  fetch(SIGNUP_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user;
    })
    .then(() => validateUser())
    .catch(handleError);

const login = userDetails =>
  fetch(LOGIN_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user;
    })
    .then(() => validateUser())
    .catch(handleError);

const getBrands = () =>
  fetch(BRANDS_URL, {
    method: "GET",
    headers: headers()
  }).then(resp => resp.json());

const getDiary = user =>
  fetch(DIARY_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ diary: { user_id: user.id } })
  }).then(resp => resp.json());

  const deleteRoutineProduct = id => {
   return fetch(`${ROUTINE_PRODUCTS_URL}/${id}`, {
    method: "DELETE",
   })
    }
  

const getList = user =>
  fetch(LIST_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ list: { user_id: user.id } })
  }).then(resp => resp.json());

const validateUser = () => {
  return fetch(VALIDATE_URL, {
    method: "POST",
    headers: headers(authHeader())
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.errors) {
        return { errors: ["something went wrong "] };
      }
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);
};

const addProduct = data => {
  console.log(data) }
  // return fetch(ROUTINE_PRODUCTS_URL, {
  //   method: "POST",
  //   headers: headers(),
  //   body: JSON.stringify(data)
  // }).then(resp => resp.json());
// };

const logout = () => {
  localStorage.removeItem("token");
};
export default {
  login,
  signup,
  validateUser,
  logout,
  getRoutine,
  getBrands,
  getDiary,
  getList,
  addProduct,
  deleteRoutineProduct,
  getProducts,
  getUser
};
