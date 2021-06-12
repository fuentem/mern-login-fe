import axios from 'axios'

export class userService {

    static loginUser(data) {
        return new Promise((resolve, reject) => {
            axios.post("https://mern-login-be.herokuapp.com/api/signin", data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    static otpVerification(data) {
        return new Promise((resolve, reject) => {
            axios.post("https://mern-login-be.herokuapp.com/api/verifyOTP", data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    static register(data) {
        return new Promise((resolve, reject) => {
            axios.post("https://mern-login-be.herokuapp.com/api/signup", data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    
}

export default userService