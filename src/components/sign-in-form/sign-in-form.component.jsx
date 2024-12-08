import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields = { email: '', password: '' }

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid Credentials')
      } else {
        console.log(error)
      }
    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          required
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
