import React from "react";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import ImageZoom from "react-medium-image-zoom";

const style = {
  width: 400,
  height: 300,
  backgroundSize: "cover"
};
const config = {
  viewedImageSize: 0.8,
  backgroundOpacity: 0.6
};

export default class AlbumGroup extends React.Component {
  render() {
    let photosList = this.props.albumPhotos.map(
      ({ id, photo_130, photo_807, likes }) => {
        let comments = this.props.commentsData.filter(
          comment => comment.pid === id
        );
        let commentsArr = comments.map(c => <div key={c.pid}>{c.text}</div>);
        return (
          <div key={id} className="album-group__item">
            <div className="album-group__item__img">
              <ImageZoom
                image={{
                  src: photo_130,
                  alt: "Golden Gate Bridge",
                  className: "img",
                  width: "130px"
                }}
                zoomImage={{
                  src: photo_807,
                  alt: "Golden Gate Bridge"
                }}
              />
            </div>
            <div className="album-group__item__descr">
              {commentsArr}
              <FaHeart />
              {likes.count}
            </div>
          </div>
        );
      }
    );
    return (
      <IconContext.Provider value={{ color: "red", className: "photo-like" }}>
        <div class="album-group">
          <h2>{this.props.title}</h2>
          <div className="album-group__container">{photosList}</div>
        </div>
      </IconContext.Provider>
    );
  }
}
