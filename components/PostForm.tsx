"use client"
import React, { useState, useEffect, useRef } from "react";
import { loadPlugins } from "../lib/server/pluginManager";
import { PluginBlock } from "../lib/server/types"; // Import PluginBlock type
import Quill from "quill"; // Import Quill
import "quill/dist/quill.snow.css"; // Import the Quill styles
import { toast, ToastContainer } from "react-toastify"; // Import React Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toastify

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [registeredBlocks, setRegisteredBlocks] = useState<PluginBlock[]>([]);
  const [previewMode, setPreviewMode] = useState(false); // For preview mode toggle

  // Reference to the Quill editor
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load plugins
    const fetchPlugins = async () => {
      const plugins = await loadPlugins();
      setRegisteredBlocks(plugins);
    };
    fetchPlugins();

    // Initialize Quill editor
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link"],
            ["blockquote"],
            [{ script: "sub" }, { script: "super" }],
            ["image"],
            ["code-block"],
          ],
        },
      });

      // Set the content from the state to Quill editor
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML); // Save HTML content to state
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make the POST request to the API route
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, slug, content }),
      });

      if (response.ok) {
        const newPost = await response.json();
        toast.success(`Post "${newPost.title}" created successfully!`);
      } else {
        toast.error("Error creating post.");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/ /g, "-"));
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title"
          />
        </div>

        {/* Slug Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            placeholder="Generated from the title"
          />
        </div>

        {/* Content Editor (Quill) */}
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <div
            ref={quillRef}
            className="h-64 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Preview Mode Toggle */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="previewMode"
            checked={previewMode}
            onChange={() => setPreviewMode(!previewMode)}
            className="mr-2"
          />
          <label htmlFor="previewMode" className="text-gray-700">
            Preview Mode
          </label>
        </div>

        {/* Render Plugin Blocks */}
        <div className="mb-4">
          {registeredBlocks.map((block, idx) => (
            <div key={idx} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium">{block.name}</h3>
              <div>{block.render()}</div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Preview Mode Display */}
      {previewMode && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Preview</h3>
          <h4 className="text-xl font-semibold">{title}</h4>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
      
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
