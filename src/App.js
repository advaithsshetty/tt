import React, { useState, useEffect } from 'react';
import Homepage from './Components/Homepage';

function App() {
  const [homepageData, setHomepageData] = useState({});

  useEffect(() => {
    import('./db/c1.json')
      .then(data => setHomepageData(data.Homepage))
      .catch(error => console.error('Error fetching Homepage data:', error));
  }, []);

  return (
    <div>
      <Homepage homepageData={homepageData} />
    </div>
  );
}

export default App;
