import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Your bearer token (replace 'your_token' with the actual token)


export const fetchFromAPI = async (url,method,sendData = null,bearerToken = '')=> {
    try {
      let data = '';
      // Set up the authorization header
      const config = {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      };
        if (method === 'get') {
          console.log(`${BASE_URL}/${url}`);
          data = await axios.get(`${BASE_URL}/${url}`,config);
        } else if(method === 'post') {
          console.log("here");
          console.log(`${BASE_URL}/${url}`);
          data = await axios.post(`${BASE_URL}/${url}`,sendData,config);
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
        console.log(obj);
        return obj;
      } else if (error.request) {

        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
} 