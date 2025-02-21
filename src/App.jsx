import React from 'react';
import 'normalize.css'; 
import './App.css'
import Header from './components/Header/header.jsx';
import SearchBarSong from './components/SearchBar/searchBarSong.jsx';

function App() {

  return (
    <>
      <Header />
      <SearchBarSong />
    </>
  )
}

export default App
