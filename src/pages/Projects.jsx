import { Link } from 'react-router-dom';
import { categories } from '../data/projects';

function Projects() {
  return (
    <div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 mt-3">
            <span class="mr-3">Welcome to</span>
            <span class="font-mono">iris archive</span>
        </h2>
      <p className="text-gray-500 mb-8">a collection of my mini projects, because i didn't save my school projects...</p>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <h3 className="font-semibold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;