// SongList.js
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AudioPlayer from "./AudioPlayer";
import Pagination from "./Pagination";
import image1 from "../images/Channa-ve.jpeg";
import image2 from "../images/Chaleya.jpeg";
import image3 from "../images/Tu hai to.jpeg";
import song1 from "../songs/Channa-Ve.mp3";
import song2 from "../songs/Chaleya.mp3";
import song3 from "../songs/Tu Hai To Mujhe.mp3";
const SongList = () => {
  const [songs, setSongs] = useState([
    {
      id: 1,
      name: "Channa Ve ",
      songLink: song1,
      songSource: "Source 1",
      uploadSongImage: image1,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 2,
      name: "Chaleya ",
      songLink: song2,
      songSource: "Source 2",
      uploadSongImage: image2,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 3,
      name: "Tu Hai To - Arjit Singh",
      songLink: song3,
      songSource: "Source 2",
      uploadSongImage: image3,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 4,
      name: "Channa Ve ",
      songLink: song1,
      songSource: "Source 1",
      uploadSongImage: image1,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 5,
      name: "Chaleya ",
      songLink: song2,
      songSource: "Source 2",
      uploadSongImage: image2,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 6,
      name: "Tu Hai To - Arjit Singh",
      songLink: song3,
      songSource: "Source 2",
      uploadSongImage: image3,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 7,
      name: "Channa Ve ",
      songLink: song1,
      songSource: "Source 1",
      uploadSongImage: image1,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 8,
      name: "Chaleya ",
      songLink: song2,
      songSource: "Source 2",
      uploadSongImage: image2,
      addedDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 9,
      name: "Tu Hai To - Arjit Singh",
      songLink: song3,
      songSource: "Source 2",
      uploadSongImage: image3,
      addedDate: new Date().toISOString().slice(0, 10),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    songLink: "",
    songSource: "",
    uploadSongImage: null, // Use null for file input
    addedDate: new Date().toISOString().slice(0, 10),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 7; // Adjust this based on your preference

  const totalPage = Math.ceil(songs.length / songsPerPage);
  const currentSongs = songs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePlay = (songLink) => {
    // Add play functionality here
    const index = currentSongs.findIndex((song) => song.songLink === songLink);
    setCurrentSongIndex(index);
  };

  const handleDelete = (id) => {
    // Remove the song from the list
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
  };

  const handleAddSong = () => {
    // Add the new song to the list with a valid image URL
    setSongs((prevSongs) => [
      ...prevSongs,
      {
        id: prevSongs.length + 1,
        ...newSong,
        uploadSongImage: newSong.uploadSongImage
          ? URL.createObjectURL(newSong.uploadSongImage)
          : "default-image-url.jpg", // Convert the file to a URL
      },
    ]);
    // Close the modal and reset the form
    setShowModal(false);
    setNewSong({
      name: "",
      songLink: "",
      songSource: "",
      uploadSongImage: null, // Reset to null for file input
      addedDate: new Date().toISOString().slice(0, 10),
    });
  };

  const handleFileChange = (e) => {
    // Update the state with the selected file
    setNewSong({ ...newSong, uploadSongImage: e.target.files[0] });
  };

  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex < currentSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  return (
    <div className="p-4">
     
      <div className="d-flex justify-content-between" >
        <span style={{fontSize:"28px"}}>Songs</span>
        <span>
        <Button variant="primary" className="btn-warning" onClick={() => setShowModal(true)}>
          Add Song
        </Button>
        </span>
      </div>
      <hr/>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="p-2">Song Name</th>
              <th  className="p-2">Song Source</th>
              <th  className="p-2">Added Date</th>
              <th  className="p-2">Play</th>
              <th  className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song) => (
              <tr key={song.id}>
                <td  className="p-2">
                  <img
                    src={song.uploadSongImage}
                    alt={`Song ${song.id}`}
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                 <span className="px-3">{song.name}</span> 
                </td>
                <td  className="p-2">{song.songSource}</td>
                <td  className="p-2">{song.addedDate}</td>
                <td  className="p-2">
                  <Button className="border-white bg-warning text-white btn-circle" onClick={() => handlePlay(song.songLink)}>
                  ▶
                  </Button>
                </td>
                <td  className="p-2">
                  <button className="" onClick={() => handleDelete(song.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div >
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div style={{width:"100%"}}>
        <AudioPlayer
          songs={currentSongs}
          songLink={currentSongs[currentSongIndex].songLink}
          currentSongIndex={currentSongIndex}
          onPrevious={handlePreviousSong}
          onNext={handleNextSong}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSongName" className="py-2">
              <Form.Label>Song Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter song name"
                value={newSong.name}
                onChange={(e) =>
                  setNewSong({ ...newSong, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formSongLink" className="py-2">
              <Form.Label>Song Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter song link"
                value={newSong.songLink}
                onChange={(e) =>
                  setNewSong({ ...newSong, songLink: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formSongSource" className="py-2">
              <Form.Label>Song Source</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter song source"
                value={newSong.songSource}
                onChange={(e) =>
                  setNewSong({ ...newSong, songSource: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formUploadSongImage" className="py-2">
              <Form.Label>Upload Profile Thumbnail</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SongList;
