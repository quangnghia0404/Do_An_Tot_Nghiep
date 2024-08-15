import React from "react";
import Members from "../mainspage/members/Members";
import SlideShow from "../slideshow/SlideShow";
import Feling from "../slideshow/Felling";
import Products from "../mainspage/products/Products";
import Time from "../footers/Time";
import ContactHome from "../mainspage/contact/ContactHome";

function Home() {
  return (
    <div>
      <SlideShow />
      <Products />
      <Feling />
      <Members />
      <Time />
      <ContactHome />
    </div>
  );
}

export default Home;
