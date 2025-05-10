import { useState } from 'react'
import styles from './SignupForm.module.css'

export function SignupForm() {
  const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false)

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    const passwordConfirm = formData.get('password_confirm')

    // reset
    setPasswordConfirmError(false)

    // validate
    if (password !== passwordConfirm) {
      setPasswordConfirmError(true)

      return
    }

    // submit
    try {
      const response = await fetch('https://questions.greatfrontend.com/api/questions/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      })

      const { message } = await response.json()
      alert(message)
    } catch (error) {
      alert('Error submitting form!')
      console.error(error)
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="username-input">Username</label>
        <input id="username-input" name="username" required type="text" pattern="^[a-zA-Z0-9]+$" minLength={4} />
      </div>
      <div>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" name="email" required type="email" />
      </div>
      <div>
        <label htmlFor="password-input">Password</label>
        <input id="password-input" name="password" required type="password" minLength={6} />
      </div>
      <div>
        <label htmlFor="password-confirm-input">Confirm Password</label>
        <input
          id="password-confirm-input"
          name="password_confirm"
          required
          type="password"
          minLength={6}
          // 1. 동일한 id 를 매칭하여 스크린 리더가 같이 읽는다.
          aria-describedby="password-mismatch-error"
          // 2. 스크린리더에게 잘못된 값이 입력되었다고 명시한다.
          aria-invalid={passwordConfirmError ? 'true' : 'false'}
        />
        <div id="password-mismatch-error" className={passwordConfirmError ? styles.error : styles.hidden}>
          The passwords do not match
        </div>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}
