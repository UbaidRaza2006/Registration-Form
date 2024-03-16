import React, { useState } from 'react';
import RightSideModel from '/src/components/SideModalsComponent/ModalsComponent/index'; // Update the path based on your project structure

const YourPageComponent = () => {
  const [showModel, setShowModel] = useState(false);

  const handleToggleModel = () => {
    setShowModel(!showModel);
  };

  return (
    <div>
      {/* <h1>Your Page Content</h1>
      <p>This is your main page content.</p> */}

      <button onClick={handleToggleModel}>Toggle Right Side Model</button>

      {showModel && (
        <RightSideModel onClose={handleToggleModel}>
          <h2>Right Side Model Content</h2>
          <input type='text'/>
          <p>This is the content inside the right side model.</p>
        </RightSideModel>
      )}
    </div>
  );
};

export default YourPageComponent;
