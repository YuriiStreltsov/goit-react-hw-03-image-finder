import ImageGalleryItem from './ImageGalleryItem';
import { Component, Fragment } from 'react';
import imageAPI from '../../services/imageAPI';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    error: null,
    loader: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.query;
    const nextSearchQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ loader: true });
      imageAPI
        .fetchImage(nextSearchQuery, 1)
        .then(images => {
          this.setState({
            images: images,
            status: 'resolved',
            loader: false,
          });
          if (images.length === 0) {
            toast.warn(
              'No results were found for this request, please enter a more specific request',
            );
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage) {
      this.setState({ loader: true });

      imageAPI
        .fetchImage(nextSearchQuery, nextPage)
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images],
            status: 'resolved',
            loader: false,
          });

          this.scrollToBottom();
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, images, error, loader } = this.state;

    if (status === 'idle') {
      return <></>;
    }
    if (status === 'resolved') {
      return (
        <Fragment>
          <ul className="ImageGallery">
            {images.map(({ tags, webformatURL }, index) => (
              <ImageGalleryItem
                key={index}
                id={index}
                tags={tags}
                webformatURL={webformatURL}
              />
            ))}
          </ul>
          {images.length > 0 && <Button onClick={this.handleClickLoadMore} />}

          <Loader
            visible={loader}
            className="Loader"
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        </Fragment>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
  }
}

export default ImageGallery;

// toast.error("No results were found for this request, please enter a more specific request")
