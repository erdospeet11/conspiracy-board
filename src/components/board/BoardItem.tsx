'use client';

import { FC, useState } from 'react';
import { Group, Rect, Text, Image as KonvaImage } from 'react-konva';
import { Item, ItemType } from '@/types';
import useImage from 'use-image';

interface BoardItemProps {
  item: Item;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export const BoardItem: FC<BoardItemProps> = ({
  item,
  isSelected,
  onSelect,
  onPositionChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image] = useImage(item.type === 'image' ? item.content : '');
  
  const width = item.width || 100;
  const height = item.height || 100;
  
  const handleDragStart = () => {
    setIsDragging(true);
    onSelect(item.id);
  };
  
  const handleDragEnd = (e: any) => {
    setIsDragging(false);
    onPositionChange(item.id, e.target.x(), e.target.y());
  };
  
  const getBorderColor = () => {
    if (isSelected) return '#3498db';
    return isDragging ? '#2ecc71' : 'gray';
  };
  
  const renderContent = () => {
    switch (item.type) {
      case 'text':
        return (
          <Text
            text={item.content}
            width={width}
            height={height}
            fontSize={16}
            fontFamily="Arial"
            fill="#333"
            padding={10}
            align="center"
            verticalAlign="middle"
          />
        );
      case 'image':
        return image ? (
          <KonvaImage
            image={image}
            width={width}
            height={height}
          />
        ) : (
          <Rect
            width={width}
            height={height}
            fill="#eeeeee"
          />
        );
      case 'note':
        return (
          <Group>
            <Rect
              width={width}
              height={height}
              fill="#fff9c4"
              shadowColor="black"
              shadowBlur={5}
              shadowOpacity={0.3}
              shadowOffset={{ x: 2, y: 2 }}
              cornerRadius={4}
            />
            <Text
              text={item.content}
              width={width}
              height={height}
              fontSize={14}
              fontFamily="Arial"
              fill="#333"
              padding={10}
              wrap="word"
            />
          </Group>
        );
      default:
        return null;
    }
  };
  
  return (
    <Group
      x={item.x}
      y={item.y}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(item.id)}
      rotation={item.rotation || 0}
    >
      <Rect
        width={width}
        height={height}
        stroke={getBorderColor()}
        strokeWidth={isSelected ? 2 : 1}
        fill={item.type === 'note' ? 'transparent' : '#ffffff'}
        cornerRadius={4}
        shadowColor="black"
        shadowBlur={isDragging ? 10 : 5}
        shadowOpacity={0.2}
        shadowOffset={{ x: 2, y: 2 }}
      />
      {renderContent()}
    </Group>
  );
};

export default BoardItem; 