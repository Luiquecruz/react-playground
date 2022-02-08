import {Tweet} from "../components/Tweet";
import {useState} from "react";

export function TweetsPage() {
  const [tweets, setTweets] = useState<string[]>([
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi dolore doloribus et facilis id illum iste iusto magnam nostrum odio, omnis, quos ratione sapiente voluptate. Aspernatur ex exercitationem quo?"
  ]);

  const createTweet = () => {
    console.log('created')
    setTweets([...tweets, 'SOMETHING']);
  }

  return (
    <>
      <div className="container">
        <h1>Tweets</h1>

        {tweets.map((t, i) => (
            <Tweet
              key={i}
              title={`Tweet ${i++}`}
              text={t}
            />
          )
        )}

        <button
          onClick={createTweet}
          style={{
            position: 'fixed',
            bottom: '0',
            left: '2rem',
            maxWidth: 'calc(100% - 4rem)',
            backgroundColor: 'white',
            border: '2px solid black',
          }}
        >
          Tweet something
        </button>
      </div>
    </>
  );
}