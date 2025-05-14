'use client';

import { FC } from 'react';
import { Line, Text, Group } from 'react-konva';
import { Connection, Item } from '@/types';

interface BoardConnectionProps {
  connection: Connection;
  fromItem: Item;
  toItem: Item;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const BoardConnection: FC<BoardConnectionProps> = ({
  connection,
  fromItem,
  toItem,
  isSelected,
  onSelect,
}) => {
  const fromX = fromItem.x + (fromItem.width || 100) / 2;
  const fromY = fromItem.y + (fromItem.height || 100) / 2;
  const toX = toItem.x + (toItem.width || 100) / 2;
  const toY = toItem.y + (toItem.height || 100) / 2;
  
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  
  const getDashArray = () => {
    switch (connection.style) {
      case 'dashed':
        return [10, 5];
      case 'dotted':
        return [2, 3];
      default:
        return [];
    }
  };
  
  const arrowLength = 10;
  const arrowWidth = 5;
  const arrowAngle = angle + 180;
  const arrowRadians = arrowAngle * Math.PI / 180;
  
  const arrowPoints = [
    toX, toY,
    toX - arrowLength * Math.cos(arrowRadians - Math.PI / 7),
    toY - arrowLength * Math.sin(arrowRadians - Math.PI / 7),
    toX - arrowLength * Math.cos(arrowRadians + Math.PI / 7),
    toY - arrowLength * Math.sin(arrowRadians + Math.PI / 7),
    toX, toY
  ];
  
  const lineColor = connection.color || '#FF0000';
  const lineThickness = connection.thickness || 2;
  
  return (
    <Group onClick={() => onSelect(connection.id)}>
      {/*connection line*/}
      <Line
        points={[fromX, fromY, toX, toY]}
        stroke={lineColor}
        strokeWidth={isSelected ? lineThickness + 1 : lineThickness}
        dash={getDashArray()}
        opacity={isSelected ? 1 : 0.7}
      />
      
      {/*arrow head*/}
      <Line
        points={arrowPoints}
        fill={lineColor}
        closed={true}
        stroke={lineColor}
        strokeWidth={1}
      />
      
      {/*label*/}
      {connection.label && (
        <Text
          text={connection.label}
          x={midX}
          y={midY}
          offsetX={connection.label.length * 3.5}
          offsetY={8}
          fill="#333"
          fontSize={12}
          fontFamily="Arial"
          padding={2}
          background={isSelected ? '#FFFF99' : '#FFFFDD'}
          rotation={angle}
        />
      )}
    </Group>
  );
};

export default BoardConnection; 