import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleResumeAnalysis,
  handleInterviewQuestions,
  handleCoverLetter,
  handleLinkedInBio
} from "./routes/resume-analysis";
import { uploadMiddleware, handleFileUpload } from "./routes/file-upload";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from ResumeAI server!" });
  });

  app.get("/api/demo", handleDemo);

  // Resume AI API routes
  app.post("/api/upload-resume", uploadMiddleware, handleFileUpload);
  app.post("/api/analyze-resume", handleResumeAnalysis);
  app.post("/api/interview-questions", handleInterviewQuestions);
  app.post("/api/generate-cover-letter", handleCoverLetter);
  app.post("/api/generate-linkedin-bio", handleLinkedInBio);

  // Error handling middleware
  app.use((error: any, req: any, res: any, next: any) => {
    console.error('Server error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 10MB.'
      });
    }
    if (error.message === 'Only PDF files are allowed') {
      return res.status(400).json({
        success: false,
        error: 'Only PDF files are allowed.'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  });

  return app;
}
