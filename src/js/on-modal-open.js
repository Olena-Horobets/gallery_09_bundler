import { refs } from './refs';

import { setImageOriginal } from './set-modal-image';

import { onCloseModal } from './on-close-modal';
import { onBackdropClick } from './on-close-modal';
import { onEscapePress } from './on-close-modal';

import { onLeftArrowClick } from './on-swiping-modal';
import { onRightArrowClick } from './on-swiping-modal';
import { onKeyboardSwipePress } from './on-swiping-modal';

export const onModalOpen = function (e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';

  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    refs.modal.classList.add('is-open');

    setImageOriginal(e.target.dataset.id);

    refs.arrowLeft.addEventListener('click', onLeftArrowClick);
    refs.arrowRight.addEventListener('click', onRightArrowClick);
    window.addEventListener('keydown', onKeyboardSwipePress);

    refs.button.addEventListener('click', onCloseModal);
    refs.modal.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscapePress);
  }
};
