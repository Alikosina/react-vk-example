import React from "react";
import fetchJsonp from "fetch-jsonp";
import AlbumGroup from "../components/AlbumGroup";
import { css } from "react-emotion";
// First way to import
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      albums: [],
      comments: [],
      photosLoaded: false,
      commentsLoaded: false,
      albumsLoaded: false,
      clientId: 6683807,
      token: this.props.token
    };
  }

  componentDidMount() {
    fetchJsonp(
      `https://api.vk.com/method/photos.getAlbums?need_system=1&access_token=${
        this.state.token
      }&v=5.52`
    )
      .then(data => data.json())
      .then(({ response }) => {
        this.setState({ albums: response.items, albumsLoaded: true });
      })
      .then(() => {
        fetchJsonp(
          `https://api.vk.com/method/photos.getAll?count=200&extended=1&access_token=${
            this.state.token
          }&v=5.52`
        )
          .then(data => data.json())
          .then(({ response }) => {
            this.setState({ photos: response.items, photosLoaded: true });
            setTimeout(() => {
              this.getPhotoComments();
            }, 500);
          });
      })
      .catch(ex => {});
  }

  getPhotoComments() {
    setTimeout(() => {
      fetchJsonp(
        `https://api.vk.com/method/photos.getAllComments?owner_id=151302636&access_token=${
          this.state.token
        }&v=5.52`
      )
        .then(comments => comments.json())
        .then(commentsData => {
          this.setState({
            comments: commentsData.response.items,
            commentsLoaded: true
          });
        });
    }, 500);
  }

  getPhotoData(photo) {
    let photosInfo = this.state.photosInfo;
    let photoId = photo.id;
    let userId = photo.owner_id;
    setTimeout(() => {
      fetchJsonp(
        `https://api.vk.com/method/photos.getById?photos=${userId}_${photoId}&extended=1&access_token=${
          this.state.token
        }&v=5.52`
      )
        .then(photoData => photoData.json())
        .then(photoInfo => {
          photoInfo.response[0].photo_id = photoId;
          photosInfo.push(photoInfo.response[0]);
          this.setState({ photosInfo });
        })
        .catch(ex => {
          console.log("parsing failed", ex);
        });
    }, 500);
  }

  render() {
    const { photosLoaded, albumsLoaded, commentsLoaded } = this.state;
    const loaded = photosLoaded && albumsLoaded && commentsLoaded;
    let alboumGroups = this.state.albums.map(album => {
      let albumPhotos = this.state.photos.filter(
        photo => photo.album_id === album.id
      );
      return albumPhotos.length ? (
        <AlbumGroup
          key={album.id}
          title={album.title}
          albumPhotos={albumPhotos}
          commentsData={this.state.comments}
        />
      ) : (
        ""
      );
    });
    if (!loaded) {
      return (
        <div className="app-loader">
          {" "}
          <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return <div>{alboumGroups}</div>;
  }
}
