import React from 'react';
import { useState, useEffect } from 'react';
import 'normalize.css';
import './App.css';
import Header from './components/Header/header.jsx';
import SearchBarSong from './components/SearchBar/searchBarSong.jsx';
import ListContainer from './components/listContainer/listContainer.jsx';
import PlayBar from './components/playBar/playBar.jsx';

function App() {
  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(''); 
  const [songs, setSongs] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && !profile) {
      login();
    }
  }, [profile]);

  async function login() {
    const clientId = "b0b41f96952848a6a80957d528a0faa5";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      try {
        const accessToken = await getAccessToken(clientId, code);
        setAccessToken(accessToken); 
        const userProfile = await fetchProfile(accessToken);
        console.log("Fetched profile:", userProfile);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        // Clear the code parameter from the URL
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("code");
        window.history.replaceState({}, document.title, newUrl.toString());
      }
    }
  }

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    if (!result.ok) {
      throw new Error(`Failed to get access token: ${result.statusText}`);
    }

    const { access_token } = await result.json();
    return access_token;
  }

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
      throw new Error(`Failed to fetch profile: ${result.statusText}`);
    }

    return await result.json();
  }


  return (
    <>
      <Header profile={profile} login={login} />
      <SearchBarSong songs={songs} setSongs={setSongs} accessToken={accessToken} />c
      <ListContainer songs={songs} />
      <PlayBar />
    </>
  )
}

export default App
