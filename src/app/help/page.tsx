'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { mockUsers } from '@/data/mockData';
import Link from 'next/link';

export default function HelpPage() {
  const currentUser = mockUsers[0]; // Simulate logged in user
  
  return (
    <AppLayout currentUser={currentUser}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Use ConspiracyBoard</h1>
          <p className="text-lg text-gray-600">
            Learn how to create and manage your conspiracy boards to visualize connections
            and share your theories.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Getting Started */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ol className="list-decimal pl-6 space-y-4">
                <li className="text-gray-700">
                  <span className="font-semibold">Create an account or sign in</span> to access all features.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Create a new board</span> from the Boards page.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Add items</span> to your board by using the toolbar or keyboard shortcuts.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Connect items</span> to show relationships.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Save your board</span> to access it later.
                </li>
              </ol>
            </div>
          </section>
          
          {/* Board Basics */}
          <section id="board-basics">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Board Basics</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Navigation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700"><strong>Pan:</strong> Click and drag on empty space</li>
                  <li className="text-gray-700"><strong>Zoom:</strong> Use mouse wheel</li>
                  <li className="text-gray-700"><strong>Select item:</strong> Click on an item</li>
                  <li className="text-gray-700"><strong>Deselect:</strong> Click on empty space</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Adding Items</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700"><strong>From toolbar:</strong> Click the Text, Note, or Image button</li>
                  <li className="text-gray-700"><strong>Keyboard shortcut:</strong> ALT + Click on empty space adds a text item</li>
                  <li className="text-gray-700"><strong>Drag to position:</strong> Click and drag items to position them</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Creating Connections</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700"><strong>Select an item</strong> you want to connect from</li>
                  <li className="text-gray-700"><strong>Press 'C'</strong> to start creating a connection</li>
                  <li className="text-gray-700"><strong>Click on another item</strong> to create the connection</li>
                  <li className="text-gray-700"><strong>Press ESC</strong> to cancel connection creation</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Keyboard Shortcuts */}
          <section id="keyboard-shortcuts">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Keyboard Shortcuts</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">ALT + Click</span>
                    <span className="text-gray-700">Add text item</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">C</span>
                    <span className="text-gray-700">Create connection</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">ESC</span>
                    <span className="text-gray-700">Cancel action</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Scroll Wheel</span>
                    <span className="text-gray-700">Zoom in/out</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Drag</span>
                    <span className="text-gray-700">Pan the board</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Tips & Best Practices */}
          <section id="tips">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips & Best Practices</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="list-disc pl-6 space-y-3">
                <li className="text-gray-700">
                  <strong>Use color-coded connections</strong> to represent different types of relationships.
                </li>
                <li className="text-gray-700">
                  <strong>Group related items</strong> together spatially on the board.
                </li>
                <li className="text-gray-700">
                  <strong>Label your connections</strong> to clarify the relationship between items.
                </li>
                <li className="text-gray-700">
                  <strong>Save regularly</strong> to avoid losing your work.
                </li>
                <li className="text-gray-700">
                  <strong>Consider making complex boards private</strong> until they're ready to share.
                </li>
              </ul>
            </div>
          </section>
          
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Ready to start connecting the dots?</p>
            <Link 
              href="/boards" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Create Your Conspiracy Board
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 