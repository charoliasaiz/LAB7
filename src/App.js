import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function Dashboard() {
  const formData = localStorage.getItem('name')
  console.log(formData)

  return (
    <div>
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
    const isFirstNameValid = /^[A-Za-z]+$/.test(formData.firstName);
    const isLastNameValid = /^[A-Za-z]+$/.test(formData.lastName);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password);
    const isFavoriteSeasonValid = !!formData.favoriteSeason;
    setIsFormValid(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isFavoriteSeasonValid);
    navigate('/profile', {state : { formData:formData }})
  };

  return (
    <div>
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
      <button type="submit">
      Submit
  </button>
</form>
</div>
  );
}

function Profile() {
  const {state} = useLocation();
  const { formData } = state; // Read values passed on state
  const name = formData.firstName
  localStorage.setItem('name', name)
  return (
    <div>
    <h1>Profile Page</h1>
    <p>First Name: {formData.firstName}</p>
    <p>Last Name: {formData.lastName}</p>
    <p>Email: {formData.email}</p>
    <p>Favorite Season: {formData.favoriteSeason}</p>
    <Link to={'/dashboard'}>Go to Dashboard</Link>
  </div>
    
  );
}


function App() {
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
