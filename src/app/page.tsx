import Image from 'next/image'
import CommentsList from './components/CommentList';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#121212] flex-col items-center justify-between p-24">
      <CommentsList />
    </div>
  );
}
