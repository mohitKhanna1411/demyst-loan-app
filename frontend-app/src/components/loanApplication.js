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

balanceSheetButton.addEventListener('click', (e) => {
    e.preventDefault()
    balanceSheetButton.classList.add('is-loading')
    const loanForm = document.getElementById('loanForm');
    const loanBusinessName = loanForm.elements['loanBusinessName']
    const loanYearEstablished = loanForm.elements['loanYearEstablished']
    const loanABN = loanForm.elements['loanABN']
    const loanAmount = loanForm.elements['loanAmount']
    const loanAccountingProviderMYOB = loanForm.elements["loanAccountingProviderMYOB"]
    const loanAccountingProviderXero = loanForm.elements["loanAccountingProviderXero"]
    const loanAccountingProviderOthers = loanForm.elements["loanAccountingProviderOthers"]
    let accountingProvider = ""
    if (loanAccountingProviderMYOB.checked) {
        accountingProvider = loanAccountingProviderMYOB.value;
    }
    if (loanAccountingProviderXero.checked) {
        accountingProvider = loanAccountingProviderXero.value;
    }
    if (loanAccountingProviderOthers.checked) {
        accountingProvider = loanAccountingProviderOthers.value;
    }

    const payload = {
        name: loanBusinessName.value,
        year_established: loanYearEstablished.value,
        abn: loanABN.value,
        loan_amount: Number(loanAmount.value),
        accounting_provider: accountingProvider
    }
    const token = tokenFormatter(localStorage.getItem('token'))

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
                    const { sheet } = data
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
                    return alertMessageBuilder(
                        errorModal,
                        errorMessage,
                        "Something went wrong!"
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