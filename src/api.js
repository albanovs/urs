import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5000'
})

// export const api = axios.create({
//     baseURL: 'https://integration-sov-kg.onrender.com'
// })  