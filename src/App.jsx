import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import UploadReceipt from './components/UploadReceipt';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Receipt Tracker 🧾
      </h1>
      <p className="text-gray-600 mb-4">Logged in as {session.user.email}</p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="bg-gray-800 text-white rounded px-4 py-2 mb-4"
      >
        Log Out
      </button>
      <UploadReceipt />
    </div>
  );
}

export default App;