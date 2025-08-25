import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    url: { youtube: '', x: '', instagram: '' },
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (data) {
        setFormData({
          name: data.name || '',
          imageURL: data.imageURL || '',
          description: data.description || '',
          url: {
            youtube: data.url?.youtube || '',
            x: data.url?.x || '',
            instagram: data.url?.instagram || '',
          },
        });
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['youtube', 'x', 'instagram'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        url: { ...prev.url, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredUrls = Object.fromEntries(
      Object.entries(formData.url).filter(([_, value]) => value !== '')
    );

    await supabase
      .from('creators')
      .update({
        name: formData.name,
        url: filteredUrls,
        description: formData.description || null,
        imageURL: formData.imageURL || null,
      })
      .eq('id', id);

    navigate(`/creators/${id}`);
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <article>
        <hgroup style={{ textAlign: 'center' }}>
          <h2>Edit Content Creator</h2>
          <p>Update the details for this content creator.</p>
        </hgroup>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Creator's Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="imageURL">Image URL</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            placeholder="e.g., https://example.com/image.jpg"
            value={formData.imageURL}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="A brief description of the creator."
            value={formData.description}
            onChange={handleChange}
          />

          <fieldset>
            <legend>Social Media Handles</legend>
            <div className="grid">
              <label htmlFor="youtube">
                YouTube Handle
                <input
                  type="text"
                  id="youtube"
                  name="youtube"
                  placeholder="youtube_username"
                  value={formData.url.youtube}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="x">
                X (Twitter) Handle
                <input
                  type="text"
                  id="x"
                  name="x"
                  placeholder="x_username"
                  value={formData.url.x}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="instagram">
                Instagram Handle
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="instagram_username"
                  value={formData.url.instagram}
                  onChange={handleChange}
                />
              </label>
            </div>
          </fieldset>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit">Update Creator</button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default EditCreator;
