import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const AlbumApi = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [updatedAlbum, setUpdatedAlbum] = useState(null);
  useEffect(() => {
    fetchAlbums();
  });
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Error Fetching albums", error);
    }
  };

  const handleAddAlbum = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        {
          title: newAlbumTitle,
          id: 1,
        }
      );
      setAlbums([...albums, response.data]);
      setNewAlbumTitle("");
    } catch (error) {
      console.log("Error adding album:", error);
    }
  };

  const handleUpdate = async () => {
    if (!updatedAlbum) return;
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`,
        {
          id: updatedAlbum.id,
          title: updatedAlbum.title,
          userId: updatedAlbum.userId,
        }
      );
      setAlbums(
        albums.map((album) =>
          album.id === updatedAlbum.id ? response.data : album
        )
      );
      setUpdatedAlbum(null);
    } catch (error) {
      console.error("Error updating Album:", error);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
      );
      setAlbums(albums.filter((album) => album.id !== albumId));
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}{" "}
            <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add Album</h2>
      <input
        type="text"
        value={newAlbumTitle}
        onChange={(e) => setNewAlbumTitle(e.target.value)}
      />
      <button onClick={handleAddAlbum}>Add</button>

      <h2>Update Album</h2>
      <input
        type="text"
        value={updatedAlbum?.title || ""}
        onChange={(e) =>
          setUpdatedAlbum({ ...updatedAlbum, title: e.target.value })
        }
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default AlbumApi;
