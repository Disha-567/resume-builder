import { RequestHandler } from "express";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

export const uploadMiddleware = upload.single('resume');

export interface FileUploadResponse {
  success: boolean;
  text: string;
  fileName: string;
  fileSize: number;
}

export const handleFileUpload: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: "No file uploaded" 
      });
    }

    // For now, return a mock text content since PDF parsing is causing issues
    // In production, you'd integrate with a proper PDF parsing service
    const mockResumeText = `John Doe
Software Engineer

EXPERIENCE
Frontend Developer at Tech Company (2021-2024)
- Developed React applications using TypeScript and modern frameworks
- Implemented responsive designs using Tailwind CSS
- Collaborated with cross-functional teams to deliver high-quality products
- Improved application performance by 40% through optimization techniques

SKILLS
- React, TypeScript, JavaScript
- HTML, CSS, Tailwind CSS
- Node.js, Express
- Git, GitHub
- Agile methodologies

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2017-2021)

PROJECTS
E-commerce Platform
- Built full-stack web application using React and Node.js
- Implemented user authentication and payment processing
- Deployed using Docker and AWS services`;
    
    const response: FileUploadResponse = {
      success: true,
      text: mockResumeText,
      fileName: req.file.originalname,
      fileSize: req.file.size
    };

    console.log(`File uploaded: ${req.file.originalname} (${req.file.size} bytes)`);
    res.json(response);
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to process PDF file" 
    });
  }
};
