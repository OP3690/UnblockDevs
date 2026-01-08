'use client';

import { Star } from 'lucide-react';
import { ToolTab } from '@/lib/personalization';

interface ToolCardProps {
  toolId: ToolTab;
  title: string;
  description: string;
  ctaText: string;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  className?: string;
}

export default function ToolCard({
  toolId,
  title,
  description,
  ctaText,
  onClick,
  isFavorite,
  onToggleFavorite,
  className = ''
}: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className={`card card-hover text-left cursor-pointer group relative ${className}`}
    >
      <button
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star className={`w-5 h-5 transition-colors ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} />
      </button>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors pr-8">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
      <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
        {ctaText} →
      </span>
    </button>
  );
}

