import React, { useState, useEffect } from 'react';
import Imageone from './images/image3.jpg';
import Imagetwo from './images/image1.jpg';
import Imagethree from './images/image2.jpg';
import Imagefour from './images/image4.jpg';
import houseImage from './images/house.jpg';

const ImageChanger = () => {
  // Define an array of image URLs
  const imageUrls = [houseImage,Imageone, Imagetwo, Imagethree, Imagefour];

  // State to store the index of the current background image
  const [imageIndex, setImageIndex] = useState(0);

  // Function to set the next background image
  const setNextBackground = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Set the next background image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(setNextBackground, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className=' h-full border-solid border-[1px] border-slate-300 hover:shadow-lg rounded-md w-full'
      style={{ 
        backgroundImage: `url(${imageUrls[imageIndex]})`, 
        backgroundSize: 'contain', 
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out', // Smooth transition
      }}
    >
   
    </div>
  );
};

export default ImageChanger;
