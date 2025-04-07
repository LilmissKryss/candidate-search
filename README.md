# GitHub Candidate Search Application

![GitHub Candidate Search](https://img.shields.io/badge/GitHub-Candidate%20Search-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6)
![Vite](https://img.shields.io/badge/Vite-6.2.5-646cff)

A modern web application for searching and managing potential GitHub candidates. This application allows users to browse GitHub profiles, save potential candidates, and manage a list of saved candidates with sorting and filtering capabilities.

## Features

- **GitHub Profile Search**: Search for GitHub users and view their profiles
- **Candidate Management**: Save potential candidates for later review
- **Sorting & Filtering**: Sort and filter saved candidates by name, location, email, company, and bio

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Installation

1. Clone the repository:
2. Install dependencies:
3. Create a `.env` file in the root directory with your GitHub API token
4. Start the development server:
   npm run dev

## 🖥️ Usage

### Home Page

The home page displays GitHub profiles one at a time. You can:

- View the candidate's profile information
- Save a candidate by clicking the + button
- Skip a candidate by clicking the - button

### Potential Candidates Page

The potential candidates page displays all saved candidates in a table format. You can:

- Sort candidates by clicking on column headers
- Filter candidates using the search box
- Remove candidates by clicking the reject button
- Contact candidates by clicking on their email address

## 🌐 Deployment

This application is configured for easy deployment to Render.

### Deploying to Render

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Create a new Web Service and connect your repository

3. Add any required environment variables

4. Render will automatically detect the configuration from the `render.yaml` file

## 🛠️ Technologies Used

- **Frontend**:

  - React 18
  - TypeScript
  - React Router
  - React Icons
  - CSS3

- **Backend**:

  - Express.js (for production serving)
  - Node.js

- **Build Tools**:

  - Vite
  - ESLint

- **Deployment**:
  - Render

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
