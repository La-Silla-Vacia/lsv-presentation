import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Slides.css';
import t from '../../typography.css';

let socket;

import Slide from '../Slide';
import Intro from '../Intro';
import Statistics from '../Statistics';
import Iframe from '../Iframe';

export default class Slides extends Component {
  constructor() {
    super();

    this.state = {
      current: 0,
      full: false,
    };

    this.handleKeys = this.handleKeys.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys);

    if (window.location.hash) {
      this.setState({ current: window.location.hash.replace('#', '') });
    }

    if (io) {
      socket = io();
      this.listenToSocket();
    }
  }

  listenToSocket() {
    socket.on('change', (current) => {
      this.setState({ current });
    });
  }

  getSlide() {
    const { current } = this.state;
    const { slides } = this.props;

    const currentSlide = slides[current];
    if (!currentSlide) return;
    currentSlide.className = s.slide;
    switch (currentSlide.type) {
      case 'intro':
        return (
          <Intro {...currentSlide} />
        );
        break;
      case 'statistics':
        return (
          <Statistics {...currentSlide} />
        );
        break;
      case 'iframe':
        return (
          <Iframe {...currentSlide} />
        );
        break;
      default:
        return (
          <Slide {...currentSlide} />
        )
    }
  }

  handleKeys(e) {
    // e.preventDefault();
    const code = e.code;
    const { current } = this.state;
    const { slides } = this.props;
    // console.log(code);
    if (code === 'ArrowLeft') {
      this.handlePrev();
      if (socket) socket.emit('change', (current > 0) ? current - 1 : 0);
    } else if (code === 'ArrowRight') {
      this.handleNext();
      if (socket) socket.emit('change', (current < slides.length - 1) ? current + 1 : current);
    } else if (code === 'Escape') {
      this.setState({ full: false });
    } else if (code === 'KeyF') {
      this.setState({ full: !this.state.full });
    }
  }

  handlePrev() {
    const { current } = this.state;
    this.setState({ current: (current > 0) ? current - 1 : 0 });
  }

  handleNext() {
    const { current } = this.state;
    const { slides } = this.props;
    this.setState({ current: (current < slides.length - 1) ? current + 1 : current });
  }

  render(props, state) {
    const { current, full } = state;
    const { slides } = props;
    const percentage = (current + 1) * 100 / slides.length;
    const slide = this.getSlide();

    const currentSlide = slides[current];
    const black = (currentSlide.backgroundVideo) ? true : false;
    return (
      <div className={cn(s.container, { [s.full]: full }, t.root, { [s.black]: black })}>
        {slide}
        {/*<div>*/}
        {/*<button className={s.button} onClick={this.handlePrev} />*/}
        {/*<button className={s.button} onClick={this.handleNext} />*/}
        {/*</div>*/}
        <div className={s.indicator} style={{ width: `${percentage}%` }} />
      </div>
    )
  }
}