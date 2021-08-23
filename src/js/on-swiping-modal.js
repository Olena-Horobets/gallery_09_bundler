import { refs } from './refs';
import galleryItems from './data-base.json';
import { setImageOriginal } from './set-modal-image';

export const onLeftArrowClick = function (e) {
  let id = Number(refs.image.dataset.id) - 1;

  if (id < 0) {
    id = galleryItems.length - 1;
  }
  setImageOriginal(id);
};

export const onRightArrowClick = function (e) {
  let id = Number(refs.image.dataset.id) + 1;

  if (id === galleryItems.length) {
    id = 0;
  }
  setImageOriginal(id);
};

export const onKeyboardSwipePress = function (e) {
  if (e.code === 'ArrowLeft') {
    onLeftArrowClick(e);
  } else if (e.code === 'ArrowRight') {
    onRightArrowClick(e);
  } else {
    return;
  }
};
