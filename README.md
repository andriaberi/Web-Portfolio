# Web Portfolio

A personal website designed to highlight my skills, projects, and professional achievements. This project serves as a modern, responsive online portfolio to showcase frontend and backend capabilities.

**Live Site**: [www.andriaberi.com](https://www.andriaberi.com)

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Configuration](#configuration)
* [Dependencies](#dependencies)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)
* [Contact Information](#contact-information)

## Features

* Fully responsive personal portfolio site
* Modern frontend with SCSS and React
* Backend functionality via Python
* Deployment-ready with Makefile and GitHub Actions
* Organized code structure (frontend, backend, portfolio)

## Installation

Clone the repository:

```bash
git clone https://github.com/andriaberi/Web-Portfolio.git
cd Web-Portfolio
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Install frontend dependencies (if applicable):

```bash
cd frontend
npm install
```

## Usage

### Local Development

```bash
# Run backend (e.g., Flask or Django)
python manage.py runserver
```

```bash
# In a separate terminal, run frontend
cd frontend
npm start
```

Open your browser and go to `http://localhost:3000` (or the appropriate port).

## Project Structure

```
├── .github/workflows       # CI/CD actions
├── backend/                # Backend logic (Python)
├── frontend/               # Frontend assets and components
├── portfolio/              # Static pages/content
├── requirements.txt        # Python dependencies
├── makefile                # Automation commands
├── manage.py               # Project entry point
└── test.py                 # Test script
```

## Configuration

* `.env` (not included): Add environment-specific secrets if needed.
* `makefile`: Includes automation scripts for build and deployment.

## Dependencies

Key dependencies may include (based on files):

* **Python**: Django
* **JavaScript**: React
* **SCSS**: For styling
* **GitHub Actions**: For CI/CD workflow

## Examples

Deployed site:

* [www.andriaberi.com](https://www.andriaberi.com)

Preview (local):

```bash
cd frontend
npm run dev  # Frontend

python manage.py runserver  # Backend
```

## Troubleshooting

* Ensure Python 3.7+ and Node.js are installed
* Missing modules? Run `pip install -r requirements.txt` or `npm install`
* Check environment variables if deployment fails

## License

All rights reserved by default — others may view the code, but they cannot legally copy, distribute, or use it in their own projects.

# Contact Information

| Name           | Phone Number      | Email               | LinkedIn                                    |
|----------------|-------------------|---------------------|---------------------------------------------|
| Andria Beridze | +1 (267) 632-6754 | andria24b@gmail.com | [linkedin.com/in/andriaberidze](https://www.linkedin.com/in/andriaberidze/) |
