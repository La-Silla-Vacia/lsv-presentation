import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Statistics.css';
import g from '../../grid.css';
import t from '../../typography.css';


export default class Intro extends Component {
  constructor() {
    super();

    this.state = {
      meters: [
        {
          name: "Development",
          amount: `${(91.5 + 104 + 74.75 + 90.5 + 55)} hours`
        },
        {
          name: "LaSillaVacia.com",
          amount: `${(4 + 11.75 + 7.3 + 4.3 + 1.45)} hours`
        },
        {
          name: "GitHub",
          amount: '38 repositories'
        },
        {
          name: "Spreadsheets",
          amount: 40
        }
      ]
    }
  }

  getMeters() {
    const { meters } = this.state;
    return meters.map((meter) => {
      const { name, amount } = meter;
      return (
        <div className={s.meter}>
          <h4>{name}</h4>
          {amount}
        </div>
      )
    });
  }

  render(props, state) {
    const { title, content, className } = props;
    const meters = this.getMeters();

    return (
      <div className={cn(className, s.container)}>
        <h2 className={t.title}>{title}</h2>
        <h3 className={t.subtitle}>{content}</h3>
        <div className={g.row}>
          {meters}
        </div>
      </div>
    )
  }
}