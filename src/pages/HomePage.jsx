import React, { useState } from 'react';
import UserInfo from '../components/UserInfo';
import UpdateProfile from '../components/UpdateProfile';
import LogoutButton from '../components/LogoutButton';
import CoachSelection from '../components/Coachs'; // Import the CoachSelection component

const Home = () => {
  const [selectedCoach, setSelectedCoach] = useState('');

  const handleCoachSelect = (coachname) => {
    setSelectedCoach(coachname);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <UserInfo />
      <UpdateProfile />
      {/* <LogoutButton /> */}
      
      <CoachSelection onCoachSelect={handleCoachSelect} />

      {/* Display selected coach */}
      {selectedCoach && <p>Selected Coach: {selectedCoach}</p>}
    </div>
  );
};

export default Home;
