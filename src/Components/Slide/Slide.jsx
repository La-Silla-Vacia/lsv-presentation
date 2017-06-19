import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Slide.css';
import g from '../../grid.css';
import t from '../../typography.css';


export default class Slide extends Component {
  render(props, state) {
    const { title, subtitle, content, className } = props;

    return (
      <div className={cn(className, s.container)}>
        <h2 className={t.title}>{title}</h2>
        <h3 className={t.subtitle}>{subtitle}</h3>
        <div className={t.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}