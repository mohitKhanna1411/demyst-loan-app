/**
 * This file contains all the functions related login
 */

// importing functions
import { makeAPIRequest } from '../api.js'
import {
    alertMessageBuilder,
    validateForm,
} from '../helpers.js'

// Login Section
loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    loginButton.classList.add('is-loading')
    const loginForm = document.getElementById('loginForm');
    const loginUsername = loginForm.elements['loginUsername']
    const loginPassword = loginForm.elements['loginPassword']
    const payload = {
        username: loginUsername.value,
        password: loginPassword.value,
    }
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }
    // check validity of the file
    const errors = validateForm([loginUsername, loginPassword])
    const isValidForm = errors.length === 0

    if (isValidForm) { // if valid 
        // Login api
        makeAPIRequest('auth/login', options)
            .then(data => {
                loginButton.classList.remove('is-loading')

                const { message, token } = data
                if (token) { // if token
                    // set local storage
                    localStorage.setItem('token', JSON.stringify(token))
                    // Loding state
                    loginButton.classList.add('is-loading')
                    login.style.display = 'none'
                    // feed.style.display = 'block'
                    // Reload Page to get the loan application page
                    location.reload()
                } else {
                    // error
                    return alertMessageBuilder( // error modal
                        errorModal,
                        errorMessage,
                        message
                    )
                }
            })
            .catch(err => { // error
                return alertMessageBuilder(
                    errorModal,
                    errorMessage,
                    "Something went wrong!" + err
                )
            })
    } else { // if form not valid
        loginButton.classList.remove('is-loading')
        errors.forEach((error) => {
            document.getElementById(error).classList.add('is-danger')
        })
        return alertMessageBuilder( // error
            errorModal,
            errorMessage,
            'Please input required fields!'
        )
    }
})