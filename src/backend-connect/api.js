import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchFromAPI = async (url,method,sendData = null,bearerToken = '')=> {
    try {
      let data = '';
      const config = {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      };
      const axiosMethod = method.toLowerCase(); // Ensure method is in lowercase
        if (method === 'get' || method === 'delete' ) {
          try {
              data = await axios[axiosMethod](`${BASE_URL}/${url}`, config);
          } catch (error) {
              console.error(`Error during ${method.toUpperCase()} request:`, error.response || error.message || error);
          }
        } else if(method === 'post' || method === 'put'){
          try {
              data = await axios[axiosMethod](`${BASE_URL}/${url}`,sendData, config);
          } catch (error) {
              console.error(`Error during ${method.toUpperCase()} request:`, error.response || error.message || error);
          }
        }

        return data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        let obj = {
          'data':{
            'message':error.response.data.message
          },
          'status':error.response.status,
        }
        return obj;
      } else if (error.request) {

        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
} 