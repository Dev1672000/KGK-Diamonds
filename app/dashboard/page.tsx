"use client"; 

import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string; 
};

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState<Post>({
    id: "",
    title: "",
    slug: "",
    content: "",
  });
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

 
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something here...",
      });
    }
    if (quillInstance.current && isEditing) {
      quillInstance.current.root.innerHTML = editPost.content;
    }
  }, [isEditing, editPost.content]);


  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted successfully!");
    } else {
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = async () => {
    const content = quillInstance.current?.root.innerHTML || "";
    const updatedPost = { ...editPost, content };

    const response = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify(updatedPost),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const updatedData = await response.json();
      setPosts(
        posts.map((post) => (post.id === updatedData.id ? updatedData : post))
      );
      setIsEditing(false);
      setEditPost({ id: "", title: "", slug: "", content: "" });
      toast.success("Post updated successfully!");
    } else {
      toast.error("Failed to update post");
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const newSlug = newTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    setEditPost({ ...editPost, title: newTitle, slug: newSlug });
  };


  const startEditing = (post: Post) => {
    setIsEditing(true);
    setEditPost(post);
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {isEditing ? (
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Post</h2>
          <input
            type="text"
            value={editPost.title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="text"
            value={editPost.slug}
            onChange={(e) =>
              setEditPost({ ...editPost, slug: e.target.value })
            }
            placeholder="Slug"
            className="border p-2 w-full mb-4 rounded"
          />
          <div
            ref={editorRef}
            className="border border-gray-300 mb-4"
            style={{ minHeight: "200px" }}
          ></div>

          <div className="flex mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
            Dashboard
          </h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-300"
                  >
                    {post.id}
                  </th>
                  <td className="px-6 py-4 border border-gray-300">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {post.slug}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    <button
                      onClick={() => startEditing(post)}
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
