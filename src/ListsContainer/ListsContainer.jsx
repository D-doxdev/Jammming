import React, { useEffect, useState } from "react";
import TrackListingComponent from "./Components/TrackListingComponent";
import CustomPlaylistComponent from "./Components/CustomPlaylistComponent";
import axios from "axios";

function ListsContainer({
  musicSearchResult,
  selectedSong,
  setSelectedSong,
  createNewUserPlaylist,
  playlistInput,
  setPlaylistInput,
}) {
  // Dummy data stored, is passed as prop to TrackListingComponent which passes to SongInfoComponent.
  const [dummyData, setDummyData] = useState([]);
  // Passed as a prop to decide if the SongInfoComponent is in the CustomPlaylistComponent and conditionally render the button, dummydata might be abetter solution
  const [isCurrentlySelected] = useState(true);
  // Determine if the song is currently selected

  // updates the selectedSong when the add song button is pressed in li items, also checks for doubles.
  function handleAddSong(gatheredSongData) {
    // takes the previous object with some, returns true if it contains the ID of the gatheredSongData object
    setSelectedSong((prev) => {
      const isDuplicate = prev.some(
        (song) => song.songId === gatheredSongData.songId,
      );
      console.log(`this is the added items' ID: ${gatheredSongData.songId}`);
      // if true, only return the previous object, if false, return the updated array.
      return isDuplicate ? prev : [...prev, gatheredSongData];
    });
  }

  function handleRemoveSong(songToBeRemovedId) {
    console.log(`Id of the item removed ${songToBeRemovedId}`);
    setSelectedSong(
      selectedSong.filter((song) => song.songId !== songToBeRemovedId),
    );
  }

  function fetchDummyData() {
    axios
      .get("https://dummyjson.com/users") // uses a dummy data API until the Spotify data is set up. https://dummyjson.com/docs/users
      .then((response) => {
        setDummyData(response.data.users);
        //console.log(response.data.users); // See so that the data is detched in the concole.
      });
  }

  // Calls when component is rendered, Change the dependency array later to update via Search etc.
  useEffect(() => {
    fetchDummyData();
  }, []);

  // This is a container component, only call instances and pass props, doesn't render own JSX.
  return (
    <div className="flex h-full w-full flex-col flex-nowrap gap-5 md:h-3/4 md:flex-row">
      {/* Passes dummyData to component */}
      <TrackListingComponent
        dummyData={dummyData}
        handleAddSong={handleAddSong}
        selectedSong={selectedSong}
        handleRemoveSong={handleRemoveSong}
        musicSearchResult={musicSearchResult}
      />
      {/* Passes the selected song to component */}
      <CustomPlaylistComponent
        selectedSong={selectedSong}
        playlistInput={playlistInput}
        setPlaylistInput={setPlaylistInput}
        isCurrentlySelected={isCurrentlySelected}
        handleRemoveSong={handleRemoveSong}
        musicSearchResult={musicSearchResult}
        createNewUserPlaylist={createNewUserPlaylist}
      />
    </div>
  );
}

export default ListsContainer;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
