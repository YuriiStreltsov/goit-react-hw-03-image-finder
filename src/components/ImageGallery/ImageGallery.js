import ImageGalleryItem from './ImageGalleryItem';
import { Component } from 'react';
import imageAPI from '../../services/imageAPI';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.query;
    const nextSearchQuery = this.props.query;
    console.log(nextSearchQuery);
    if (prevSearchQuery !== nextSearchQuery) {
      imageAPI
        .fetchImage(nextSearchQuery)
        .then(images => this.setState({ images, status: 'resolved' }));
    }
  }
  render() {
    const { status } = this.state;
    const { images } = this.state;
    if (status === 'idle') {
      return <p>Enter query</p>;
    }
    if (status === 'resolved') {
      return <p>Resolved</p>;
    }
  }
}

//  <ul className="ImageGallery">
//    {images.map(({ id, tags, webformatURL }) => (
//      <ImageGalleryItem
//        key={id}
//        id={id}
//        tags={tags}
//        webformatURL={webformatURL}
//      />
//    ))}
//  </ul>;

export default ImageGallery;
