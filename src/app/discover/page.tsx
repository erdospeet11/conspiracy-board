'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { mockBoards, mockUsers } from '@/data/mockData';
import Link from 'next/link';

export default function DiscoverPage() {
  const currentUser = mockUsers[0];
  const publicBoards = mockBoards.filter(board => board.isPublic);
  
  return (
    <AppLayout currentUser={currentUser}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Conspiracy Boards</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore public conspiracy boards created by our community. Dive into fascinating theories 
            and see how others connect the dots.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicBoards.map(board => (
            <Link 
              key={board.id}
              href={`/board/${board.id}`}
              className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center border-b">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{board.title}</h2>
                {board.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{board.description}</p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Public</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {publicBoards.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No public boards yet</h3>
            <p className="text-gray-600 mb-4">Be the first to create and share a conspiracy board!</p>
            <Link
              href="/boards"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create a board
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
} 