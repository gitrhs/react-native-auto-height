# react-native-auto-height
this code aims to set image height to auto

## Step by Step

1. create images variable to store the image
```
const images = [
  'URL1', //image 1
  'URL2', //image 2
  //add another image here
];
```
2. create aspect ratio variable
> Set aspectRatio = 1 (1:1), it will be the temporary aspect ratio before the real value counted
```
const [aspectRatios, setAspectRatios] = useState(images.map(() => 1));
```
3. Find the real aspect ratio with useEffect
```
useEffect(() => {
  Promise.all(images.map(imageUrl => new Promise((resolve, reject) => {
    Image.getSize(imageUrl, (width, height) => {
      resolve(width / height);
    }, reject);
  }))).then(ratios => {
    setAspectRatios(ratios);
  });
}, []);
   ```
4. Return the Image
```
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
```


## Full Code Example:
```
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
```

   
