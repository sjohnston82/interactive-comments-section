"use client"

import React from 'react'
import Trashcan from '../../../public/images/icon-delete.svg';
import EditIcon from '../../../public/images/icon-edit.svg';
import Image from 'next/image';

const EditDeleteContainer = () => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <Image src={Trashcan} alt="Delete icon" />
        <p className="text-soft-red bold">Delete</p>
      </div>
      <div className="flex items-center">
        <Image src={EditIcon} alt="Edit icon" />
        <p className="text-moderate-blue bold">Edit</p>
      </div>
    </div>
  );
}

export default EditDeleteContainer