export function ContactForm() {
  const SUBMIT_URL = 'https://questions.greatfrontend.com/api/questions/contact-form'

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // 1. target 은 이벤트가 실제로 발생한 요소 -> button
    // currentTarget 은 리스너가 등록된 요소 -> form
    const form = event.currentTarget

    try {
      if (form.action !== SUBMIT_URL) {
        alert('Incorrect form action value')
        return
      }

      if (form.method.toLowerCase() !== 'post') {
        alert('Incorrect form method value')
        return
      }

      const formData = new FormData(form)
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 3. body 는 문자열만 가능하므로 직렬화가 필요함.
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      const text = await response.text()
      alert(text)
    } catch (error) {
      alert('Error submitting form!')
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={submitForm}
      // 2. action 주소로 post 요청을 보낸다.
      method="post"
      action="https://questions.greatfrontend.com/api/questions/contact-form"
    >
      <div>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="message-input">Message</label>
        <textarea id="message-input" name="message"></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}
