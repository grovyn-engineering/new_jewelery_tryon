# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --silent || npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build the backend and serve the frontend
FROM python:3.11-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates libgl1 libglib2.0-0 curl \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
RUN mkdir -p tddfa_lite/weights tddfa_lite/configs \
    && git clone --depth 1 https://github.com/cleardusk/3DDFA_V2 /tmp/3ddfa_src \
    && cp /tmp/3ddfa_src/weights/mb1_120x120.pth   tddfa_lite/weights/ \
    && cp /tmp/3ddfa_src/configs/bfm_noneck_v3.pkl tddfa_lite/configs/ \
    && cp /tmp/3ddfa_src/configs/tri.pkl           tddfa_lite/configs/ \
    && rm -rf /tmp/3ddfa_src

# Copy built frontend from Stage 1 into a 'dist' folder in the backend directory
COPY --from=frontend-build /app/dist /app/dist

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
