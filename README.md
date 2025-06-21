# 🎥 Movie Search App

## Overview

The **Movie Search App** allows users to search for movies, view details, and save their favorite movies. This project uses the **OMDB API** to fetch movie data.

To use this project, you need to get two API keys:

### 1️⃣ OMDb API Key

1. Visit the [OMDb API website](https://www.omdbapi.com/apikey.aspx).
2. Enter your email address in the sign-up form.
3. Check your email for a confirmation message and click **Activate Key**.
4. Copy the API key sent to your email.

### 2️⃣ YouTube Data API Key (optional if you want to use official YouTube API)

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or use an existing one).
3. Enable the **YouTube Data API v3**.
4. Go to **Credentials > Create API Key**.
5. Copy the key and use it in your app if you want to fetch trailer videos directly.

## Repository Structure

- **Starter Files**:
  - Includes the complete HTML and CSS files.
  - Allows you to focus on writing JavaScript for functionality.
- **Final Files**:
  - Includes the fully implemented project with HTML, CSS, and JavaScript.

---

## How to Configure API Keys

### In `script.js`, replace the placeholder values with your keys:

```javascript
const OMDB_API_URL = "https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY";
const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; 
2. Open the `index.html` file in your browser.
3. Search for movies using the search bar.
4. Add your favorite movies to the favorites section.

---

## Features

- Search for movies using the OMDB API.
- Click on any movie poster to instantly watch its trailer via YouTube (opens in a new tab).
- Save favorite movies in **localStorage**.
- Dynamically add and remove movies from the favorites list.

Enjoy coding! 🚀