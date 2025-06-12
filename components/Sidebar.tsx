import ListaChamados from './ListaChamados';

export default function Sidebar() {
  return (
    <aside className="w-80 bg-gray-900 p-4">
      <h2 className="text-white text-lg font-bold mb-4">Conversas</h2>
      <ListaChamados />
    </aside>
  );
} 