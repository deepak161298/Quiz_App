import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com/";
const errObject = {
  401: "Unauthenticated",
  404: "No questions found",
  429: "Too Many Requests"
}

const config = {
  headers: {
    "X-Api-Key": "FkypsEs90CSE5Z65IrdVvt1AHoMIVhQ5Rc5uNDO8"
  }
};

const useFetchData = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export const getQuestions = async (url) => {
  try {
    let result = await axios.get(url, config)
    return result.data
    // Work with the response...
  } catch (err) {
    // Handle error
    if (errObject[err.response.status]) {
      return err.response.status
    }else{
      return false
    }
  }

}
export default useFetchData;
