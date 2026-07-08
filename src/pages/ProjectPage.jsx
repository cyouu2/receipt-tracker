import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import UploadReceipt from '../components/UploadReceipt';
import ComingSoon from './ComingSoon';

function ProjectPage() {
  const { categoryId, projectId } = useParams();
  const project = projects.find((p) => p.id === projectId && p.categoryId === categoryId);

  if (!project) {
    return <p className="text-gray-500">Project not found.</p>;
  }

  return (
    <div>
      <Link to={`/category/${categoryId}`} className="text-sm text-gray-500 hover:underline">
        ← Back to {categoryId}
      </Link>
      <h2 className="text-xl font-bold text-gray-800 mt-2 mb-4">{project.name}</h2>

      {project.status === 'coming-soon' ? (
        <ComingSoon title={project.name} />
      ) : project.id === 'receipt-tracker' ? (
        <UploadReceipt />
      ) : (
        <ComingSoon title={project.name} />
      )}
    </div>
  );
}

export default ProjectPage;