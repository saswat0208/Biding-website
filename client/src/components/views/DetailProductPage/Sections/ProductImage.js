/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      const images = [];
      console.log(props.detail.images);
      props.detail.images.map((item) => {
        images.push({
          original: `http://localhost:8080/${item}`,
          thumbnail: `http://localhost:8080/${item}`,
        });
      });
      setImages(images);
      console.log(Images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
