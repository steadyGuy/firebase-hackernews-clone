import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../context/firebaseContext';

export const ForgotPassword = () => {

  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState('')

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError('');
    } catch (err) {
      setIsPasswordReset(false);
      setPasswordResetError(err.message);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={(e) => setResetPasswordEmail(e.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError.length > 0 && <p className="error-text">{passwordResetError}</p>}
    </div>
  )
}
