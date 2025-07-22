import { useState, useEffect } from 'react';
import { FileText, MessageSquare, Download, Eye, Trash2, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

interface SavedAnalysis {
  id: string;
  fileName: string;
  uploadDate: string;
  score: number;
  role: string;
  status: 'completed' | 'in-progress';
}

export default function Dashboard() {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);

  useEffect(() => {
    // Load saved analyses from localStorage
    const saved = localStorage.getItem('savedAnalyses');
    if (saved) {
      setSavedAnalyses(JSON.parse(saved));
    } else {
      // Add some demo data
      const demoData: SavedAnalysis[] = [
        {
          id: '1',
          fileName: 'John_Doe_Resume.pdf',
          uploadDate: '2024-01-15',
          score: 85,
          role: 'Frontend Developer',
          status: 'completed'
        },
        {
          id: '2',
          fileName: 'Software_Engineer_Resume.pdf',
          uploadDate: '2024-01-10',
          score: 78,
          role: 'Full Stack Developer',
          status: 'completed'
        },
        {
          id: '3',
          fileName: 'Updated_Resume_v2.pdf',
          uploadDate: '2024-01-08',
          score: 72,
          role: 'React Developer',
          status: 'completed'
        }
      ];
      setSavedAnalyses(demoData);
      localStorage.setItem('savedAnalyses', JSON.stringify(demoData));
    }
  }, []);

  const deleteAnalysis = (id: string) => {
    const updated = savedAnalyses.filter(analysis => analysis.id !== id);
    setSavedAnalyses(updated);
    localStorage.setItem('savedAnalyses', JSON.stringify(updated));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your resume analyses and track your progress</p>

          {/* Onboarding tip for new users */}
          {savedAnalyses.length === 0 && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Welcome to ResumeAI!</strong> Start by uploading your resume to get personalized feedback,
                interview questions, and cover letter suggestions.
              </p>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{savedAnalyses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {savedAnalyses.length > 0 
                  ? Math.round(savedAnalyses.reduce((sum, analysis) => sum + analysis.score, 0) / savedAnalyses.length)
                  : 0
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {savedAnalyses.length > 0 ? Math.max(...savedAnalyses.map(a => a.score)) : 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {savedAnalyses.filter(a => {
                  const date = new Date(a.uploadDate);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button asChild className="flex-1 sm:flex-none">
            <Link to="/">
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 sm:flex-none">
            <Link to="/interview">
              <MessageSquare className="h-4 w-4 mr-2" />
              Practice Interview
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 sm:flex-none">
            <Link to="/cover-letter">
              <FileText className="h-4 w-4 mr-2" />
              Generate Cover Letter
            </Link>
          </Button>
        </div>

        {/* Saved Analyses */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            {savedAnalyses.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No analyses yet</h3>
                <p className="text-muted-foreground mb-4">Upload your first resume to get started</p>
                <Button asChild>
                  <Link to="/">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-foreground truncate">{analysis.fileName}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(analysis.uploadDate).toLocaleDateString()}
                          </span>
                          <span className="hidden sm:block">Role: {analysis.role}</span>
                          <span className="sm:hidden">Role: {analysis.role}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <Badge variant={getScoreBadgeVariant(analysis.score)} className="flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {analysis.score}/100
                      </Badge>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/analysis">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAnalysis(analysis.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
