import React, { useState } from 'react'
import { act } from 'react';
import { useEffect } from 'react'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    title: "", 
    age: "",
    email: ""
  });

  const [isDetailed, setIsDetailed] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    document.title = isLoggedIn ? `Welcome, ${userData.name}` : 'User Deshbord';
  }, [isLoggedIn, userData.name]);

  const handleChange = (e) => {
    const {name, value} = e.target

    setUserData(prev => ({
      ...prev,
      [name] : value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if(userData.name && userData.title && userData.age && userData.email){
      // setIsLoggedIn(prev => !prev)
      console.log(userData);
      if(isLoggedIn){
        setUserData({name: "", title: "", age: "", email: ""})
      }
    }else{
      alert("Please fill all the boxes.")
    }

    if(!isLoggedIn){
      setActivities(prev => [...prev, `Logged is as ${userData.name}.`])
    }else{
      setActivities(prev => [...prev, "User Logged out."])
    }
    setIsLoggedIn(prev => !prev)
    setIsDetailed(false)
  }

  const handleDetails = () => {
    const newState = !isDetailed;
    setIsDetailed(newState);
    setActivities(prev => [...prev, newState ? "Viewed Details" : "Hide Details"]);
  };

  const handleReset = () => {
    setUserData({name: "", title: "", age: "", email: ""})
    setIsLoggedIn(false)
    setIsDetailed(false)
    setActivities(prev => [...prev, "Form Reset"])
  }

  return (
    <div>
      <div className="container">
        <h1>User Dashbord</h1>

        <div className="dashbord">
          <div className="inputSection">
            <div className="nameSection">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                placeholder='Enter first Name' 
                name='name' 
                value={userData.name} 
                onChange={handleChange}
              />
            </div>
            <div className="titleSection">
              <label htmlFor="title">Title:</label>
              <input 
                type="text" 
                placeholder='Enter second Name' 
                name='title' 
                value={userData.title} 
                onChange={handleChange}
              />
            </div>
            <div className="ageSection">
              <label htmlFor="age">Age:</label>age
              <input 
                type="number" 
                placeholder='Enter Age' 
                name='age' 
                value={userData.age} 
                onChange={handleChange}/>
            </div>
            <div className="nameSection">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                placeholder='Enter email' 
                name='email' 
                value={userData.email} 
                onChange={handleChange }
              />
            </div>
          </div>

          <div className="btnSection">
            <button onClick={handleLogin}>
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            {isLoggedIn && (
              <button onClick={handleDetails}>
                {isDetailed ? "Hide Details" : "Show Details"}
              </button>
            )}
          </div>

          {isLoggedIn && isDetailed && (
            <div className="userDetails">
              <h3>User Details</h3>
              <p><strong>Name:</strong> {`${userData.name} ${userData.title}`}</p>
              {/* <p><strong>title:</strong>{userData.title}</p> */}
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <button onClick={handleReset}>Reset</button>
            </div>
          )}

          {activities.length > 0 && (
            <div className="activityLog">
              <h3>React Activities</h3>
              <ul>
                {activities.slice(-5).reverse().map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
