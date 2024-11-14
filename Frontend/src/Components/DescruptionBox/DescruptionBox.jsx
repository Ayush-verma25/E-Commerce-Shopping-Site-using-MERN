import React from "react";
import "./DescruptionBox.css";

const DescruptionBox = () => {
  return (
    <div className="descruptionbox">
      <div className="descruptionbox-navigation">
        <div className="descruptionbox-nav-box">Description</div>
        <div className="descruptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descruptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, libero,
          natus quod nobis temporibus adipisci non aliquam fugit in veritatis ea
          eligendi alias? Cupiditate non quaerat alias odit at sunt mollitia
          voluptatum beatae rem molestiae.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. At,
          perferendis enim! Sunt, sint cupiditate velit labore excepturi error
          mollitia dolores delectus at?
        </p>
      </div>
    </div>
  );
};

export default DescruptionBox;
