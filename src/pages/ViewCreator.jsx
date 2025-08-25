import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select()
        .eq('id', id).single();
      setCreator(data);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    await supabase
      .from('creators')
      .delete()
      .eq('id', id);
    navigate('/');
  };

  return (
    <section
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {creator ? (
        <article
          className="creator-details"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            width: "100%"
          }}
        >
          {creator.imageURL && (
            <img
              src={creator.imageURL}
              alt={`Profile of ${creator.name}`}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1.5rem",
                border: "2px solid var(--pico-muted-border-color)"
              }}
            />
          )}

          <hgroup>
            <h1>{creator.name}</h1>
            <p>@{creator.url?.x || creator.url?.instagram || creator.url?.youtube || "No handle available"}</p>
          </hgroup>

          {creator.description && (
            <>
              <h5 style={{ marginBottom: "0.5rem", marginTop: "1rem" }}>Description:</h5>
              <p>{creator.description}</p>
            </>
          )}

          {creator.url && (
            <>
              <h5>Social Media</h5>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'center'
                }}
              >
                {creator.url?.youtube && (
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={`https://www.youtube.com/@${creator.url.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🎥 YouTube: {creator.url.youtube}
                    </a>
                  </li>
                )}
                {creator.url?.x && (
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={`https://www.x.com/${creator.url.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🐦 X (Twitter): {creator.url.x}
                    </a>
                  </li>
                )}
                {creator.url?.instagram && (
                  <li style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={`https://www.instagram.com/${creator.url.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📸 Instagram: {creator.url.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </>
          )}

          <footer style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link to={`/edit/${creator.id}`} role="button" className="secondary">Edit Creator</Link>
            <button onClick={handleDelete} className="contrast">Delete Creator</button>
          </footer>
        </article>
      ) : (
        <p className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>
          No content creator found.
        </p>
      )}

      {showConfirmModal && (
        <dialog open style={{ textAlign: 'center' }}>
          <article>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {creator.name}?</p>
            <footer>
              <a href="#cancel" role="button" className="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</a>
              <button className="contrast" onClick={confirmDelete}>Delete</button>
            </footer>
          </article>
        </dialog>
      )}
    </section>
  );
};

export default ViewCreator;
