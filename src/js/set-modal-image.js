import { refs } from './refs';
import galleryItems from './data-base.json';

export const setImageOriginal = function (id) {
  refs.image.src = galleryItems[id].original;
  refs.image.alt = galleryItems[id].description;
  refs.image.dataset.id = id;
};
