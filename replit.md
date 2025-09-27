# Zambia AI Tutor - Replit Project Documentation

## Project Overview
This is a Next.js-based AI tutoring application that allows students to interact with an AI tutor for educational support. The application supports:
- Real-time chat with an AI tutor powered by OpenAI GPT
- PDF file upload and processing for document analysis
- Image upload and processing for visual content analysis
- Multiple conversation topics/sessions management
- Markdown and LaTeX math rendering support

## Current Status
- **Last Updated:** September 27, 2025
- **Status:** Fully configured for Replit environment
- **Port:** 5000 (configured for Replit proxy)
- **Host:** 0.0.0.0 (allows all hosts for Replit iframe)

## Architecture
- **Framework:** Next.js 14.2.32
- **UI Library:** React 18
- **Styling:** CSS Modules + Tailwind CSS
- **AI Integration:** OpenAI API (GPT-4o-mini model)
- **Math Rendering:** KaTeX with react-katex
- **Markdown:** react-markdown with math support
- **OCR:** Tesseract.js for image text extraction
- **PDF Processing:** PDF.js for document handling

## Environment Configuration
### Required Environment Variables
- `OPENAI_API_KEY`: OpenAI API key for chat functionality

### Development Setup
- Server runs on `0.0.0.0:5000`
- Hot module replacement enabled
- Telemetry collection enabled (can be opted out)

### Production Deployment
- **Type:** Autoscale (stateless web application)
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

## Key Components
1. **ChatBox.js** - Main chat interface component
2. **ChatSidebar.js** - Topic/session management sidebar
3. **ImageHandler.js** - Image upload and OCR processing
4. **PdfHandler.js** - PDF upload and text extraction
5. **pages/api/summarise.js** - OpenAI API integration endpoint

## Recent Changes
- **2025-09-27:** Initial Replit environment setup
  - Configured Next.js for Replit proxy compatibility
  - Updated package.json scripts for correct host/port binding
  - Set up OpenAI integration blueprint
  - Configured deployment settings for autoscale
  - Created development workflow

## Development Workflow
- Use `npm run dev` to start development server
- Application automatically reloads on file changes
- Access via Replit's web preview on port 5000

## Dependencies
All required packages are installed and configured:
- Core: React, Next.js, OpenAI SDK
- Math: KaTeX, remark-math, rehype-katex
- File Processing: PDF.js, Tesseract.js
- Utilities: UUID, Vercel Analytics