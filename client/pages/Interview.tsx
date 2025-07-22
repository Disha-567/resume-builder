import { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Clock, Lightbulb, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { InterviewQuestionsResponse } from '@shared/api';
import { Navigation } from '@/components/Navigation';

export default function Interview() {
  const [interviewData, setInterviewData] = useState<InterviewQuestionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        let resumeText = sessionStorage.getItem('resumeText');

        // If no resume text, use demo data for testing
        if (!resumeText) {
          console.log('No resume found in sessionStorage, using demo data');
          resumeText = `John Doe - Software Engineer with React and TypeScript experience`;
        }

        const response = await fetch('/api/interview-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeText, targetRole: 'Frontend Developer' }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate interview questions');
        }

        const data = await response.json();
        setInterviewData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    generateQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Generating Interview Questions</h2>
          <p className="text-muted-foreground">Personalizing questions based on your resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Generate Questions</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link to="/">Upload New Resume</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/analysis" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Interview Preparation</h1>
          <p className="text-muted-foreground">Personalized questions based on your resume and target role</p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-6 w-6 text-primary mr-2" />
              Your Interview Prep Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{interviewData.questions.length}</div>
                <div className="text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{interviewData.estimatedTime}</div>
                <div className="text-muted-foreground">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{interviewData.focusArea}</div>
                <div className="text-muted-foreground">Focus Area</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Questions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Practice Questions</h2>
          
          {interviewData.questions.map((item, index) => (
            <Card key={index} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </CardTitle>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Badge variant={item.type === 'Technical' ? 'default' : 'secondary'}>
                      {item.type}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={
                        item.difficulty === 'Easy' ? 'border-green-500 text-green-500' :
                        item.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                        'border-red-500 text-red-500'
                      }
                    >
                      {item.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Interview Tip</h4>
                      <p className="text-muted-foreground">{item.tip}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-muted-foreground text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Recommended prep time: 5-10 minutes
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>General Interview Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Before the Interview</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Research the company and role thoroughly</li>
                  <li>• Prepare specific examples from your experience</li>
                  <li>• Practice coding problems if it's a technical role</li>
                  <li>• Prepare thoughtful questions to ask them</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">During the Interview</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Listen carefully and ask clarifying questions</li>
                  <li>• Use the STAR method for behavioral questions</li>
                  <li>• Show enthusiasm and genuine interest</li>
                  <li>• Be honest about what you don't know</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild className="flex-1">
            <Link to="/cover-letter">
              Generate Cover Letter <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/analysis">
              Back to Analysis
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
