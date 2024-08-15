import React from "react";
import images1 from "./images/b1.jpg";
import images2 from "./images/a1.jpg";
import images3 from "./images/c1.png";

function SlideShow() {
  return (
    <div
      className="slider wow bounceInLeft"
      data-wow-duration="1.1s"
      data-interval="800"
    >
      <div id="mycarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#mycarousel" data-slide-to={0} className="active" />
          <li data-target="#mycarousel" data-slide-to={1} />
          <li data-target="#mycarousel" data-slide-to={2} />
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img src={images1} alt="" className="img-fluid" height="400" />
          </div>
          <div className="carousel-item">
            <img src={images2} alt="" className="img-fluid" height="400" />
          </div>
          <div className="carousel-item">
            <img src={images3} alt="" className="img-fluid" height="400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
