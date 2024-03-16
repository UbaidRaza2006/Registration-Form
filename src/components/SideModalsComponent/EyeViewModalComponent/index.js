import React, { useState } from 'react';
import RightSideModel from '/src/components/SideModalsComponent/ModalsComponent/index'; // Update the path based on your project structure

const EyeViewComponent = () => {
  const [showModel, setShowModel] = useState(false);

  const handleToggleModel = () => {
    setShowModel(!showModel);
  };

       <button onClick={handleToggleModel}>Hello</button>

      {showModel && (
        <RightSideModel onClose={handleToggleModel}>
          <h2>Right Side Model Content</h2>
          <input type='text'/>
          <p>This is the content inside the right side model.</p>
        </RightSideModel>
      )}

};

export default EyeViewComponent;
