import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog-posts-data';

const PER_PAGE = 6;

export async function GET(request: NextRequest) {
  const page = Math.max(1, Math.min(
    Number.parseInt(request.nextUrl.searchParams.get('page') ?? '1', 10) || 1,
    Math.ceil(blogPosts.length / PER_PAGE) || 1
  ));
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const posts = blogPosts.slice(start, start + PER_PAGE);
  return NextResponse.json({ posts, totalPages, currentPage: page });
}
