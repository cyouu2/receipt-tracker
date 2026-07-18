import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Projects from './pages/Projects';
import CategoryFolder from './pages/CategoryFolder';
import ProjectPage from './pages/ProjectPage';
import ComingSoon from './pages/ComingSoon';
import Footer from './components/Footer';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar email={session.user.email} onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="max-w-3xl mx-auto px-4 pt-20 pb-8">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/category/:categoryId" element={<CategoryFolder />} />
          <Route path="/category/:categoryId/:projectId" element={<ProjectPage />} />
          <Route path="/dashboard" element={<ComingSoon title="Dashboard" />} />
          <Route path="/explore" element={<ComingSoon title="Explore" />} />
          <Route path="/account" element={<ComingSoon title="Account" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;