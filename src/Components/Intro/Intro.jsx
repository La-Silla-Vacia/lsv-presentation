import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Intro.css';
import t from '../../typography.css';

export default class Intro extends Component {
  render(props, state) {
    const { title, subtitle, image, className } = props;
    return (
      <div className={cn(className, s.container)}>
        <img className={s.image} src={image} alt="" />
        <h2 className={t.title}>{title}</h2>
        <h3 className={t.subtitle}>{subtitle}</h3>
      </div>
    )
  }
}