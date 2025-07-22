import { useState, useEffect } from 'react';
import { ArrowLeft, Target, AlertCircle, CheckCircle, TrendingUp, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ResumeAnalysisResponse } from '@shared/api';
import { Navigation } from '@/components/Navigation';

export default function Analysis() {
  const [analysisData, setAnalysisData] = useState<ResumeAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeResume = async () => {
      try {
        let resumeText = sessionStorage.getItem('resumeText');

        // If no resume text, use demo data for testing
        if (!resumeText) {
          console.log('No resume found in sessionStorage, using demo data');
          resumeText = `John Doe
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
        }

        const response = await fetch('/api/analyze-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeText, targetRole: 'Frontend Developer' }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze resume');
        }

        const data = await response.json();
        setAnalysisData(data);

        // Store for other pages
        sessionStorage.setItem('analysisData', JSON.stringify(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    analyzeResume();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Analyzing Your Resume</h2>
          <p className="text-muted-foreground">Please wait while AI analyzes your resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Analysis Failed</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link to="/">Upload New Resume</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Analysis</h1>
          <p className="text-muted-foreground">AI-powered insights and recommendations for your resume</p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 text-primary mr-2" />
              Overall Resume Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-medium">{analysisData.overallScore}/100</span>
                </div>
                <Progress value={analysisData.overallScore} className="h-3" />
              </div>
              <div className="text-3xl font-bold text-primary">{analysisData.overallScore}</div>
            </div>
            <p className="text-muted-foreground mt-4">
              {analysisData.feedback}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-500">
                <CheckCircle className="h-6 w-6 mr-2" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-500">
                <AlertCircle className="h-6 w-6 mr-2" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Missing Keywords */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Missing Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Consider adding these relevant keywords to improve your resume's visibility:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysisData.missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-primary border-primary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Match */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skills Match for Target Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Match Percentage</span>
                  <span className="text-sm font-medium">{analysisData.skillsMatch}%</span>
                </div>
                <Progress value={analysisData.skillsMatch} className="h-3" />
              </div>
              <div className="text-2xl font-bold text-primary">{analysisData.skillsMatch}%</div>
            </div>
            <p className="text-muted-foreground">
              Your skills match well with frontend developer roles. Adding the missing keywords above could increase this to 85%+.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link to="/interview">
              Prepare for Interview <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/cover-letter">
              Generate Cover Letter
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/">
              Upload New Resume
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
