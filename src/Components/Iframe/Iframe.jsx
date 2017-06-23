import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Iframe.css';
import t from '../../typography.css';

export default class Intro extends Component {
  render(props, state) {
    const { title, subtitle, className, data, content } = props;

    return (
      <div className={cn(className, s.container)}>
        <h2 className={cn(t.title, t.fixed)}>{title} {(subtitle) ? (<span className={t.subtitle}> - {subtitle}</span>) : false}</h2>
        <iframe className={cn(s.frame, {[s.compact]: (content.indexOf('compact') !== -1)})} src={data} />
      </div>
    )
  }
}