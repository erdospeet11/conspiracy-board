'use client';

import { FC, useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BoardWithItems, CreateItemDto, CreateConnectionDto } from '@/types';
import { KonvaEventObject } from 'konva/lib/Node';

const Stage = dynamic(() => import('react-konva').then((mod) => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then((mod) => mod.Layer), { ssr: false });
const Rect = dynamic(() => import('react-konva').then((mod) => mod.Rect), { ssr: false });

const BoardItem = dynamic(() => import('./BoardItem').then((mod) => mod.BoardItem), { ssr: false });
const BoardConnection = dynamic(() => import('./BoardConnection').then((mod) => mod.BoardConnection), { ssr: false });

interface ConspiracyBoardProps {
  board: BoardWithItems;
  onItemAdd?: (item: CreateItemDto) => void;
  onItemMove?: (id: string, x: number, y: number) => void;
  onItemSelect?: (id: string | null) => void;
  onConnectionCreate?: (connection: CreateConnectionDto) => void;
  onConnectionSelect?: (id: string | null) => void;
  isEditable?: boolean;
}

export const ConspiracyBoard: FC<ConspiracyBoardProps> = ({
  board,
  onItemAdd,
  onItemMove,
  onItemSelect,
  onConnectionCreate,
  onConnectionSelect,
  isEditable = true,
}) => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionStartItemId, setConnectionStartItemId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  
  const handleItemSelect = (id: string) => {
    if (isCreatingConnection) {
      if (connectionStartItemId) {
        if (connectionStartItemId !== id) {
          onConnectionCreate?.({
            fromItemId: connectionStartItemId,
            toItemId: id,
            boardId: board.id,
          });
        }
        setIsCreatingConnection(false);
        setConnectionStartItemId(null);
      }
    } else {
      setSelectedItemId(id);
      setSelectedConnectionId(null);
      onItemSelect?.(id);
    }
  };
  
  const handleConnectionSelect = (id: string) => {
    setSelectedConnectionId(id);
    setSelectedItemId(null);
    onConnectionSelect?.(id);
  };
  
  const handleItemMove = (id: string, x: number, y: number) => {
    onItemMove?.(id, x, y);
  };
  
  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.currentTarget;
    
    if (clickedOnEmpty) {
      setSelectedItemId(null);
      setSelectedConnectionId(null);
      onItemSelect?.(null);
      onConnectionSelect?.(null);
      
      if (e.evt.altKey && isEditable) {
        const pos = stageRef.current?.getRelativePointerPosition();
        if (pos && onItemAdd) {
          onItemAdd({
            type: 'text',
            content: 'New Text',
            boardId: board.id,
            x: pos.x,
            y: pos.y,
            width: 150,
            height: 50,
          });
        }
      } else if (isCreatingConnection) {
        setIsCreatingConnection(false);
        setConnectionStartItemId(null);
      }
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEditable) return;
      
      if (e.key === 'c' && selectedItemId) {
        setIsCreatingConnection(true);
        setConnectionStartItemId(selectedItemId);
      }

      if (e.key === 'Escape' && isCreatingConnection) {
        setIsCreatingConnection(false);
        setConnectionStartItemId(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditable, selectedItemId, isCreatingConnection]);
  
  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    
    const scaleBy = 1.1;
    const oldScale = scale;
    
    const pointer = stageRef.current?.getPointerPosition();
    if (!pointer) return;
    
    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };
    
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
    setScale(newScale);
    setPosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };
  
  if (!isClient) {
    return (
      <div 
        ref={containerRef} 
        className="relative w-full h-full overflow-hidden border border-gray-300 bg-gray-50 flex items-center justify-center"
      >
        <div className="text-gray-500">Loading board...</div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden border border-gray-300 bg-gray-50"
    >
      {isCreatingConnection && (
        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center">
          Click on another item to create a connection or press ESC to cancel
        </div>
      )}
      
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onClick={handleStageClick}
        onWheel={handleWheel}
        draggable={!isCreatingConnection}
        onDragEnd={(e) => setPosition({ x: e.target.x(), y: e.target.y() })}
        x={position.x}
        y={position.y}
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          {/*background*/}
          <Rect
            width={5000}
            height={5000}
            x={-2500}
            y={-2500}
            fill="#f9f9f9"
            stroke="#dddddd"
            strokeWidth={1}
          />
          
          {/*connections*/}
          {board.connections.map((connection) => {
            const fromItem = board.items.find(item => item.id === connection.fromItemId);
            const toItem = board.items.find(item => item.id === connection.toItemId);
            
            if (!fromItem || !toItem) return null;
            
            return (
              <BoardConnection
                key={connection.id}
                connection={connection}
                fromItem={fromItem}
                toItem={toItem}
                isSelected={selectedConnectionId === connection.id}
                onSelect={handleConnectionSelect}
              />
            );
          })}
          
          {/*items*/}
          {board.items.map((item) => (
            <BoardItem
              key={item.id}
              item={item}
              isSelected={selectedItemId === item.id || connectionStartItemId === item.id}
              onSelect={handleItemSelect}
              onPositionChange={handleItemMove}
            />
          ))}
        </Layer>
      </Stage>
      
      {isEditable && (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs text-gray-600">
          <p>ALT + Click: Add new text</p>
          <p>Select item + C: Create connection</p>
          <p>Wheel: Zoom in/out</p>
          <p>Drag: Pan the board</p>
        </div>
      )}
    </div>
  );
};

export default ConspiracyBoard; 