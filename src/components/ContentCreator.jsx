import { Link } from 'react-router-dom';

const ContentCreator = ({ creator }) => {
  return (
    <article style={{ textAlign: 'center' }}>
      <div>
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={`Profile of ${creator.name}`}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}

        <h2>{creator.name}</h2>

        {creator.description && (
          <p>{creator.description}</p>
        )}

        {creator.url && (
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {creator.url.youtube && (
              <a href={`https://www.youtube.com/@${creator.url.youtube}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa-brands fa-youtube" style={{ fontSize: '1.5rem' }}></i>
              </a>
            )}
            {creator.url.instagram && (
              <a href={`https://www.instagram.com/${creator.url.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram" style={{ fontSize: '1.5rem' }}></i>
              </a>
            )}
            {creator.url.x && (
              <a href={`https://www.x.com/${creator.url.x}`} target="_blank" rel="noopener noreferrer" aria-label="X">
                <i className="fa-brands fa-x-twitter" style={{ fontSize: '1.5rem' }}></i>
              </a>
            )}
          </div>
        )}

        <div className="grid" style={{ marginTop: "1rem", gap: "0.5rem" }}>
          <Link to={`/edit/${creator.id}`} role="button" className="contrast">
             Edit Creator
          </Link>
          <Link to={`/creators/${creator.id}`} role="button">
             View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ContentCreator;
