# AUREVYA Haute Joaillerie — AI Virtual Try-On Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.142-009688.svg)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com)

A luxury Virtual Try-On web application and AI fitting engine for **AUREVYA Haute Joaillerie**. Built with a modern, high-fashion React 19 + TailwindCSS v4 frontend and a FastAPI + PyTorch + Cloudinary + VModel AI (Gemini Multi-Image model) backend.

---

## 🌟 Key Features

- **Haute Joaillerie Atelier Experience**: Editorial luxury design aesthetic with responsive layout, glassmorphism UI, smooth scroll navigation, and custom interactive previews.
- **Exclusive AI Necklaces Try-On**: Virtual fitting for signature necklaces (`Émeraude Royale Pendant`, `Eternité Diamond Rivière`, `Vesper Diamond Pendant`).
- **Smart Category Filtering**:
  - Direct filtering for active **Necklaces** with Virtual Try-On indicators.
  - Dedicated **Atelier "Coming Soon"** showcases for future collections (Earrings, Rings, Bracelets, High Jewellery).
- **VModel AI & Cloudinary Backend Integration**: Real-time multi-image neural fitting using Nano Banana Pro (Gemini Vision reference model) and Cloudinary image hosting.
- **Dockerized Architecture**: One-command deployment using multi-stage Docker builds and Nginx reverse proxy.

---

## 🏗️ Project Architecture

```
new_jewelery_tryon/
├── frontend/                   # React 19 + TypeScript + Vite frontend
│   ├── public/Images/          # High-resolution product & model assets
│   ├── src/
│   │   ├── App.tsx             # Main luxury salon application & category logic
│   │   ├── TryOn.tsx           # AI Try-On modal flow (Photo -> Piece -> Preview)
│   │   ├── api.ts              # Frontend API client for backend fitting service
│   │   └── data.ts             # Product, category, & journal metadata
│   ├── Dockerfile              # Multi-stage Node.js build -> Nginx Alpine
│   ├── nginx.conf              # Reverse proxy configuration
│   └── vite.config.ts          # Vite bundler configuration
│
├── backend/                    # FastAPI AI Virtual Fitting Service
│   ├── app.py                  # Main API service (/api/try-on, /api/photo-check, /healthz)
│   ├── validate_photo.py       # Pose estimation & portrait quality validator
│   ├── Dockerfile              # Python 3.11 container with OpenCV & PyTorch CPU
│   └── requirements.txt        # Backend python dependencies
│
├── docker-compose.yml          # Container orchestration (Frontend + Backend)
├── .env                        # Environment credentials (API keys)
└── .gitignore                  # Git exclusion rules
```

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

Run both the frontend and backend with a single command:

```bash
docker compose up --build -d
```

- **Frontend Application**: Access at `http://localhost:8443`
- **Backend API**: Access at `http://localhost:8000`

---

### Option 2: Local Development

#### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

#### 2. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```

The application will be live at `http://localhost:8443` (or `http://localhost:5173`).

---

## 🔑 Environment Variables

Configure your credentials in `.env` at the root of the repository:

```env
# VModel AI Key (Prompt-based image editing & multi-image reference model)
VMODEL_API_KEY=your_vmodel_api_key

# Cloudinary Integration (Image hosting & asset storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Allowed Origins
ALLOWED_ORIGINS=*
```

---

## 📡 API Reference

### 1. `POST /api/try-on`
Submits a patron portrait and jewellery piece to generate an AI Virtual Fitting.

**Request Body:**
```json
{
  "userImage": "data:image/jpeg;base64,...",
  "jewelTitle": "Émeraude Royale Pendant",
  "jewelImage": "/Images/necklace_new_emerald.jpg",
  "tryOnType": "necklace",
  "lighting": "ambient salon daylight"
}
```

**Response:**
```json
{
  "success": true,
  "isRealAI": true,
  "provider": "VModel AI",
  "jewelTitle": "Émeraude Royale Pendant",
  "outputImageUrl": "https://res.cloudinary.com/.../aurevya_results/...jpg",
  "message": "Successfully fitted Émeraude Royale Pendant with VModel AI."
}
```

### 2. `POST /api/photo-check`
Validates patron portrait quality, pose, and framing.

### 3. `GET /api/health`
Checks API health status and connected integrations.

---

## 📜 License

Private Repository — **grovyn-engineering / AUREVYA Haute Joaillerie**.
