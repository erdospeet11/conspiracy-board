'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AppLayout } from '@/components/layout/AppLayout';
import { BoardToolbar } from '@/components/board/BoardToolbar';
import { getMockBoardWithItems, mockUsers } from '@/data/mockData';
import { CreateItemDto, CreateConnectionDto, ItemType, Item } from '@/types';

const ConspiracyBoard = dynamic(
  () => import('@/components/board/ConspiracyBoard'),
  { ssr: false }
);

export default function BoardPage() {
  const params = useParams<{ id: string }>();
  const boardId = params.id;
  
  const initialBoardData = getMockBoardWithItems(boardId);
  const [board, setBoard] = useState(initialBoardData);
  const currentUser = mockUsers[0];
  
  if (!board) {
    return (
      <AppLayout currentUser={currentUser}>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Board Not Found</h1>
          <p className="text-gray-600">The conspiracy board you're looking for doesn't exist or has been deleted.</p>
        </div>
      </AppLayout>
    );
  }
  
  const handleAddItem = useCallback((item: CreateItemDto) => {
    const newItem: Item = {
      id: `item-${Date.now()}`,
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setBoard(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  }, []);
  
  const handleAddItemFromToolbar = useCallback((type: ItemType) => {
    const newItem: CreateItemDto = {
      type,
      content: type === 'text' ? 'New Text' : type === 'note' ? 'Add your notes here...' : '',
      boardId: board.id,
      x: 400, 
      y: 300,
      width: type === 'text' ? 150 : type === 'note' ? 200 : 250,
      height: type === 'text' ? 50 : type === 'note' ? 150 : 200,
    };
    
    handleAddItem(newItem);
  }, [board?.id, handleAddItem]);
  
  const handleAddImage = useCallback(() => {
    handleAddItem({
      type: 'image',
      content: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=300&auto=format&fit=crop',
      boardId: board.id,
      x: 400,
      y: 300,
      width: 300,
      height: 200,
    });
  }, [board?.id, handleAddItem]);
  
  const handleItemMove = useCallback((id: string, x: number, y: number) => {
    setBoard(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map(item => 
          item.id === id ? { ...item, x, y, updatedAt: new Date() } : item
        ),
      };
    });
  }, []);
  
  const handleConnectionCreate = useCallback((connection: CreateConnectionDto) => {
    setBoard(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        connections: [
          ...prev.connections,
          {
            id: `connection-${Date.now()}`,
            ...connection,
            color: '#FF0000',
            thickness: 2,
            style: 'solid',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
      };
    });
  }, []);
  
  const handleSave = useCallback(() => {
    alert('Board saved!');
  }, []);
  
  const handleShare = useCallback(() => {
    alert(`Share URL: ${window.location.href}`);
  }, []);
  
  return (
    <AppLayout currentUser={currentUser}>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <BoardToolbar 
          onAddItem={handleAddItemFromToolbar}
          onAddImage={handleAddImage}
          onSave={handleSave}
          onShare={handleShare}
        />
        
        <div className="flex-grow">
          <ConspiracyBoard 
            board={board}
            onItemAdd={handleAddItem}
            onItemMove={handleItemMove}
            onConnectionCreate={handleConnectionCreate}
            isEditable={true}
          />
        </div>
      </div>
    </AppLayout>
  );
} 