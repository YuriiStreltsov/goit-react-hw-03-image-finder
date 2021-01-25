export default function ImageGalleryItem({ id, tags, webformatURL }) {
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
