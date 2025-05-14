import { User, Board, Item, Connection, BoardWithItems } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: 'https://ui-avatars.com/api/?name=Jane+Smith',
  },
];

export const mockBoards: Board[] = [
  {
    id: '1',
    title: 'Alien Conspiracy',
    description: 'Investigation into UFO sightings and government coverups',
    userId: '1',
    isPublic: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '2',
    title: 'Big Tech Monopolies',
    description: 'Connections between tech companies and political influence',
    userId: '1',
    isPublic: false,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '3',
    title: 'Secret Societies',
    description: 'Tracking connections between global elite figures',
    userId: '2',
    isPublic: true,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-12'),
  },
];

export const mockItems: Item[] = [
  {
    id: '1',
    type: 'text',
    content: 'Area 51',
    boardId: '1',
    x: 200,
    y: 100,
    width: 150,
    height: 50,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    type: 'text',
    content: 'Roswell Incident',
    boardId: '1',
    x: 500,
    y: 200,
    width: 150,
    height: 50,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1636555483684-052a77ae7497?q=80&w=200&auto=format&fit=crop',
    boardId: '1',
    x: 300,
    y: 300,
    width: 200,
    height: 150,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '4',
    type: 'note',
    content: 'Government documents show increased activity in 1947.',
    boardId: '1',
    x: 600,
    y: 400,
    width: 200,
    height: 100,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

export const mockConnections: Connection[] = [
  {
    id: '1',
    label: 'Covered up by',
    fromItemId: '2',
    toItemId: '1',
    boardId: '1',
    color: '#FF0000',
    thickness: 2,
    style: 'solid',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    label: 'Evidence',
    fromItemId: '3',
    toItemId: '2',
    boardId: '1',
    color: '#00FF00',
    thickness: 1,
    style: 'dashed',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    label: 'Supports theory',
    fromItemId: '4',
    toItemId: '2',
    boardId: '1',
    color: '#0000FF',
    thickness: 1.5,
    style: 'dotted',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

export const getMockBoardWithItems = (boardId: string): BoardWithItems | undefined => {
  const board = mockBoards.find(b => b.id === boardId);
  if (!board) return undefined;
  
  const user = mockUsers.find(u => u.id === board.userId);
  if (!user) return undefined;
  
  const items = mockItems.filter(item => item.boardId === boardId);
  const connections = mockConnections.filter(conn => conn.boardId === boardId);
  
  return {
    ...board,
    items,
    connections,
    user,
  };
}; 