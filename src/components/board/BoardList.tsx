import { FC } from 'react';
import Link from 'next/link';
import { Board, User } from '@/types';

interface BoardListProps {
  boards: Board[];
  currentUser?: User;
  onCreateBoard?: () => void;
}

export const BoardList: FC<BoardListProps> = ({
  boards,
  currentUser,
  onCreateBoard
}) => {
  const userBoards = boards.filter(board => 
    currentUser && board.userId === currentUser.id
  );
  
  const sharedBoards = boards.filter(board => 
    board.isPublic && (!currentUser || board.userId !== currentUser.id)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Conspiracy Boards</h2>
        <button
          onClick={onCreateBoard}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
        >
          Create New Board
        </button>
      </div>
      
      {currentUser && userBoards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBoards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : currentUser ? (
        <div className="bg-gray-50 rounded-md p-6 text-center">
          <p className="text-gray-600 mb-4">You don&apos;t have any conspiracy boards yet.</p>
          <button
            onClick={onCreateBoard}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
          >
            Create Your First Board
          </button>
        </div>
      ) : null}
      
      {sharedBoards.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mt-8">Public Boards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedBoards.map(board => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface BoardCardProps {
  board: Board;
}

const BoardCard: FC<BoardCardProps> = ({ board }) => {
  return (
    <Link 
      href={`/board/${board.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{board.title}</h3>
      </div>
      <div className="p-4">
        {board.description ? (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{board.description}</p>
        ) : (
          <p className="text-sm text-gray-500 italic mb-3">No description</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Created: {new Date(board.createdAt).toLocaleDateString()}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            board.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {board.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
    </Link>
  );
}; 