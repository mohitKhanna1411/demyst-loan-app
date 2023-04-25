// modal clicks
const closeErrorModal = document.getElementById(
    'closeErrorModal'
)
const errorModal = document.getElementById('errorModal')
closeErrorModal.addEventListener('click', () => {
    errorModal.classList.remove('is-active');
})


const closeSucessModal = document.getElementById(
    'closeSuccessModal'
)
const successModal = document.getElementById('successModal')
closeSucessModal.addEventListener('click', () => {
    successModal.classList.remove('is-active');
})