import { useParams } from "remix";

export default function Post() {
  const params = useParams();

  return (
    <>
      <div className="container">
        <h1>Post { params.postid }</h1>
      </div>
    </>
  );
}