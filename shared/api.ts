// Example shared types between client and server
export interface DemoResponse {
  message: string;
}

// Resume AI shared types
export interface ResumeAnalysisRequest {
  resumeText: string;
  targetRole?: string;
}

export interface ResumeAnalysisResponse {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  skillsMatch: number;
  feedback: string;
}

export interface InterviewQuestionsRequest {
  resumeText: string;
  targetRole?: string;
}

export interface InterviewQuestion {
  question: string;
  type: "Technical" | "Behavioral";
  difficulty: "Easy" | "Medium" | "Hard";
  tip: string;
}

export interface InterviewQuestionsResponse {
  questions: InterviewQuestion[];
  focusArea: string;
  estimatedTime: number;
}

export interface CoverLetterRequest {
  resumeText: string;
  jobTitle?: string;
  companyName?: string;
  tone?: "Professional" | "Enthusiastic" | "Creative" | "Technical";
}

export interface CoverLetterResponse {
  coverLetter: string;
  suggestions: string[];
}

export interface FileUploadResponse {
  success: boolean;
  text: string;
  fileName: string;
  fileSize: number;
}

export interface LinkedInBioRequest {
  resumeText: string;
  tone?: "Professional" | "Creative" | "Technical" | "Enthusiastic";
}

export interface LinkedInBioResponse {
  bio: string;
  hashtags: string[];
  tips: string[];
}
