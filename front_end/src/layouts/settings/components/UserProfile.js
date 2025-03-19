import React, { useState } from 'react';

function UserProfile() {
  // Define initial user data
  const initialUserData = {
    username: 'john_doe',
    currentPassword: 'currentPass123',
    newPassword: 'newPass123',
    verifyPassword: 'newPass123'
  };

  // State for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    verifyPassword: false,
  });

  // State for form values
  const [formValues, setFormValues] = useState(initialUserData);

  // State for validation errors
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    verifyPassword: ''
  });

  // Toggle password visibility function
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, handle the form submission logic here
      console.log('Form submitted successfully');
    }
  };

  // Check if password meets the criteria
  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;
    return isValid;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Check if the current password matches
    if (formValues.currentPassword !== initialUserData.currentPassword) {
      newErrors.currentPassword = 'Current password is incorrect.';
      isValid = false;
    } else {
      newErrors.currentPassword = '';
    }

    // Check if new password and confirm password match
    if (formValues.newPassword !== formValues.verifyPassword) {
      newErrors.verifyPassword = 'New password and confirm password do not match.';
      isValid = false;
    } else {
      newErrors.verifyPassword = '';
    }

    // Check if new password meets criteria
    if (!isValidPassword(formValues.newPassword)) {
      newErrors.newPassword = 'New password must contain at least one uppercase letter, one number, and one special character.';
      isValid = false;
    } else {
      newErrors.newPassword = '';
    }

    // Check if new password contains username
    if (formValues.newPassword.includes(formValues.username)) {
      newErrors.newPassword = 'New password must not contain the username.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="" id="password" style={{ fontSize: '15px' }}>
      <div className="card">
        <div className="card-body">
          <div className="float-end">
            <i className="fas fa-edit" style={{ color: '#5cb1ed', fontSize: '15px' }}></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder=''
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentPassword">Current password</label>
              <div className="input-group">
                <input
                  type={passwordVisibility.currentPassword ? 'text' : 'password'}
                  className="form-control"
                  id="currentPassword"
                  value={formValues.currentPassword}
                  onChange={handleChange}
                  placeholder=''
                  style={{ fontSize: '15px' }}
                />
                <div className="input-group-append">
                  <i
                    className={`fas fa-eye${passwordVisibility.currentPassword ? '-slash' : ''}`}
                    style={{
                      cursor: 'pointer',
                      color: 'grey',
                      fontSize: '15px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => togglePasswordVisibility('currentPassword')}
                  ></i>
                </div>
              </div>
              {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New password</label>
              <div className="input-group">
                <input
                  type={passwordVisibility.newPassword ? 'text' : 'password'}
                  className="form-control"
                  id="newPassword"
                  value={formValues.newPassword}
                  onChange={handleChange}
                  placeholder=''
                  style={{ fontSize: '15px' }}
                />
                <div className="input-group-append">
                  <i
                    className={`fas fa-eye${passwordVisibility.newPassword ? '-slash' : ''}`}
                    style={{
                      cursor: 'pointer',
                      color: 'grey',
                      fontSize: '15px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => togglePasswordVisibility('newPassword')}
                  ></i>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="verifyPassword">Verify password</label>
              <div className="input-group">
                <input
                  type={passwordVisibility.verifyPassword ? 'text' : 'password'}
                  className="form-control"
                  id="verifyPassword"
                  value={formValues.verifyPassword}
                  onChange={handleChange}
                  placeholder=''
                  style={{ fontSize: '15px' }}
                />
                <div className="input-group-append">
                  <i
                    className={`fas fa-eye${passwordVisibility.verifyPassword ? '-slash' : ''}`}
                    style={{
                      cursor: 'pointer',
                      color: 'grey',
                      fontSize: '15px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => togglePasswordVisibility('verifyPassword')}
                  ></i>
                </div>
              </div>
              {errors.verifyPassword && <div className="text-danger">{errors.verifyPassword}</div>}
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white mt-2"
              style={{ color: '#244dd4', fontSize: '15px' }}
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
