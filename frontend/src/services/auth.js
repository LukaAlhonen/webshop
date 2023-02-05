import axios from 'axios'

const baseUrl = 'https://lukaswebshop.azurewebsites.net/api/auth/'

const signup = (username, email, password) => {
  const payload = {
    username: username,
    email: email,
    password: password
  }
  const request = axios.post(`${baseUrl}signup/`, payload)
  return request.then(response => {
    return {
      data: response.data,
      status: response.status
    }
  })
}

const signin = (username, password) => {
  const payload = {
    username: username,
    password: password
  }
  const request = axios.post(`${baseUrl}signin/`, payload)
  return request.then(response => {
    return {
      refresh: response.data.refresh,
      access: response.data.access,
      status: response.status
    }
  })
}

const update = (username, password) => {
  const payload = {
    username: username,
    password: password
  }
  const request = axios.put(`${baseUrl}update/`, payload)
  return request.then(response => {
    return {
      status: response.status,
      message: response.data.message
    }
  })
}

const authService = {
  signin,
  signup,
  update
}

export default authService