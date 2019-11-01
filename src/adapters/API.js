const BASE_URL = "http://localhost:3000/";

const LOGIN_URL = `${BASE_URL}api/v1/login`;
const SIGNUP_URL = `${BASE_URL}api/v1/signup`;
const VALIDATE_URL = `${BASE_URL}api/v1/validate`;
const BRANDS_URL = `${BASE_URL}api/v1/brands`;

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
  console.error("something went wrong");
};

const getMorningRoutineProducts = user => {
  fetch("http://localhost:3000/api/v1/morning_routine_products", {
    method: "GET",
    headers: headers(authHeader())
  })
    .then(resp => resp.json())
    .then(console.log);
};

const getEveningRoutine = user => {
  fetch("http://localhost:3000/api/v1/evening_routines", {
    method: "POST",
    headers: headers(authHeader()),
    body: JSON.stringify({ evening_routine: { user_id: user.id } })
  }).then(handleServerResponse());
};

const getTreatmentRoutine = user => {
  fetch("http://localhost:3000/api/v1/treatment_routines", {
    method: "POST",
    headers: headers(authHeader()),
    body: JSON.stringify({ treatment_routine: { user_id: user.id } })
  }).then(handleServerResponse());
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

const getBrand = id => {
  fetch(`${BRANDS_URL}/${id}`, {
    method: "GET",
    headers: headers()
  }).then(resp => resp.json());
};

const validateUser = () =>
  fetch(VALIDATE_URL, {
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

const logout = () => {
  localStorage.removeItem("token");
};
export default {
  login,
  signup,
  validateUser,
  logout,
  getMorningRoutineProducts,
  getEveningRoutine,
  getTreatmentRoutine,
  getBrands,
  getBrand
};
