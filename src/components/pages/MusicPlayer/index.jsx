import React from 'react';

import DoublyList from './doublylist';
import Title from './Title';
import MusicImage from './Image';
import Control from './Control';
import img from './images/rain.jpg';
import walk from './images/walk.jpg';

const songlist = [
  {
    title: 'First Song',
    image: img,
    audio_url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
  },
  {
    title: 'Second Song',
    image: walk,
    audio_url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3'
  },
  {
    title: 'Third Song',
    image: 'image3',
    audio_url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
  },
  {
    title: 'Fourth Song',
    image: 'image4',
    audio_url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
  },
  {
    title: 'Fifth Song',
    image: 'image5',
    audio_url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
  }
];

const newlist = new DoublyList();

export default class MusicPlayer extends React.Component {
  state = {
    data: '',
    play: true,
    shuffle: false,
    progressvalue: 0,
    disableprev: 'disabled',
    disablenext: '',
    disableshuffle: ''
  }

  componentWillMount() {
    songlist.map((data, i) => {
      newlist.add(data, i);
    });
    if (songlist.length < 2) {
      this.setState({ disableprev: 'disabled', disablenext: 'disabled', disableshuffle: 'disabled' });
    }
    this.setState({ data: newlist.head });
  }

  disablebutton = (value) => {
    if (value === newlist.tail) {
      this.setState({ disablenext: 'disabled' });
    } else if (value === newlist.head) {
      this.setState({ disableprev: 'disabled' });
    } else {
      this.setState({ disableprev: '', disablenext: '' });
    }
  }

  nextnode = () => {
    if (!this.state.shuffle) {
      this.setState({ data: this.state.data.next });
      this.disablebutton(this.state.data.next);
    } else {
      this.shuffleSong();
    }
  }

  shuffleSong = () => {
    const num = Math.floor(Math.random() * songlist.length) + 1;
    const newdata = newlist.getNodeAt(num);
    if (this.state.data === newdata) {
      this.shuffleSong();
    } else {
      this.setState({ data: newdata });
      this.disablebutton(newdata);
    }
  }

  previousnode = () => {
    if (!this.state.shuffle) {
      this.setState({ data: this.state.data.previous });
      this.disablebutton(this.state.data.previous);
    } else {
      this.shuffleSong();
    }
  }

  playpause = () => {
    const mymusic = document.getElementById('mymusic');
    if (this.state.play) {
      mymusic.pause();
      this.setState({ play: false });
    } else {
      mymusic.play();
      this.setState({ play: true });
    }
  }

  shuffle = () => {
    if (this.state.shuffle) {
      this.setState({ shuffle: false });
    } else {
      this.setState({ shuffle: true });
    }
  }

  updatetime = () => {
    const mymusic = document.getElementById('mymusic');
    const currentTime = mymusic.currentTime;
    const duration = mymusic.duration;
    this.setState({ progressvalue: ((currentTime * 100) / duration) });
  }

  musicend = () => {
    this.nextnode();
  }

  render() {
    return (
      <div>
        <Title title={this.state.data.data.title} />
        <MusicImage image={this.state.data.data.image} />
        <Control
          onClicknext={this.nextnode}
          onClickprevious={this.previousnode}
          onClickplay={this.playpause}
          onClickshuffle={this.shuffle}
          progressvalue={this.state.progressvalue}
          disablenext={this.state.disablenext}
          disableprev={this.state.disableprev}
          disableshuffle={this.state.disableshuffle}
        />
        <audio autoPlay id="mymusic" src={this.state.data.data.audio_url} onTimeUpdate={this.updatetime} onEnded={this.musicend} />
      </div>
    );
  }
}
