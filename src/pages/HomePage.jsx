import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import UserInfo from '../components/UserInfo';
import UpdateProfile from '../components/UpdateProfile';
import LogoutButton from '../components/LogoutButton';
import CoachSelection from '../components/Coachs';

const Home = () => {
  const [selectedCoach, setSelectedCoach] = useState('');
  const location = useLocation();

  // Extract useremail from the location state
  const userEmail = location.state ? location.state.userEmail : null;

  useEffect(() => {
    console.log('User email (from state):', userEmail);
  }, [userEmail]);

  const handleCoachSelect = async (coachName) => {
    try {
      // Make an API request to update the selected coach on the server
      const response = await axios.post('http://localhost:4003/api/updateSelectedCoach', {
        useremail: userEmail,
        coachName: coachName,
      });

      console.log(response.data.message); // Log the success message

      // Update the local state with the selected coach
      setSelectedCoach(coachName);
    } catch (error) {
      console.error('Error updating selected coach:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userEmail && <h1>Hello, {userEmail}!</h1>}
      <UserInfo />
      <UpdateProfile />
      {/* {userEmail && <LogoutButton />} Include LogoutButton if you have it */}
      <CoachSelection onCoachSelect={handleCoachSelect} />
      {selectedCoach && <p>Selected Coach: {selectedCoach}</p>}
    </div>
  );
};

export default Home;
