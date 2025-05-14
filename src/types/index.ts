export type ItemType = "text" | "image" | "note";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  id: string;
  type: ItemType;
  content: string;
  boardId: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  label?: string;
  fromItemId: string;
  toItemId: string;
  boardId: string;
  color?: string;
  thickness?: number;
  style?: "solid" | "dashed" | "dotted";
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardWithItems extends Board {
  items: Item[];
  connections: Connection[];
  user: User;
}

export interface CreateItemDto {
  type: ItemType;
  content: string;
  boardId: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export interface CreateConnectionDto {
  fromItemId: string;
  toItemId: string;
  boardId: string;
  label?: string;
  color?: string;
  thickness?: number;
  style?: "solid" | "dashed" | "dotted";
}

export interface UpdateItemPositionDto {
  id: string;
  x: number;
  y: number;
  boardId: string;
}

export interface UpdateItemSizeDto {
  id: string;
  width: number;
  height: number;
  boardId: string;
}

export interface UpdateItemContentDto {
  id: string;
  content: string;
  boardId: string;
} 