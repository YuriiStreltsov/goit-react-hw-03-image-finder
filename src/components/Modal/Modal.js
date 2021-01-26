import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    console.log(e.target);
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.image;
    return (
      <div onClick={this.handleBackdropClick} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
