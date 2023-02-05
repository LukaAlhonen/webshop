import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api/items/'

const getFirstPage = (endpoint) => { 
  const request = axios.get(`${baseUrl}${endpoint}`)
  return request.then(response => {
    return {
      page: response.data.results,
      count: response.data.count
    }
  })
}

const get = (url) => {
  const request = axios.get(url)
  return request.then(response => {
    return {
      page: response.data.results,
      count: response.data.count,
      next: response.data.next,
      prev: response.data.previous
    }
  })
}

const getPage = (endpoint) => {
  const request = axios.get(`${baseUrl}${endpoint}`)
  return request.then(response => {
    return {
      page: response.data.results,
      count: response.data.count,
      next: response.data.next,
      prev: response.data.previous
    }
  })
}

const create = (payload, cookie) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${cookie.token}`,
    },
  }

  const request = axios.post(baseUrl, payload, config)
  return request.then(response => {
    return response.data
  })
}

const edit = (item, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const request = axios.put(`${baseUrl}${item.id}/`, item, config)
  return request.then(response => {
    return response.data
  })
}

const remove = (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => {
    return response.data
  })
}

const purchase = (items, cookie) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.token}`
    },
  }

  const payload = {
    items: items,
    username: cookie.username
  }
  
  const request = axios.post(`${baseUrl}purchase/`, payload, config)
  return request.then(response => {
    return response.data
  })
}

const itemService = {
  getFirstPage,
  getPage,
  create,
  remove,
  purchase,
  edit,
  get
}

export default itemService