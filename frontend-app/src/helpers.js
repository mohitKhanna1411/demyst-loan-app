/**
 * This file contains all the helper functions
 */


// message modal builder function
const alertMessageBuilder = (alertId, alertMessageDocumentId, message) => {
    alertId.classList.add('is-active')
    alertMessageDocumentId.textContent = message
}

// validate a form
const validateForm = (valArray) => {
    const errors = []

    for (let i = 0; i < valArray.length; i++) {
        if (valArray[i].value === '') {
            errors.push(valArray[i].id)
        }
    }
    return errors
}

// format the stored token
const tokenFormatter = (stringToken) => {
    return stringToken && stringToken.replace(/['"]+/g, '')
}



// export functions
export {
    alertMessageBuilder,
    validateForm,
    tokenFormatter,
}
