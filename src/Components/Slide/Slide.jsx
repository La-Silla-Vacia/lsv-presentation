import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Slide.css';
import t from '../../typography.css';


export default class Slide extends Component {
  constructor() {
    super();

    this.state = {
      rerender: false,
      hiddenTitle: false
    };

    this.rerender = this.rerender.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  getImage() {
    const { image } = this.props;

    return (
      <img className={s.image} src={image} alt="" />
    );
  }

  rerender() {
    setTimeout(() => {
      this.setState({ rerender: !this.state.rerender });
    }, 10);
  }

  handleVideo() {
    if (!this.video) return;
    if (this.video.paused) {
      this.video.play();
      this.setState({ hiddenTitle: true });
    } else {
      this.video.pause();
      this.setState({ hiddenTitle: false });
    }
  }

  getVideo() {
    const { backgroundVideo } = this.props;
    if (!this.state.rerender) this.rerender();
    return (
      <video ref={(el) => this.video = el} onClick={this.handleVideo} className={s.video}
             autoplay
             controls={true} loop={true}
             muted={true}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }

  getBackgroundImage() {
    const { backgroundImage } = this.props;
    return (
      <div className={s.background} style={{ backgroundImage: `url(${backgroundImage})` }} />
    )
  }

  render(props, state) {
    const { hiddenTitle } = state;
    const { title, subtitle, image, content, className, backgroundVideo, backgroundImage, type } = props;
    const img = (image) ? this.getImage() : false;
    const video = (backgroundVideo) ? this.getVideo() : false;
    const bgImage = (backgroundImage) ? this.getBackgroundImage() : false;
    const fixed = false;
    return (
      <div
        className={cn(
          className,
          s.container,
          { [t.background]: (video || bgImage || type === 'split') },
          { [s.hasBackground]: (video || bgImage) },
          { [s.split]: type === 'split' }
        )}>
        {bgImage}
        {video}
        <div className={s.head}>
          {(img) ? (
            <div className={s.image}>
              {img}
            </div>
          ) : false}
          {(type !== 'split') ? (
            <div>
              <h2 className={cn(t.title, { [t.hidden]: hiddenTitle }, { [t.fixed]: fixed })}>{title}</h2>
              <h3 className={cn(t.subtitle, s.head__subtitle, { [t.hidden]: hiddenTitle }, { [t.fixed]: fixed })}>{subtitle}</h3>
            </div>
          ) : false}
        </div>
        <div className={s.content}>
          {(type === 'split') ? (
            <div>
              <h2 className={cn(t.title, { [t.hidden]: hiddenTitle }, { [t.fixed]: fixed })}>{title}</h2>
              <h3 className={cn(t.subtitle, { [t.hidden]: hiddenTitle }, { [t.fixed]: fixed })}>{subtitle}</h3>
            </div>
          ) : false}
          <div className={t.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    )
  }
}