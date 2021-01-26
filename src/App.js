import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    showModal: false,
    imageModal: {},
  };

  handleSearch = query => {
    this.setState({ query: query });
  };

  openModal = imageModal => {
    this.setState({ showModal: true, imageModal });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { query, showModal, imageModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery query={query} onOpenModal={this.openModal} />

        <ToastContainer position="top-left" autoClose={3000} />
        {showModal && (
          <Modal image={imageModal} onCloseModal={this.closeModal} />
        )}
      </>
    );
  }
}

export default App;
