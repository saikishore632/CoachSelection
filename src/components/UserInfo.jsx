import React from 'react';

const UserInfo = () => {
  // Get user info from your authentication context or API
  const user = {
    name: 'John Doe',
    logoUrl: 'path_to_logo_image.jpg',
  };

  return (
    <div>
      {/* <img src={user.logoUrl} alt="User Logo" />
      <p>{user.name}</p> */}
    </div>
  );
};

export default UserInfo;
