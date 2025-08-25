import { useEffect, useState } from 'react';
import { supabase } from '../client';
import ContentCreator from '../components/ContentCreator';

const ShowCreators = () => {
  const [creators, setCreators] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select();
        setCreators(data);
    };

    fetchCreators();
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        All Content Creators
      </h1>

      {creators && creators.length > 0 ? (
        <div className="grid">
          {creators.map((creator) => (
            <ContentCreator key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'gray' }}>
          No content creators found.
        </p>
      )}
    </div>
  );
};

export default ShowCreators;