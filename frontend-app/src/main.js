/**
 * This file contains all the main functions
 */

// importing functions
import {
    tokenFormatter
} from './helpers.js'

const registration = document.getElementById('registration')
const login = document.getElementById('login')
const registrationLink = document.getElementById('registrationLink')
const loginLink = document.getElementById('loginLink')
const logoutLink = document.getElementById('logoutLink')
const loanApplication = document.getElementById('loanApplication')

//Recipe Details
// const recipe_details = document.getElementById('recipe_details')


// Check Token From LocalStorage
const token = tokenFormatter(localStorage.getItem('token'))
const isUserLoggedIn = token ? true : false


//const loading = document.querySelector('.loading');
//const loading = document.getElementById('loading')

// Set the initial state on page load whether or not the user is logged in.
if (isUserLoggedIn) { // if token present in localstorage
    loanApplication.classList.remove('is-hidden')
    logoutLink.classList.remove('is-hidden')

} else { // not loggedin
    login.style.display = 'block'
    registrationLink.classList.remove('is-hidden')
}

// Navigation section
registrationLink.addEventListener('click', (e) => {
    e.preventDefault()
    login.style.display = 'none'
    registrationLink.classList.add('is-hidden')

    registration.style.display = 'block'
    loginLink.classList.remove('is-hidden')
})

loginLink.addEventListener('click', () => {
    registration.style.display = 'none'
    loginLink.classList.add('is-hidden')

    login.style.display = 'block'
    registrationLink.classList.remove('is-hidden')
})

logoutLink.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    location.reload()
})
