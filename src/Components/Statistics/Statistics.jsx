import { h, render, Component } from 'preact';
import cn from 'classnames';
import s from './Statistics.css';
import g from '../../grid.css';
import t from '../../typography.css';

export default class Statistics extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      meters: []
    }
  }

  componentDidMount() {
    this.formatData();
  }

  componentWillReceiveProps(newProps) {
    this.formatData(newProps);
  }

  formatData(newProps) {
    const props = (newProps) ? newProps : this.props;
    const data = props.data.split("\n");
    const meters = data.map((meter) => {
      const item = meter.split(':');
      return {
        name: item[0],
        amount: Number(item[1]),
        description: item[2].replace(/,/g, '<br />')
      }
    });
    this.setState({ meters });
    setTimeout(() => this.setState({ show: true }), 100);
  }

  getMeters() {
    const { meters, show } = this.state;
    let total = 0;
    for (let meter of meters) {
      total += meter.amount;
    }

    return meters.map((meter) => {
      const { name, amount, description } = meter;
      const percentage = amount * 100 / total;
      return (
        <div className={s.meter}>
          <div className={s.description} style={{ bottom: `${percentage}%` }}>
            <h4>{name}</h4>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div className={cn(s.bar, { [s.show]: show })} style={{ height: `${percentage}%` }} />
        </div>
      )
    });
  }

  render(props, state) {
    const { title, content, className } = props;
    const meters = this.getMeters();

    return (
      <div className={cn(className, s.container)}>
        <h2 className={cn(t.title, t.fixed)}>{title}</h2>
        <h3 className={t.subtitle}>{content}</h3>
        <div className={cn(g.row, s.meters)}>
          {meters}
        </div>
      </div>
    )
  }
}