import { refs } from './refs';

import { onLeftArrowClick } from './on-swiping-modal';
import { onRightArrowClick } from './on-swiping-modal';
import { onKeyboardSwipePress } from './on-swiping-modal';

export const onCloseModal = function () {
  refs.image.src = '';
  refs.modal.classList.remove('is-open');
  document.body.style.overflow = 'visible';

  refs.arrowLeft.removeEventListener('click', onLeftArrowClick);
  refs.arrowRight.removeEventListener('click', onRightArrowClick);
  window.removeEventListener('keydown', onKeyboardSwipePress);

  refs.button.removeEventListener('click', onCloseModal);
  refs.modal.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscapePress);
};

export const onBackdropClick = function (e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  } else {
    onCloseModal();
  }
};

export const onEscapePress = function (e) {
  if (e.code !== 'Escape') {
    return;
  } else {
    onCloseModal();
  }
};
