import { Link, useLoaderData } from "remix";

// server side function
export const loader = () => {
  return {
    posts: [
      {
        id: 1,
        title: 'Post 1',
        body: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: 2,
        title: 'Post 2',
        body: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: 3,
        title: 'Post 3',
        body: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: 4,
        title: 'Post 4',
        body: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: 5,
        title: 'Post 5',
        body: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      {
        id: 6,
        title: 'Post 6',
        body: 'lorem ipsum dolor sit amet, consectetur adip'
      }
    ]
  };
}

export default function PostsItems() {
  const { posts } = useLoaderData();

  return (<>
    <div className="container">
      <div className="page-header">
        <h1>Posts items</h1>
        <Link to="/posts/new" className="button primary">New post</Link>
      </div>

      <ul className="post-list">
        { posts.map(post => (<li key={ post.id } className="post-item">
          <h3>{ post.title }</h3>
          <p>{ post.body }</p>
        </li>)) }
      </ul>
    </div>
  </>);
}