/**
 * This file contains all the functions related login
 */

// importing functions
import { makeAPIRequest } from '../api.js'
import {
    alertMessageBuilder,
    validateForm
} from '../helpers.js'
// Registration Section

// on click event
registerButton.addEventListener('click', (e) => {
    e.preventDefault()
    const registerButton = document.getElementById('registerButton')

    registerButton.classList.add('is-loading')

    const registrationForm = document.getElementById('registrationForm');
    const registrationUsername = registrationForm.elements["registrationUsername"]
    const registrationPassword = registrationForm.elements["registrationPassword"]
    const registrationConfirmPassword = registrationForm.elements["registrationConfirmPassword"]

    const payload = {
        username: registrationUsername.value,
        password: registrationPassword.value,
    }
    // Remove the red outline from all input fields
    const sectionInputs = [
        registrationUsername,
        registrationPassword,
        registrationConfirmPassword,
    ]

    sectionInputs.forEach((section) => {
        section.classList.remove('is-danger')
    })

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }
    // check for errors
    const errors = validateForm([
        registrationUsername,
        registrationPassword,
        registrationConfirmPassword,
    ])
    const isValidForm = errors.length === 0

    if (isValidForm) { // valid form
        if (registrationPassword.value !== registrationConfirmPassword.value) { // if pass does not match
            registerButton.classList.remove('is-loading');

            return alertMessageBuilder( // error
                errorModal,
                errorMessage,
                'Password does not match!'
            )
        }

        makeAPIRequest('auth/signup', options)
            .then((data) => {
                registerButton.classList.remove('is-loading');

                const { token, message } = data

                if (token) {
                    // Set token to local Storage
                    localStorage.setItem('token', JSON.stringify(token))
                    // Navigate to the loan section
                    registration.style.display = 'none'
                    // feed.style.display = 'block'
                    // Reload Page
                    location.reload()
                } else {

                    return alertMessageBuilder( // error
                        errorModal,
                        errorMessage,
                        message
                    )
                }

            })
            .catch((err) => { // error
                return alertMessageBuilder(
                    errorModal,
                    errorMessage,
                    "Something went wrong!" + err
                )
            })
    } else { // form invalid
        alertMessageBuilder(
            errorModal,
            errorMessage,
            'Please input required fields!'
        )
        errors.forEach((error) => {
            document.getElementById(error).classList.add('is-danger')
        })
        registerButton.classList.remove('is-loading')
    }
})