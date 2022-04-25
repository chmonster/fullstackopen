import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deleteObject = id => {
    const request = axios.delete(baseURL.concat('/').concat(id))
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put((baseURL.concat('/').concat(id)), newObject)
    return request.then(response => response.data)}

export default {getAll, create, update, deleteObject}