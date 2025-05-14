'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { BoardList } from '@/components/board/BoardList';
import { CreateBoardForm } from '@/components/board/CreateBoardForm';
import { mockBoards, mockUsers } from '@/data/mockData';

export default function BoardsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [boards, setBoards] = useState(mockBoards);
  const currentUser = mockUsers[0];
  
  const handleCreateBoard = (title: string, description: string, isPublic: boolean) => {
    const newBoard = {
      id: `board-${Date.now()}`,
      title,
      description: description || undefined,
      userId: currentUser.id,
      isPublic,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setBoards([newBoard, ...boards]);
    setShowCreateForm(false);
  };
  
  return (
    <AppLayout currentUser={currentUser}>
      <div className="max-w-6xl mx-auto space-y-8">
        {showCreateForm ? (
          <CreateBoardForm 
            onSubmit={handleCreateBoard}
            onCancel={() => setShowCreateForm(false)}
          />
        ) : (
          <BoardList 
            boards={boards} 
            currentUser={currentUser}
            onCreateBoard={() => setShowCreateForm(true)}
          />
        )}
      </div>
    </AppLayout>
  );
} 