import { ArrowLeft, FileText, Download, Copy, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CoverLetterResponse, LinkedInBioResponse } from '@shared/api';
import { Navigation } from '@/components/Navigation';

export default function CoverLetter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState('Frontend Developer');
  const [companyName, setCompanyName] = useState('');
  const [tone, setTone] = useState<'Professional' | 'Enthusiastic' | 'Creative' | 'Technical'>('Professional');

  // LinkedIn Bio state
  const [linkedinBio, setLinkedinBio] = useState('');
  const [linkedinHashtags, setLinkedinHashtags] = useState<string[]>([]);
  const [linkedinTips, setLinkedinTips] = useState<string[]>([]);
  const [bioTone, setBioTone] = useState<'Professional' | 'Creative' | 'Technical' | 'Enthusiastic'>('Professional');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  // Generate initial cover letter on load
  useEffect(() => {
    generateCoverLetter();
  }, []);

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    try {
      let resumeText = sessionStorage.getItem('resumeText');

      // If no resume text, use demo data for testing
      if (!resumeText) {
        console.log('No resume found in sessionStorage, using demo data');
        resumeText = `John Doe - Software Engineer with React and TypeScript experience`;
      }

      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobTitle,
          companyName: companyName || '[Company Name]',
          tone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data: CoverLetterResponse = await response.json();
      setCoverLetter(data.coverLetter);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Cover letter generation error:', error);
      alert('Failed to generate cover letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    generateCoverLetter();
  };

  const generateLinkedInBio = async () => {
    setIsGeneratingBio(true);
    try {
      const resumeText = sessionStorage.getItem('resumeText');

      if (!resumeText) {
        console.log('No resume found in sessionStorage, using demo data');
      }

      const response = await fetch('/api/generate-linkedin-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeText || 'John Doe - Software Engineer with React and TypeScript experience',
          tone: bioTone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate LinkedIn bio');
      }

      const data: LinkedInBioResponse = await response.json();
      setLinkedinBio(data.bio);
      setLinkedinHashtags(data.hashtags);
      setLinkedinTips(data.tips);
    } catch (error) {
      console.error('LinkedIn bio generation error:', error);
      alert('Failed to generate LinkedIn bio. Please try again.');
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/interview" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Interview Prep
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI Cover Letter Generator</h1>
          <p className="text-muted-foreground">Professional cover letter tailored to your resume and target role</p>
        </div>

        {/* Generation Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 text-primary mr-2" />
              Cover Letter Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                <input
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  placeholder="Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                <input
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
                <select
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                >
                  <option>Professional</option>
                  <option>Enthusiastic</option>
                  <option>Creative</option>
                  <option>Technical</option>
                </select>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Cover Letter
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Cover Letter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Cover Letter</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[500px] text-foreground resize-none"
              placeholder="Your generated cover letter will appear here..."
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Tips:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Bio Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>LinkedIn Bio Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio Tone</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                    value={bioTone}
                    onChange={(e) => setBioTone(e.target.value as any)}
                  >
                    <option value="Professional">Professional</option>
                    <option value="Creative">Creative</option>
                    <option value="Technical">Technical</option>
                    <option value="Enthusiastic">Enthusiastic</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={generateLinkedInBio}
                    disabled={isGeneratingBio}
                    className="w-full h-10"
                  >
                    {isGeneratingBio ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate LinkedIn Bio <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {linkedinBio && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Generated LinkedIn Bio</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(linkedinBio)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Bio
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={linkedinBio}
                      onChange={(e) => setLinkedinBio(e.target.value)}
                      className="min-h-[200px] text-foreground resize-none"
                      placeholder="Your generated LinkedIn bio will appear here..."
                    />
                  </div>

                  {linkedinHashtags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Suggested Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {linkedinHashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => navigator.clipboard.writeText(hashtag)}
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {linkedinTips.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">LinkedIn Profile Tips</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                        {linkedinTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {!linkedinBio && (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Generate a professional LinkedIn bio based on your resume
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild className="flex-1">
            <Link to="/">
              Upload New Resume <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/analysis">
              View Analysis
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
