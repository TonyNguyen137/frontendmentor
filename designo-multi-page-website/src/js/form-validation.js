export function validateForm() {
  const form = document.querySelector('.hero__form')

  if (form) {
    const inputs = document.querySelectorAll('.hero__input')
    const errors = document.querySelectorAll('.hero__form-error-group')
    let activeErrors = []

    form.addEventListener('invalid', handleInvalidInput, true)
    form.addEventListener('input', clearCustomValidation, true)

    function handleInvalidInput(e) {
      e.preventDefault()
      console.log('e: ', e)

      let id = e.target.dataset.index
      activeErrors.push(id)
      errors[id].classList.remove('d-none')
    }

    function clearCustomValidation() {
      if (activeErrors.length === 0) return

      activeErrors.forEach((id) => {
        errors[id].classList.add('d-none')
      })
      activeErrors = []
    }
  }
}
