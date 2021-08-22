import './sass/main.scss';

import { galleryItems } from './js/data-base';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');

const image = modal.querySelector('.lightbox__image');
const button = modal.querySelector('[data-action="close-lightbox"]');
const arrowLeft = modal.querySelector('[data-action="thumb-left"]');
const arrowRight = modal.querySelector('[data-action="thumb-right"]');

const imagesList = galleryItems
  .map(({ preview, original, description: alt } = { el }, idx) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href = "${original}">
            <img class="gallery__image" src="${preview}" alt="${alt}" data-source="${original}" data-id="${idx}" loading="lazy">
        </a>
      </li>`;
  })
  .join('');

gallery.innerHTML = imagesList;

if (!'loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('.gallery__image');

  images.forEach(el => {
    el.classList.add('lazyload');
    el.setAttribute('data-src', galleryItems[el.dataset.id].preview);
    el.removeAttribute('src');
    el.removeAttribute('loading');
  });

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';
  script.referrerPolicy = 'no-referrer';

  document.body.appendChild(script);
}

gallery.addEventListener('click', onModalOpen);

function onModalOpen(e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';

  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    modal.classList.add('is-open');

    getImageOriginal(e.target.dataset.id);

    arrowLeft.addEventListener('click', onLeftArrowClick);
    arrowRight.addEventListener('click', onRightArrowClick);
    window.addEventListener('keydown', onKeyboardSwipePress);

    button.addEventListener('click', onCloseModal);
    modal.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscapePress);
  }
}

function getImageOriginal(id) {
  image.src = galleryItems[id].original;
  image.alt = galleryItems[id].description;
  image.dataset.id = id;
}

function onLeftArrowClick(e) {
  let id = Number(image.dataset.id) - 1;

  if (id < 0) {
    id = galleryItems.length - 1;
  }
  getImageOriginal(id);
}

function onRightArrowClick(e) {
  let id = Number(image.dataset.id) + 1;

  if (id === galleryItems.length) {
    id = 0;
  }
  getImageOriginal(id);
}

function onKeyboardSwipePress(e) {
  if (e.code === 'ArrowLeft') {
    onLeftArrowClick(e);
  } else if (e.code === 'ArrowRight') {
    onRightArrowClick(e);
  } else {
    return;
  }
}

function onCloseModal() {
  image.src = '';
  modal.classList.remove('is-open');
  document.body.style.overflow = 'visible';

  arrowLeft.removeEventListener('click', onLeftArrowClick);
  arrowRight.removeEventListener('click', onRightArrowClick);
  window.removeEventListener('keydown', onKeyboardSwipePress);

  button.removeEventListener('click', onCloseModal);
  modal.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscapePress);
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  } else {
    onCloseModal();
  }
}

function onEscapePress(e) {
  if (e.code !== 'Escape') {
    return;
  } else {
    onCloseModal();
  }
}
