const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b;
  },
  norm: (value, min, max) => {
    return (value - min) / (max - min);
  } };


const config = {
  height: window.innerHeight,
  width: window.innerWidth };


class Transition {
  constructor() {
    this.dom = {
      mask: document.querySelector('.js-mask'),
      slices: [...document.querySelectorAll('.js-mask__slice')],
      triggers: [...document.querySelectorAll('.js-trigger')],
      lines: [...document.querySelectorAll('.js-mask-line')],
      logo: document.querySelector('.js-logo'),
      images: [...document.querySelectorAll('.js-transition-img')],
      imagesInner: [...document.querySelectorAll('.js-transition-img__inner')],
      titles: [...document.querySelectorAll('.js-transition-title')] };


    this.tl = null;

    this.state = false;

    this.init();
  }

  resetScroll() {
    window.scrollTo(0, 0);
  }

  createTimeline() {
    this.tl = new TimelineMax({
      paused: true,
      onComplete: () => {
        this.state = false;
      } });


    this.tl.
    set([this.dom.images, this.dom.imagesInner], {
      xPercent: 0,
      scale: 1 }).

    set(this.dom.titles, {
      yPercent: 0 }).

    set(this.dom.mask, {
      autoAlpha: 1 }).

    staggerFromTo(this.dom.slices, 1.5, {
      xPercent: 100 },
    {
      xPercent: 0,
      ease: Expo.easeInOut },
    -0.075).

    addCallback(this.resetScroll.bind(this)).
    addLabel('loaderStart').

    set(this.dom.images, {
      xPercent: -100 }).

    set(this.dom.imagesInner, {
      xPercent: 100 }).

    set(this.dom.titles, {
      yPercent: -100 }).

    set([this.dom.lines[0], this.dom.logo], {
      autoAlpha: 1 }).

    fromTo(this.dom.logo, 1, {
      yPercent: -100,
      rotation: 10 },
    {
      yPercent: 0,
      rotation: 0,
      ease: Expo.easeOut }).

    staggerFromTo(this.dom.lines, 1, {
      scaleX: 0 },
    {
      scaleX: 1,
      ease: Expo.easeInOut },
    0.75, "-=1").
    set(this.dom.lines, {
      transformOrigin: 'right' }).

    fromTo(this.dom.lines[0], 1, {
      scaleX: 1 },
    {
      scaleX: 0,
      ease: Expo.easeInOut }).

    fromTo(this.dom.logo, 1, {
      yPercent: 0 },
    {
      yPercent: 105,
      ease: Expo.easeOut },
    "-=1").
    staggerFromTo(this.dom.slices, 1.5, {
      xPercent: 0 },
    {
      xPercent: 100,
      ease: Expo.easeInOut },
    0.075).
    set(this.dom.mask, {
      autoAlpha: 0 }).


    addLabel('imagesStart', "-=0.85").

    staggerFromTo(this.dom.titles, 1.5, {
      yPercent: 100 },
    {
      yPercent: 0,
      ease: Expo.easeInOut },
    0.05, 'imagesStart').
    staggerFromTo(this.dom.images, 1.25, {
      xPercent: -100 },
    {
      xPercent: 0,
      ease: Expo.easeInOut },
    0.05, 'imagesStart').
    staggerFromTo(this.dom.imagesInner, 1.25, {
      xPercent: 100 },
    {
      xPercent: 0,
      ease: Expo.easeInOut },
    0.05, 'imagesStart').

    addLabel('loaderEnd');
  }

  addEvents() {
    this.dom.triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();

        if (this.state) return;

        this.dom.triggers.forEach(el => {el.classList.remove('is-active');});
        trigger.classList.add('is-active');

        this.state = true;
        this.tl.restart();
      });
    });
  }

  loader() {
    this.resetScroll();
    this.tl.tweenFromTo('loaderStart', 'loaderEnd');
  }

  init() {
    this.createTimeline();
    this.addEvents();
    this.loader();
  }}


// Init classes
// const smooth = new Smooth();
const transition = new Transition();

// See shot - hover
const btn = document.querySelector('.js-menu-btn');

