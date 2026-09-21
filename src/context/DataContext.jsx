import { createContext, useContext, useState } from "react";
import { forumPosts as initialForumPosts } from "../data/dummyData";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [forumPosts, setForumPosts] = useState(initialForumPosts);

  const addForumPost = (text, tag) => {
    const newPost = {
      id: Date.now().toString(),
      author: "Kamu",
      text,
      tag: tag?.trim() ? tag.trim() : "#Umum",
      comments: 0,
      likes: 0,
    };
    setForumPosts((prev) => [newPost, ...prev]);
  };

  const updateForumPost = (id, text, tag) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, text, tag: tag?.trim() ? tag.trim() : post.tag }
          : post
      )
    );
  };

  const deleteForumPost = (id) => {
    setForumPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <DataContext.Provider
      value={{ forumPosts, addForumPost, updateForumPost, deleteForumPost }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}