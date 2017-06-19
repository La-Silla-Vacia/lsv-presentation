import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Iframe.css';
import t from '../../typography.css';

export default class Intro extends Component {
  render(props, state) {
    const { title, subtitle, className, data } = props;
    return (
      <div className={cn(className, s.container)}>
        <h2 className={cn(t.title, t.fixed)}>{title} <span className={t.subtitle}> - {subtitle}</span></h2>
        {/*<h3 className={cn(t.subtitle, t.fixed)}>{subtitle}</h3>*/}
        <iframe className={s.frame} src={data} />
      </div>
    )
  }
}