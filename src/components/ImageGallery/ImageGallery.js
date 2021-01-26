import ImageGalleryItem from './ImageGalleryItem';
import { Component, Fragment } from 'react';
import imageAPI from '../../services/imageAPI';
import Button from '../Button/Button';
import { toast } from 'react-toastify';

import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    error: null,
    loader: true,
  };

  fetchOnSubmitForm = (prevSearchQuery, nextSearchQuery) => {
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
        .catch(e => console.log(e));
    }
  };

  fetchOnLoadMoreBtn = (prevPage, nextPage, nextSearchQuery, prevState) => {
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
        .catch(error => {
          this.setState({ status: 'rejected' });
          console.log(error);
        });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.query;
    const nextSearchQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    this.fetchOnSubmitForm(prevSearchQuery, nextSearchQuery);
    this.fetchOnLoadMoreBtn(prevPage, nextPage, nextSearchQuery, prevState);
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

  findImageById = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const { images } = this.state;

    const findElem = images[e.target.id];

    this.props.onOpenModal(findElem);
  };

  render() {
    const { status, images, loader } = this.state;

    if (status === 'idle') {
      return <></>;
    }
    if (status === 'resolved') {
      return (
        <Fragment>
          <ul onClick={this.findImageById} className="ImageGallery">
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
  }
}

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
