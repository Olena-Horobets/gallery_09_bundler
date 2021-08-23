import { refs } from './js/refs';
import galleryItems from './js/data-base.json';

import galleryCardTpl from './templates/gallery-card.hbs';
import { lazyLoadingFn } from './js/lazy-loading';

import { onModalOpen } from './js/on-modal-open';

import './sass/main.scss';

const imagesList = galleryCardTpl(galleryItems);

refs.gallery.innerHTML = imagesList;
lazyLoadingFn();

refs.gallery.addEventListener('click', onModalOpen);
