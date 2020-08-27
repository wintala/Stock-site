import axios from "axios"

const findTickers = async (companyName) => {
  const config = {
    params: {company: companyName},
  }

  return axios.get("/ticker", config).then(response => response.data)
}

const getData = async (ticker) => {
  const config = {
    params: {ticker},
  }

  return axios.get("/data", config).then(response => response.data)
}


export default {findTickers, getData}