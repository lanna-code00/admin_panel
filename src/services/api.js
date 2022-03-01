import axios  from "axios";

const api = axios.create({
    baseURL: "https://cornie-assessment.herokuapp.com/",
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;