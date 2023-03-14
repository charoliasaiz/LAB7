import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Dashboard() {
  /*
Local Storage referred from robinwieruch
URL: https://www.robinwieruch.de/local-storage-react/
Author: Robin Wieruch
Date Accessed: 12/03/2023
*/
  const formData = localStorage.getItem('name')
  console.log(formData)

  return (
    <div className='div1'>
      <h1>Welcome to your dashboard!</h1>
      <p>First Name: {formData}</p>
    </div>
  );
}


function Login() {
  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favoriteSeason: ''
  });

  /*
  Handle input change referred from stackoverflow
  URL: https://stackoverflow.com/questions/67265409/how-to-handle-input-change-in-react
  Date Accessed: 12/03/2023
  */
  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    /*
      Regex patterns referred from w3schools
      URL: https://www.w3schools.com/tags/att_input_pattern.asp
      Date Accessed: 12/02/2023
      */
    const isFirstNameValid = /^[A-Za-z]+$/.test(formData.firstName);
    const isLastNameValid = /^[A-Za-z]+$/.test(formData.lastName);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password);
    const isFavoriteSeasonValid = !!formData.favoriteSeason;
    setIsFormValid(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isFavoriteSeasonValid);
    navigate('/profile', {state : { formData:formData }})
  };

  /*
    Forms working understood using React
    URL: https://reactjs.org/docs/forms.html
    Date Accessed: 12/03/2023
    Form structure understood from scrimba
    URL: https://scrimba.com/learn/learnreact/forms-in-react-select-option-co83b466d859cf1d6c4b3efaf
    Date Accessed: 12/03/2023
  */

  return (
    /*
      Regex patterns referred from w3schools
      URL: https://www.w3schools.com/tags/att_input_pattern.asp
      Date Accessed: 12/02/2023
    */
    
    <div className='div1'>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          pattern="[A-Za-z]+"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          pattern="[A-Za-z]+"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />

        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <br />

        <label htmlFor="favoriteSeason">Favorite Season:</label>
        <select
          id="favoriteSeason"
          name="favoriteSeason"
          value={formData.favoriteSeason}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a season</option>
          <option value="Spring">Spring</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
}

function Profile() {
/*
Local Storage referred from robinwieruch
URL: https://www.robinwieruch.de/local-storage-react/
Author: Robin Wieruch
Date Accessed: 12/03/2023
*/

/*
useLocation() implementation understood from snyk
URL: https://snyk.io/advisor/npm-package/react-router-dom/functions/react-router-dom.useLocation
Date Accessed: 12/03/2023
*/
  const {state} = useLocation();
  const { formData } = state;
  const name = formData.firstName
  localStorage.setItem('name', name)
  
  return (
    <div className='div1'>
    <h1>Profile Page</h1>
    <p>First Name: {formData.firstName}</p>
    <p>Last Name: {formData.lastName}</p>
    <p>Email: {formData.email}</p>
    <p>Favorite Season: {formData.favoriteSeason}</p>
    <Link to={'/dashboard'}>Go to Dashboard</Link>
  </div>  
  );
}

/*
Router understood from w3schools
URL: https://www.w3schools.com/react/react_router.asp
Date Accessed: 12/03/2023
*/

function App() {
  /*
    Implementation of route path referred from stackoverflow
    URL: https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
    Date Accessed: 12/03/2023

    Implementation of route path referred from w3schools
    URL: https://www.w3schools.com/react/react_router.asp
    Date Accessed: 12/03/2023

    */
  return (
   <Routes>
     <Route path="/" element={<Login />} ></Route>
     <Route path="/profile" element={<Profile />} > </Route>
    <Route path="/dashboard" element={<Dashboard />} >
   </Route>
   </Routes>

);
}

export default App;
