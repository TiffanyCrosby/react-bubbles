import React, { useState, useEffect } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get('/api/colors')
      .then((response) => {
        console.log('Response from ColorList', response);
        setColorList(response.data);
      })
      .catch((error) => console.log('Error from ColorList get request', error));
  }, []);

  return (
    <>
      {/* <h2>Welcome to the Bubbles Page!!!! Bubbles ALL Around!!!!</h2> */}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
