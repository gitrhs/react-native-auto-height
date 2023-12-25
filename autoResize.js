import React, { useState, useEffect } from 'react';
const autoResize = () => {
  const images = [
      'URL1', //image 1
      'URL2', //image 2
      //add another image here
    ];
  const [aspectRatios, setAspectRatios] = useState(images.map(() => 1));
  useEffect(() => {
    Promise.all(images.map(imageUrl => new Promise((resolve, reject) => {
      Image.getSize(imageUrl, (width, height) => {
        resolve(width / height);
      }, reject);
    }))).then(ratios => {
      setAspectRatios(ratios);
    });
   }, []);
  return (
    {images.map((imageUrl, index) => (
     <View key={index}>
       <Image
         style={{
           width: '100%',
           aspectRatio: aspectRatios[index],
         }}
         resizeMode={'contain'}
         source={{ uri: imageUrl }}
       />
     </View>
   ))}
  );
};
