# Spotify Music Browser

## Introduction

This project involves creating a front-end interface using Angular, which communicates with a Node.js/Express backend server to explore music on Spotify. The backend handles OAuth authentication and interfaces with the Spotify API, while the front-end is responsible for HTTP requests to the backend and user interaction.

## Repository Structure

- **Webserver (Node.js/Express):** Manages communication with the Spotify API. Create `client_secret.json` and `tokens.json` here.
- **Client (Angular):** Contains the user interface for music browsing.

## Setup Instructions

1. **Verify Node.js Version:** Ensure Node.js (at least version 10) is installed.
2. **Install Angular CLI:** Use `npm install -g @angular/cli`.
3. **Install Dependencies:** Navigate to both `client` and `webserver` directories and run `npm install`.
4. **Update Dependencies:** Run `npm update` in both directories.
