// plugins/ImageSlider/index.ts
import React from "react";
import "./styles.css";

const ImageSlider = () => {
  return (
    <div className="image-slider">
      <h3>Image Slider Plugin</h3>
      <div className="slider">
        <img src="https://via.placeholder.com/300" alt="Slide 1" />
       </div>
    </div>
  );
};

export default ImageSlider;
