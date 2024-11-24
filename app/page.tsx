export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the CMS</h1>
      <p className="text-lg mt-4">Manage your content easily with our user-friendly interface.</p>
      <div className="mt-4 space-x-4">
        <a href="/create-post" className="px-4 py-2 bg-blue-500 text-white rounded mr-4">Create Post</a>
        <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded">Dashboard</a>
      </div>
    </div>
  );
}
