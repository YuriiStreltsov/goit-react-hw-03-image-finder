export default function ImageGalleryItem({ id, tags, webformatURL }) {
  //   const { webformatURL } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
