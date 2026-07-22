import axios from "axios";
import { toast } from "react-hot-toast";

const commanAPI = async (httpMethod, url, reqBody, reqHeader = {}) => {
    // NOTE: Do NOT auto-inject a token here.
    // Each caller passes its own correct token (userToken / companyToken / adminToken)
    // in reqHeader. Auto-injecting from localStorage can override the correct token
    // with a stale or wrong-role token, causing "Only users can apply" errors.
    try {
        let headers = { ...reqHeader };

        // FORM DATA
        if (reqBody instanceof FormData) {
            delete headers["Content-Type"];
        }
        // JSON DATA
        else {
            headers["Content-Type"] = "application/json";
        }

        const reqConfig = {
            method: httpMethod,
            url,
            headers
        };

        // Only attach body for POST and PUT requests
        if (reqBody && typeof reqBody === "object" &&
            ["POST", "PUT", "PATCH"].includes(httpMethod.toUpperCase())) {
            reqConfig.data = reqBody;
        }

        const response = await axios(reqConfig);

        if (response?.data?.message) {
            toast.success(response.data.message);
        }

        return response;

    } catch (error) {
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Network error! Server not reachable");
        }
        throw error;
    }
};

export default commanAPI;