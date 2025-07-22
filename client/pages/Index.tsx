import { useState } from 'react';
import { Upload, Sparkles, Target, MessageSquare, FileText, Star, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      // Upload and parse PDF
      const formData = new FormData();
      formData.append('resume', file);

      console.log('Uploading file:', file.name, file.size, 'bytes');

      const uploadResponse = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData
      });

      console.log('Upload response status:', uploadResponse.status);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Upload failed with response:', errorText);
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      const uploadData = await uploadResponse.json();
      console.log('Upload data received:', uploadData);

      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Failed to parse PDF');
      }

      // Store parsed text in sessionStorage for analysis page
      sessionStorage.setItem('resumeText', uploadData.text);
      sessionStorage.setItem('fileName', uploadData.fileName);

      console.log('Navigating to analysis page...');
      // Navigate to analysis page
      window.location.href = '/analysis';
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload and parse resume: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 sparkle-bg opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="mb-6 animate-bounce-in opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
              <span className="text-muted-foreground text-lg relative">
                ✨ The Mission:
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse-glow"></div>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards] leading-tight">
              Rapidly build your{' '}
              <span className="gradient-text relative animate-scale-pulse">
                career success
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full animate-shimmer opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]"></div>
              </span>{' '}
              <br className="hidden sm:block" />
              with AI.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards] px-4 sm:px-0">
              Upload your resume and get instant AI-powered analysis, personalized interview questions,
              and professional improvement suggestions to land your dream job.
            </p>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto animate-bounce-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              <Card className="bg-card border-border card-glow transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer block"
                      >
                        <Upload className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
                        <div className="flex items-center justify-center mb-2">
                          <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Upload Your Resume
                          </h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-primary ml-2 cursor-help animate-pulse" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-gradient-to-r from-primary to-accent text-white border-0">
                                <p className="max-w-xs">
                                  Upload a PDF version of your resume for best results.
                                  Our AI will analyze the content and provide detailed feedback.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-muted-foreground">
                          Drop your PDF resume here or click to browse
                        </p>
                        {file && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg animate-bounce-in relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                            <div className="flex items-center text-primary relative z-10">
                              <svg className="h-4 w-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-medium">{file.name} selected</span>
                            </div>
                            <div className="text-xs text-primary/80 mt-1 relative z-10">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI analysis ✨
                            </div>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleAnalyze}
                        disabled={!file || isUploading}
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                            <span className="animate-pulse">Analyzing with AI Magic...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Start Analysis</span>
                            <Sparkles className="ml-2 h-5 w-5 animate-rotate-hue relative z-10" />
                          </>
                        )}
                      </Button>

                      {!file && (
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm mb-2">
                            Don't have a resume ready? Try our demo to see what you'll get
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => window.location.href = '/analysis'}
                            className="w-full h-10"
                          >
                            View Demo Analysis
                          </Button>
                          <p className="text-xs text-muted-foreground mt-3">
                            💡 Tip: For best results, upload a recent PDF version of your resume
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why ResumeAI Impresses
            </h2>
            <p className="text-xl text-muted-foreground">
              AI-powered tools that help real job seekers succeed
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="bg-card border-border card-glow transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-bounce-in opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards] group">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <Target className="h-12 w-12 text-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float relative z-10" />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 relative z-10">Smart Analysis</h3>
                <p className="text-muted-foreground relative z-10">
                  Get detailed scoring, missing keywords, and professional feedback on your resume
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border card-glow transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 animate-bounce-in opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards] group">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <MessageSquare className="h-12 w-12 text-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 animate-float relative z-10" style={{animationDelay: '0.5s'}} />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2 relative z-10">Interview Prep</h3>
                <p className="text-muted-foreground relative z-10">
                  Personalized mock interview questions based on your experience and target role
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border card-glow transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-bounce-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards] group">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <FileText className="h-12 w-12 text-yellow-500 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float relative z-10" style={{animationDelay: '1s'}} />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-500 to-primary bg-clip-text text-transparent mb-2 relative z-10">Cover Letters</h3>
                <p className="text-muted-foreground relative z-10">
                  AI-generated cover letters and LinkedIn bios tailored to your profile
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border card-glow transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 animate-bounce-in opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards] group">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <Star className="h-12 w-12 text-blue-500 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 animate-float relative z-10" style={{animationDelay: '1.5s'}} />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-accent bg-clip-text text-transparent mb-2 relative z-10">Professional</h3>
                <p className="text-muted-foreground relative z-10">
                  Polished, interactive experience that showcases real-world AI applications
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You'll Get
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Comprehensive Resume Score</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Detailed analysis of your resume's strengths and areas for improvement</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Missing Keywords Detection</h3>
                <p className="text-muted-foreground">Identify important skills and keywords you might be missing for your target role</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Personalized Interview Questions</h3>
                <p className="text-muted-foreground">Mock interview questions tailored to your experience and job target</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Professional Suggestions</h3>
                <p className="text-muted-foreground">Actionable recommendations to make your resume stand out</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">ResumeAI</span>
            </div>
          </div>
          <div className="mt-4 text-center text-muted-foreground">
            Built with React, Express, and AI to help you succeed
          </div>
        </div>
      </footer>
    </div>
  );
}
