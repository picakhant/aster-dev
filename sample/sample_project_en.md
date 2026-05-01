# 🎬 Movie Database Web App

## 🚀 Overview
The **Movie Database Web App** is a full-stack discovery platform built to help users explore trending movies, search for their favorite titles, and keep track of upcoming releases. The project leverages modern web technologies to deliver a seamless and engaging user experience.

## ✨ Key Features
* **Dynamic Routing:** Implemented dynamic pages for individual movie details using Next.js.
* **Real-time Data Fetching:** Integrated with the [TMDB API](https://www.themoviedb.org/) to pull the latest movie data, ratings, and trailers.
* **Secure Authentication:** Utilized Appwrite for user sign-ups, logins, and session management.
* **Responsive UI:** Designed a fully responsive layout with Tailwind CSS and DaisyUI, ensuring compatibility across all devices.

## 🛠️ Tech Stack & Architecture
This project follows a decoupled architecture separating the frontend UI from backend logic.
* **Frontend:** React, Next.js 15, Tailwind CSS v4, DaisyUI
* **Backend:** Express, Node.js
* **BaaS (Backend as a Service):** Appwrite (Database, Storage, Auth)
* **External APIs:** TMDB API

## 🧠 Challenges & Solutions
**Challenge:** Handling large amounts of image data from the TMDB API without slowing down the page load speed.
**Solution:** Implemented Next.js `<Image />` component for automatic image optimization and lazy loading, significantly improving the Core Web Vitals score.

## 🎯 Future Plans
* Add a "Watchlist" feature for logged-in users.
* Integrate community reviews and a 5-star rating system.
* Implement Dark/Light mode toggle.