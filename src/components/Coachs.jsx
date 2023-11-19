import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoachSelection = ({ onCoachSelect }) => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState('');

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get('http://localhost:4003/api/coaches');
      setCoaches(response.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  const handleCoachSelect = (value) => {
    setSelectedCoach(value);
  };

  const handleConfirmation = () => {
    if (selectedCoach) {
      onCoachSelect(selectedCoach);
    } else {
      alert('Please select a coach before confirming.');
    }
  };

  return (
    <div>
      <label>Select Coach</label>
      <select onChange={(e) => handleCoachSelect(e.target.value)}>
        <option value="">Select a coach</option>
        {coaches.map((coach) => (
          <option key={coach.id} value={coach.name}>
            {coach.name}
          </option>
        ))}
      </select>
      <button onClick={handleConfirmation}>Confirm Selection</button>
    </div>
  );
};

export default CoachSelection;
