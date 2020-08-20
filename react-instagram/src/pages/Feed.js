import React, { Component } from 'react';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  render() {
    return (
      <section id="post-list">
        <article>
          <header>
            <div className="user-info">
              <span className="name">Diego Fernandes</span>
              <span className="place">Rio do Sul</span>
            </div>

            <img src={more} alt="more"/>
          </header>

          <img src="https://avatars0.githubusercontent.com/u/2254731?s=460&u=c34dfbafb54d6bb7c3f715ebe93a811cc7355771&v=4" alt=""/>

          <footer>
            <div className="actions">
              <img src={like} alt="like"/>
              <img src={comment} alt="comment"/>
              <img src={send} alt="send"/>
            </div>

            <strong>900 curtidas</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              <span>#react #awesome #magic</span>
            </p>
          </footer>
        </article>

        <article>
          <header>
            <div className="user-info">
              <span className="name">Diego Fernandes</span>
              <span className="place">Rio do Sul</span>
            </div>

            <img src={more} alt="more"/>
          </header>

          <img src="https://avatars0.githubusercontent.com/u/2254731?s=460&u=c34dfbafb54d6bb7c3f715ebe93a811cc7355771&v=4" alt=""/>

          <footer>
            <div className="actions">
              <img src={like} alt="like"/>
              <img src={comment} alt="comment"/>
              <img src={send} alt="send"/>
            </div>

            <strong>900</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              <span>#react #awesome #magic</span>
            </p>
          </footer>
        </article>
      </section>
    );
  }
}

export default Feed;
