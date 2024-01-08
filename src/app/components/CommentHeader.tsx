import React from 'react'
import Image from "next/image";
import type { User } from '@/app/helpers/types/types'
import { formatCreatedDate } from '../helpers/formatDate';

const CommentHeader = ({ user, createdAt }: { user: User, createdAt: Date }) => {


  return (
    <div className="flex">
      <Image src={user.image} alt="Avatar" width="20" height="20" />
      <p>{user.name}</p>
      <p className="">{formatCreatedDate(createdAt)}</p>
    </div>
  );
}

export default CommentHeader