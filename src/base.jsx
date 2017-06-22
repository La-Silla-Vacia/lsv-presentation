import { h, render, Component } from 'preact';
import markdownIt from 'markdown-it';
import cn from 'classnames';

const md = new markdownIt();

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

  setData(rawData) {
    console.log(rawData);
    const data = this.formatData(rawData);
    this.setState({ slides: data, loading: false });
  }

  formatData(data) {
    return data.map((rawItem) => {
      return {
        id: rawItem.id,
        title: rawItem.title,
        subtitle: rawItem.subtitle,
        content: (rawItem.content) ? md.render(rawItem.content) : '',
        image: rawItem.image,
        backgroundImage: rawItem.bg_image,
        backgroundVideo: rawItem.bg_video,
        type: rawItem.type,
        data: rawItem.data
      }
    });
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