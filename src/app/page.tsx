import Image from 'next/image'
import CommentsList from './components/CommentList';
import NewCommentContainer from './components/NewCommentContainer';

export default function Home() {
  return (
    <div className="flex min-h-screen w-[375px]  bg-gray-500 flex-col items-center justify-between p-4">
      <CommentsList />
      <NewCommentContainer />
    </div>
  );
}
