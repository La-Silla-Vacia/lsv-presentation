import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Slides.css';
import t from '../../typography.css';

import Intro from '../Intro';
import Statistics from '../Statistics';

export default class Slides extends Component {
  constructor() {
    super();

    this.state = {
      current: 4,
      full: false
    };

    this.handleKeys = this.handleKeys.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys);
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
      default:
        return (
          <div>{currentSlide.title}</div>
        )
    }
  }

  handleKeys(e) {
    e.preventDefault();
    const { code } = e;
    if (code === 'ArrowLeft') {
      this.handlePrev();
    } else if (code === 'ArrowRight') {
      this.handleNext();
    } else if (code === 'Escape') {
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

    return (
      <div className={cn(s.container, { [s.full]: full }, t.root)}>
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