import React from "react";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import ImageZoom from "react-medium-image-zoom";

export default class PhotoItem extends React.Component {
  render() {
    const { minPhoto, maxPhoto, commentsArr, likesCount } = this.props;
    return (
      <IconContext.Provider value={{ color: "red", className: "photo-like" }}>
        <div className="album-group__item">
          <div className="album-group__item__img">
            <ImageZoom
              image={{
                src: minPhoto,
                alt: "Golden Gate Bridge",
                className: "img",
                width: "130px"
              }}
              zoomImage={{
                src: maxPhoto,
                alt: "Golden Gate Bridge"
              }}
            />
          </div>
          <div className="album-group__item__descr">
            {commentsArr}
            <FaHeart />
            {likesCount}
          </div>
        </div>
      </IconContext.Provider>
    );
  }
}
