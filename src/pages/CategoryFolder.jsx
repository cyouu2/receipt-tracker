import { useParams, Link } from 'react-router-dom';
import { categories, projects } from '../data/projects';

function CategoryFolder() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProjects = projects.filter((p) => p.categoryId === categoryId);

  if (!category) {
    return <p className="text-gray-500">Category not found.</p>;
  }

  return (
    <div>
      <Link to="/" className="text-sm text-gray-500 hover:underline">
        ← Back to all categories
      </Link>
      <h2 className="text-xl font-bold text-gray-800 mt-2 mb-1">
        {category.icon} {category.name}
      </h2>
      <p className="text-gray-500 mb-6">{category.description}</p>

      <div className="grid grid-cols-2 gap-4">
        {categoryProjects.map((project) => (
          <Link
            key={project.id}
            to={`/category/${categoryId}/${project.id}`}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition relative"
          >
            {project.status === 'coming-soon' && (
              <span className="absolute top-3 right-3 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                Coming soon
              </span>
            )}
            <h3 className="font-semibold text-gray-800">{project.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryFolder;