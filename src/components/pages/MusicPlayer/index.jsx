import React from 'react';

import DoublyList from './doublylist';
import Title from './Title';
import MusicImage from './Image';
import Control from './Control';
import Songlist from './Mydata';

const newlist = new DoublyList();

export default class MusicPlayer extends React.Component {
  state = {
    data: '',
    play: true,
    shuffle: false,
    progressvalue: 0,
    disableprev: 'disabled',
    disablenext: '',
    disableshuffle: '',
    shuffleicon: 'grey',
    loopicon: 'grey',
    currenttime: '',
    duration: '',
    loop: false
  }

  componentWillMount() {
    Songlist.map((data, i) => {
      newlist.add(data, i);
    });
    if (Songlist.length < 2) {
      this.setState({ disableprev: 'disabled', disablenext: 'disabled', disableshuffle: 'disabled' });
    }
    this.setState({ data: newlist.head });
  }

  disablebutton = (value) => {
    if (value === newlist.tail) {
      this.setState({ disablenext: 'disabled', disableprev: '' });
    } else if (value === newlist.head) {
      this.setState({ disableprev: 'disabled', disablenext: '' });
    } else {
      this.setState({ disableprev: '', disablenext: '' });
    }
  }

  nextnode = () => {
    if (!this.state.shuffle) {
      this.setState({ data: this.state.data.next, progressvalue: 0, play: true });
      this.disablebutton(this.state.data.next);
    } else {
      this.shuffleSong();
    }
  }

  shuffleSong = () => {
    const num = Math.floor(Math.random() * Songlist.length) + 1;
    const newdata = newlist.getNodeAt(num);
    if (this.state.data === newdata) {
      this.shuffleSong();
    } else {
      this.setState({ data: newdata, progressvalue: 0, play: true });
      this.disablebutton(newdata);
    }
  }

  previousnode = () => {
    if (!this.state.shuffle) {
      this.setState({ data: this.state.data.previous, progressvalue: 0, play: true });
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
      this.setState({ shuffle: false, shuffleicon: 'grey' });
    } else {
      this.setState({ shuffle: true, shuffleicon: 'lightskyblue' });
      if (!this.state.play) {
        this.shuffleSong();
      }
    }
  }

  updatetime = () => {
    const mymusic = document.getElementById('mymusic');
    const currentTime = mymusic.currentTime;
    const duration = mymusic.duration;
    const durminutes = Math.floor(duration / 60);
    const durseconds = Math.floor(duration - (durminutes * 60));
    const currminutes = Math.floor(currentTime / 60);
    const currseconds = Math.floor(currentTime - (currminutes * 60));
    this.setState({ progressvalue: ((currentTime * 100) / duration), currenttime: `${currminutes}:${currseconds}`, duration: `${durminutes}:${durseconds}` });
  }

  musicend = () => {
    if (this.state.data.next) {
      this.nextnode();
    }
  }

  updatemusic = () => {
    const music = document.getElementById('mymusic');
    const seekBar = document.getElementById('seek-bar');
    const time = music.duration * (seekBar.value / 100);
    music.currentTime = time;
  }

  isloop = () => {
    if (this.state.loop) {
      this.setState({ loop: false, loopicon: 'grey' });
    } else {
      this.setState({ loop: true, loopicon: 'lightskyblue' });
    }
  }

  render() {
    return (
      <div>
        <div className="outerdiv">
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
            onchangeseek={this.updatemusic}
            playicon={this.state.play ? 'fa fa-pause' : 'fa fa-play'}
            shuffleicon={this.state.shuffleicon}
            currenttime={this.state.currenttime}
            duration={this.state.duration}
            isloop={this.isloop}
            loopicon={this.state.loopicon}
          />
          <audio autoPlay loop={this.state.loop ? 'loop' : ''} id="mymusic" src={this.state.data.data.audio_url} onTimeUpdate={this.updatetime} onEnded={this.musicend} />
        </div>
      </div>
    );
  }
}
