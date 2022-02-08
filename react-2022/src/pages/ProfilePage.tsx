export function ProfilePage() {
  return (
    <>
      <div className="container">
        <h1>profile</h1>
        
        <div className="content">
          <img
            src="https://i.pravatar.cc/150"
            alt="pravatar"
            style={{
              borderRadius: '10rem',
              border: '2px solid black',
            }}
          />
          <h2>@jdoe</h2>

          <span>
            <strong>Followers</strong>
            <small> {Math.ceil(Math.random() * 9999)}</small>
          </span>

          &nbsp;
          &nbsp;

          <span>
            <strong>Following</strong>
            <small> {Math.ceil(Math.random() * 999)}</small>
          </span>

          <div>
            <h3>BIO</h3>

            <small>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias doloribus eaque eligendi mollitia neque quod ratione sunt ullam. Animi omnis totam veritatis! Ea, ratione voluptatibus? Asperiores cum molestias nesciunt quae, quibusdam sit voluptatem!
            </small>
          </div>
        </div>
      </div>
    </>
  );
}