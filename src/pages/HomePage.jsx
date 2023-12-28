import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../components/UserInfo';
import UpdateProfile from '../components/UpdateProfile';
import LogoutButton from '../components/LogoutButton';
import CoachSelection from '../components/Coachs';
import '../index.css'; // Import the CSS file

const Home = () => {
  const [selectedCoach, setSelectedCoach] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointments, setAppointments] = useState('');
  const location = useLocation();
  const userEmail = location.state ? location.state.userEmail : null;


  const fetchAppointments = async () => {
    try {
      // Make an API request to get appointments for the user
      const response = await axios.get(`http://localhost:4003/api/appointments/${userEmail}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Fetch appointments when the component mounts
    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);
  

  

  const handleCoachSelect = async (coachName) => {
    try {
      const response = await axios.post('http://localhost:4003/api/updateSelectedCoach', {
        useremail: userEmail,
        coachName: coachName,
      });

      console.log(response.data.message);
      setSelectedCoach(coachName);
    } catch (error) {
      console.error('Error updating selected coach:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:4003/api/sendMessage', {
        senderEmail: userEmail,
        receiverCoach: selectedCoach,
        content: message,
      });

      console.log("log:", response.data.message);
      setSentMessages([...sentMessages, { sender: userEmail, content: message }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleScheduleAppointment = async () => {
    try {
      const response = await axios.post('http://localhost:4003/api/scheduleAppointment', {
        userEmail,
        coachName: selectedCoach,
        appointmentDate,
      });

      console.log(response.data.message);
      console.log("appointments:::",appointments);
      fetchAppointments();
      //setAppointments([...appointments, { coachName: selectedCoach, appointmentDate: appointmentDate }]);
      setAppointmentDate('');
      setAppointments('');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userEmail && <h1>Hello, {userEmail}!</h1>}
      <UserInfo />
      <UpdateProfile />
      {/* Include LogoutButton if you have it */}
      {/* {userEmail && <LogoutButton />} */}
      <CoachSelection onCoachSelect={handleCoachSelect} />
      {selectedCoach && <p>Your Coach: {selectedCoach}</p>}

      <div>
        <h2>Send Message to {selectedCoach}</h2>
        <textarea
          rows="4"
          cols="50"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      {sentMessages.length > 0 && (
        <div>
          <h2>Sent Messages</h2>
          <ul>
            {sentMessages.map((msg, index) => (
              <li key={index}>{`${msg.sender}: ${msg.content}`}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Schedule Appointment with {selectedCoach}</h2>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <button onClick={handleScheduleAppointment}>Schedule Appointment</button>
      </div>
      {appointments.length > 0 && (
        <div>
          <h2>Scheduled Appointments</h2>
          <ul>
            {appointments.map((apt, index) => (
              <li key={index}>{`${apt.coachName}: ${apt.appointmentDate}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
// appointments=[{john,11/30/2023},]


export default Home;
