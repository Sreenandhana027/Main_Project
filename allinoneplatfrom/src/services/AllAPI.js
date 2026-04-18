import { serverURL } from "./serverURL";
import commanAPI from "./commanAPI";

/* ================= USER AUTH ================= */

// Register
export const registerUserAPI = async (reqBody) => {
    return await commanAPI("POST", `${serverURL}/api/register`, reqBody, {});
};

// Login
export const loginUserAPI = async (reqBody) => {
    return await commanAPI("POST", `${serverURL}/api/login`, reqBody, {});
};

// Google Login
export const googleLoginUserAPI = async (reqBody) => {
    return await commanAPI("POST", `${serverURL}/api/google-login`, reqBody, {});
};


/* ================= COMPANY AUTH ================= */

export const companyRegisterAPI = async (reqBody) => {
    return await commanAPI("POST", `${serverURL}/api/company/register`, reqBody, {});
};

export const companyLoginAPI = async (reqBody) => {
    return await commanAPI("POST", `${serverURL}/api/company/login`, reqBody, {});
};


/* ================= USER PROFILE ================= */

export const GetUserProfileAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/user/profile`,
        "",
        reqHeader
    );
};

export const UpdateUserProfileAPI = async (formData, reqHeader) => {
    return await commanAPI(
        "PUT",
        `${serverURL}/api/update-profile`,
        formData,
        reqHeader
    );
};


/* ================= ADMIN ================= */

export const UpdateUserAPI = async (reqBody, reqHeader) => {
    return await commanAPI(
        "PUT",
        `${serverURL}/api/update-admin`,
        reqBody,
        reqHeader
    );
};

export const GetAdminAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/get-admin`,
        "",
        reqHeader
    );
};

export const GetUserAdminAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/getUser`,
        "",
        reqHeader
    );
};


/* ================= JOB MODULE ================= */

// Add Job
export const addJobAPI = async (reqBody, reqHeader) => {
    return await commanAPI(
        "POST",
        `${serverURL}/api/company/add-job`,
        reqBody,
        reqHeader
    );
};

// Company Jobs
export const getCompanyJobsAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/company/get-jobs`,
        "",
        reqHeader
    );
};

// All Jobs
export const getAllJobsAPI = async () => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/jobs`,
        "",
        ""
    );
};

// Single Job
export const getSingleJobAPI = async (id) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/job/${id}`,
        "",
        ""
    );
};

// Delete Job
export const deleteJobAPI = async (id, reqHeader) => {
    return await commanAPI(
        "DELETE",
        `${serverURL}/api/company/delete-job/${id}`,
        null,
        reqHeader
    );
};


/* ================= JOB APPLICATION ================= */

// Apply Job
export const AddUserAPI = async (reqBody, reqHeader) => {
    return await commanAPI(
        "POST",
        `${serverURL}/api/apply-job`,
        reqBody,
        reqHeader
    );
};

// My Applications
export const getMyApplicationsAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/my-applications`,
        "",
        reqHeader
    );
};

// Company Applicants
export const getCompanyApplicantsAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/company/applicants`,
        "",
        reqHeader
    );
};

// Single Applicant
export const getSingleApplicantAPI = async (id, reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/application/${id}`,
        "",
        reqHeader
    );
};

// Withdraw Application
export const withdrawApplicationAPI = async (id, reqHeader) => {
    return await commanAPI(
        "DELETE",
        `${serverURL}/api/application/${id}`,
        "",
        reqHeader
    );
};

// Update Status (Company)
export const updateApplicationStatusAPI = async (id, data, reqHeader) => {
    return await commanAPI(
        "PUT",
        `${serverURL}/api/application-status/${id}`,
        data,
        reqHeader
    );
};


/* ================= VIDEO ================= */

export const getVideosAPI = () =>
    commanAPI("GET", `${serverURL}/api/all-videos`, "", {});

export const addVideoAPI = (data, reqHeader) =>
    commanAPI("POST", `${serverURL}/api/add-video`, data, reqHeader);

export const deleteVideoAPI = (id, reqHeader) =>
    commanAPI("DELETE", `${serverURL}/api/delete-video/${id}`, "", reqHeader);


/* ================= PRODUCT ================= */

export const getProductsAPI = async (category) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/products?category=${category}`,
        "",
        ""
    );
};


export const getSingleProductAPI = async (id) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/product/${id}`,
        "",
        ""
    );
};


/* ================= CART ================= */

export const addToCartAPI = async (reqBody, reqHeader) => {
    return await commanAPI(
        "POST",
        `${serverURL}/api/cart/add`,
        reqBody,
        reqHeader
    );
};

export const getCartAPI = async (reqHeader) => {
    return await commanAPI(
        "GET",
        `${serverURL}/api/cart`,
        "",
        reqHeader
    );
};

export const removeCartAPI = async (id, reqHeader) => {
    return await commanAPI(
        "DELETE",
        `${serverURL}/api/cart/${id}`,
        "",
        reqHeader
    );
};


/* ================= PAYMENT ================= */

export const paymentAPI = async (reqBody, reqHeader) => {
    return await commanAPI(
        "POST",
        `${serverURL}/api/makePayment`,
        reqBody,
        reqHeader
    );
};

export const getAllNewArrivalsAPI = async (reqHeader) => {
  return await commanAPI(
    "GET",
    `${serverURL}/api/newarrivals`,
    {},
    reqHeader
  );
};
 
// GET filtered + sorted products via query params
export const getFilteredNewArrivalsAPI = async (category, sort, reqHeader) => {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (sort && sort !== "newest") params.append("sort", sort);

  const query = params.toString() ? `?${params.toString()}` : "";

  return await commanAPI(
    "GET",
    `${serverURL}/api/newarrivals${query}`,
    {},
    reqHeader
  );
};
 
// GET single product by ID
export const getNewArrivalByIdAPI = async (id, reqHeader) => {
  return await commanAPI(
    "GET",
    `${serverURL}/api/newarrivals/${id}`,
    {},
    reqHeader
  );
};
 
// POST create a new product (Admin)
export const createNewArrivalAPI = async (reqBody, reqHeader) => {
  return await commanAPI(
    "POST",
    `${serverURL}/api/newarrivals`,
    reqBody,
    reqHeader
  );
};
 
// PUT update a product by ID (Admin)
export const updateNewArrivalAPI = async (id, reqBody, reqHeader) => {
  return await commanAPI(
    "PUT",
    `${serverURL}/api/newarrivals/${id}`,
    reqBody,
    reqHeader
  );
};
 
// DELETE a product by ID (Admin)
export const deleteNewArrivalAPI = async (id, reqHeader) => {
  return await commanAPI(
    "DELETE",
    `${serverURL}/api/newarrivals/${id}`,
    {},
    reqHeader
  );
};