import galleryItems from './data-base.json';

export const lazyLoadingFn = function () {
  if (!'loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('.gallery__image');
    console.log(images);
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
};
