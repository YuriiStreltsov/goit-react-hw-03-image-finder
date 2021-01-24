import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import images from './components/ImageGallery/data.json';
import { Component } from 'react';
// import imageAPI from './services/imageAPI';

class App extends Component {
  state = {
    query: '',
  };

  handleSearch = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery query={query} />
      </>
    );
  }
}

export default App;
