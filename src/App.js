import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';

// import imageAPI from './services/imageAPI';

class App extends Component {
  state = {
    query: '',
  };

  handleSearch = query => {
    this.setState({ query: query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery query={query} />

        <ToastContainer position="top-left" autoClose={3000} />
      </>
    );
  }
}

export default App;
