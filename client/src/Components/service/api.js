import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from "../../constants/config";
import { getAccessToken, getType } from "../../utils/common-utils";

// Creating common api
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,

  header: {
    "content-type": "application/json",
  },
});

// Creating interceptor for request
axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// Creating interceptor for response
axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

// Creating Function for above interceptor(processResponse) In Case of Success

const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      stauts: response?.status,
      msg: response?.msg,
      code: response.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log("Error in Response:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure, // Server  returning  error in response
      code: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response was received

    console.log("Error in request:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
    };
  } else {
    console.log("Error in request:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkerror,
    };
  }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
