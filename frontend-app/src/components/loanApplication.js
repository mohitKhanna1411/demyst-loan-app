/**
 * This file contains all the functions related loan application
 */

// importing functions
import { makeAPIRequest } from '../api.js'
import {
    alertMessageBuilder,
    validateForm,
    tokenFormatter
} from '../helpers.js'

const balanceSheetDiv = document.getElementById('balanceSheetDiv')
const balanceSheetTable = document.getElementById('balanceSheetTable')
const token = tokenFormatter(localStorage.getItem('token'))

const loanForm = document.getElementById('loanForm');
const loanBusinessName = loanForm.elements['loanBusinessName']
const loanYearEstablished = loanForm.elements['loanYearEstablished']
const loanABN = loanForm.elements['loanABN']
const loanAmount = loanForm.elements['loanAmount']
const loanAccountingProviderMYOB = loanForm.elements["loanAccountingProviderMYOB"]
const loanAccountingProviderXero = loanForm.elements["loanAccountingProviderXero"]
const loanAccountingProviderOthers = loanForm.elements["loanAccountingProviderOthers"]
let accountingProvider = ""
let sheet = []

balanceSheetButton.addEventListener('click', (e) => {
    if (loanAccountingProviderMYOB.checked) {
        accountingProvider = loanAccountingProviderMYOB.value;
    }
    if (loanAccountingProviderXero.checked) {
        accountingProvider = loanAccountingProviderXero.value;
    }
    if (loanAccountingProviderOthers.checked) {
        accountingProvider = loanAccountingProviderOthers.value;
    }
    e.preventDefault()
    balanceSheetButton.classList.add('is-loading')


    const payload = {
        name: loanBusinessName.value,
        year_established: loanYearEstablished.value,
        abn: loanABN.value,
        loan_amount: Number(loanAmount.value),
        accounting_provider: accountingProvider
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,

        },
        body: JSON.stringify(payload),
    }
    // check validity of the file
    const errors = validateForm([loanBusinessName, loanYearEstablished, loanABN, loanAmount])
    const isValidForm = errors.length === 0

    if (isValidForm) { // if valid 
        // Login api
        makeAPIRequest('loan/balanceSheet', options)
            .then(data => {
                balanceSheetButton.classList.remove('is-loading')
                if (data.sheet) {
                    sheet = data.sheet
                    balanceSheetDiv.classList.remove('is-hidden')

                    let out = "";
                    for (let item of sheet) {
                        out += `
                            <tr>
                                <td>${item.year}</td>
                                <td>${item.month}</td>
                                <td>${item.profitOrLoss}</td>
                                <td>${item.assetsValue}</td>
                            </tr>
                        `;
                    }

                    balanceSheetTable.innerHTML = out;
                } else {
                    console.log(data)
                    return alertMessageBuilder(
                        errorModal,
                        errorMessage,
                        data.message + " " + data.errors[0]
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
        balanceSheetButton.classList.remove('is-loading')
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

finalOutcome.addEventListener('click', (e) => {
    e.preventDefault()
    finalOutcome.classList.add('is-loading')

    const payload = {
        name: loanBusinessName.value,
        year_established: loanYearEstablished.value,
        abn: loanABN.value,
        loan_amount: Number(loanAmount.value),
        accounting_provider: accountingProvider,
        sheet
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,

        },
        body: JSON.stringify(payload),
    }

    makeAPIRequest('loan/application', options)
        .then(data => {
            finalOutcome.classList.remove('is-loading')

            if (data.loan_outcome === 'Approved') {
                alertMessageBuilder(
                    successModal,
                    successMessage,
                    'Congrats!! your loan for $' + loanAmount.value + ' is ' + data.loan_outcome
                )

            } else {
                alertMessageBuilder(
                    errorModal,
                    errorMessage,
                    'Sadly!! your loan for $' + loanAmount.value + ' is ' + data.loan_outcome
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
})