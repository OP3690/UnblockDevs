'use client';

import { useState } from 'react';
import { MessageSquare, Send, Loader2, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FeedbackFormProps {
  toolName?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function FeedbackForm({ toolName, className = '', variant = 'default' }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'feedback' as 'feedback' | 'bug' | 'feature'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    setLoading(true);
    
    try {
      // Store feedback in localStorage (in production, send to your backend)
      const feedbacks = JSON.parse(localStorage.getItem('user_feedbacks') || '[]');
      const newFeedback = {
        ...formData,
        toolName: toolName || 'General',
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };
      feedbacks.push(newFeedback);
      localStorage.setItem('user_feedbacks', JSON.stringify(feedbacks));
      
      // In production, you would send this to your backend:
      // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(newFeedback) });
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', type: 'feedback' });
      toast.success('Thank you for your feedback!');
      
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    if (!isOpen) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ${className}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Feedback</span>
        </button>
      );
    }

    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-lg ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="feedback">General Feedback</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your feedback..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || submitted}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {toolName ? `Feedback for ${toolName}` : 'Share Your Feedback'}
          </h3>
          <p className="text-sm text-gray-600">
            Help us improve! Share your thoughts, report bugs, or suggest new features.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="feedback">General Feedback</option>
            <option value="bug">Report a Bug</option>
            <option value="feature">Feature Request</option>
          </select>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name (optional)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your email (optional)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Your feedback, bug report, or feature request..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <button
          type="submit"
          disabled={loading || submitted}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : submitted ? (
            <>
              <Check className="w-5 h-5" />
              <span>Thank you!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Feedback</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

