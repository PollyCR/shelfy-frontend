const BASE_URL = "https://shelfy-backend.herokuapp.com/";

const LOGIN_URL = `${BASE_URL}api/v1/login`;
const SIGNUP_URL = `${BASE_URL}api/v1/signup`;
const VALIDATE_URL = `${BASE_URL}api/v1/validate`;
const BRANDS_URL = `${BASE_URL}api/v1/brands`;
const DIARY_URL = `${BASE_URL}api/v1/diaries`;
const LIST_URL = `${BASE_URL}api/v1/lists`;
const ROUTINE_PRODUCTS_URL = `${BASE_URL}api/v1/routine_products`;
const LIST_PRODUCTS_URL = `${BASE_URL}api/v1/list_products`;
const ENTRIES_URL = `${BASE_URL}api/v1/entries`;
const USERS_URL = `${BASE_URL}api/v1/users`;
const PRODUCTS_URL = `${BASE_URL}api/v1/products`;
const ROUTINES_URL = `${BASE_URL}api/v1/routines`;

const headers = (more = {}) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...more
});
const authHeader = (more = {}) => ({
  Authorisation: localStorage.getItem("token"),
  ...more
});

const handleError = () => {
  console.log("Oops");
};

const getProducts = () => {
  // console.log(data)
  return fetch(PRODUCTS_URL, {
    method: "GET",
    headers: headers()
  }).then(resp => resp.json());
};

const getRoutine = (user, type) => {
  // console.log(user)
  // console.log(type)
  return fetch(ROUTINES_URL, {
    method: "POST",
    headers: headers(authHeader()),
    body: JSON.stringify({ routine: { user_id: user.id, routine_type: type } })
  }).then(resp => resp.json());
  // .then(console.log);
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
  }).then(resp => resp.json());
};

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
  // console.log(id)
  return fetch(`${ROUTINE_PRODUCTS_URL}/${id}`, {
    method: "DELETE"
  });
};

const postEntry = (user, routine, entry) => {
  // console.log(user)
  // console.log(routine)
  // console.log(entry)
  return fetch(ENTRIES_URL, {
    method: "POST",
    headers: headers(authHeader()),
    body: JSON.stringify({
      user: user,
      routine: routine,
      entry: entry
    })
  });
};

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
        return { errors: ["That wasn't quite right. Please try again!"] };
      }
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);
};

const addProduct = data => {
  // console.log(data);
  return fetch(ROUTINE_PRODUCTS_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      product_name: data.product_name,
      product_type: data.product_type,
      brand: data.brand,
      active_ingredients: data.active_ingredients,
      user_id: data.id,
      routine: data.routine
    })
  }).then(resp => resp.json());
};

const deleteEntry = id => {
  return fetch(`${ENTRIES_URL}/${id}`, {
    method: "DELETE"
  });
};

const addListProduct = (user, product) => {
  // console.log(user)
  // console.log(product)
  return fetch(LIST_PRODUCTS_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user_id: user, product_id: product })
  }).then(resp => resp.json());
};

const logout = () => {
  localStorage.removeItem("token");
};

const deleteListProduct = id => {
  return fetch(`${LIST_PRODUCTS_URL}/${id}`, {
    method: "DELETE"
  });
};

const addProductfromBrands = data => {
  // console.log(data);
  let ingredients = data.active_ingredients
    .map(ingredient => ingredient.name)
    .join(",");
  // console.log(ingredients)
  return fetch(ROUTINE_PRODUCTS_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      user_id: data.id,
      routine: data.routine,
      product_type: data.product_type,
      brand: data.brand.name,
      active_ingredients: ingredients,
      product_name: data.name
    })
  }).then(resp => resp.json());
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
  getUser,
  postEntry,
  deleteEntry,
  addListProduct,
  deleteListProduct,
  addProductfromBrands
};
