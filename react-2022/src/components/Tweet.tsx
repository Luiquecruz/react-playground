import './Tweet.css'

type TweetProps = {
  title: string,
  text: string;
}

export function Tweet(props: TweetProps) {
  return (
    <div className="tweet">
      <h4 className="tweet__title">{ props?.title }</h4>
      <p className="tweet__text">{ props?.text}</p>
    </div>
  );
}
