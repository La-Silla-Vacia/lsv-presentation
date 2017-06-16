import { h, render, Component } from 'preact';
import cn from 'classnames';

import getData from './Scripts/getData';
import LoadScreen from './Components/LoadScreen';
import Slides from './Components/Slides';

import s from './base.css';

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      slides: [],
      loading: true
    };

    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.setState({ slides: data, loading: false });
  }

  componentWillMount() {
    getData(this.setData);
  }

  render(props, state) {
    const { loading, slides } = state;

    let content = (loading) ? (<LoadScreen />) : (
      <div className={s.inner}>
        <Slides slides={slides} />
      </div>
    );

    return(
      <div className={cn(s.container, {[s.loading]: loading})}>
        { content }
      </div>
    )
  }
}