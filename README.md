See live at [boattradeconsulting.fr](https://boattradeconsulting.fr/)

# BoatTrade Consulting - Web Platform

[![Live Site](https://img.shields.io/badge/Live%20Site-boattradeconsulting.fr-blue?style=flat-square)](https://boattradeconsulting.fr/)

This repository contains the source code for the BoatTrade Consulting website, a platform for browsing, buying, and selling boats, as well as accessing related consultancy services. The project is built with a Django REST backend and a React frontend using TypeScript and Vite.

## Features

*   **Boat Listings:** Browse a comprehensive catalog of boats for sale.
*   **Advanced Filtering:** Filter boats by category, price range, and search keywords.
*   **Detailed Boat View:** View detailed specifications, image galleries, and videos for each boat.
*   **Featured Boats:** Highlighted selection of special boats.
*   **Boat Categories:** Organize boats into relevant categories.
*   **Inquiry Form:** Submit inquiries directly about specific boats.
*   **Sell Your Boat:** Form for users to request assistance in selling their boat, including image uploads.
*   **Services Overview:** Information about boat sales assistance and purchase assistance services.
*   **Testimonials:** Display customer feedback.
*   **Blog Section:** Read articles, guides, and news related to boating.
*   **Company Information:** About Us section and contact details with an interactive map.
*   **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).
*   **Modern UI/UX:** Smooth animations and transitions using Framer Motion and Material UI components.

## Tech Stack

**Backend (`boattrade-api`):**

*   **Framework:** Django
*   **API:** Django REST Framework
*   **Language:** Python
*   **Database:** Configurable (e.g., PostgreSQL, SQLite)
*   **Deployment:** cPanel (via `rsync`, `pip`, `manage.py`)

**Frontend (`boattrade-frontend`):**

*   **Framework/Library:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **UI Library:** Material UI (MUI)
*   **Routing:** React Router
*   **Animations:** Framer Motion
*   **Mapping:** React Leaflet
*   **Carousels:** React Slick
*   **Styling:** MUI `sx` prop, `styled-components`, CSS Modules (potentially), Global CSS

## Project Structure

```
boattrade/
├── boattrade-api/      # Django Backend
│   ├── api_app/        # Core API logic (boats, inquiries, etc.)
│   ├── auth_app/       # Authentication logic
│   ├── manage.py
│   └── requirements.txt
├── boattrade-frontend/ # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── theme/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .cpanel.yml         # Deployment configuration for cPanel
└── README.md
```

## Setup and Installation

### Prerequisites

*   Node.js and npm (or yarn)
*   Python and pip
*   Virtualenv (recommended for Python)

### Backend (`boattrade-api`)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd boattrade/boattrade-api
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure environment variables:**
    *   Set up your database connection, secret key, email settings, etc. (Likely in `settings.py` or via environment variables - check project configuration).
5.  **Run database migrations:**
    ```bash
    python manage.py migrate
    ```
6.  **Create a superuser (optional):**
    ```bash
    python manage.py createsuperuser
    ```
7.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The backend API will typically be available at `http://127.0.0.1:8000/`.

### Frontend (`boattrade-frontend`)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../boattrade-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure API endpoint:**
    *   Ensure the frontend knows where the backend API is running. This is configured via a `.env` file (e.g., `VITE_API_URL=http://127.0.0.1:8000/api`). Check `boattrade-frontend\.env` and `boattrade-frontend\.env.production`.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically be available at `http://127.0.0.1:5173/` (or another port specified by Vite).

5.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will create a `dist` folder with optimized static assets.

## Deployment

The project includes a `.cpanel.yml` file configured for deployment to a cPanel environment. The deployment process generally involves:

1.  Setting up a git repository on the server.
2.  Setting up the Python virtual environment on the server and installing the required packages.
3.  Setting up the static file access and .htaccess files for the frontend build.
4.  Building the frontend assets.
5.  Pushing the code with the built assets to the git repository on the server.

Refer to the `.cpanel.yml` file for specific commands used in the deployment task.

## License

MIT