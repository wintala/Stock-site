import axios from "axios"
const baseUrl = "https://simple-stonks.herokuapp.com"

const findTickers = async (companyName) => {
  const config = {
    params: {company: companyName},
  }

  return axios.get(`${baseUrl}/api/ticker`, config).then(response => response.data)
}

const getData = async (ticker) => {
  const config = {
    params: {ticker},
  }

  return axios.get(`${baseUrl}/api/data`, config).then(response => response.data)
}

const wakeUpRequest = async () => {
  axios.get(`${baseUrl}/api/whatevcer`)
}


export default {findTickers, getData, wakeUpRequest}