"use client";

import React from "react";
import Image from "next/image";
import ReplyArrow from "../../../public/images/icon-reply.svg";

const ReplyButton = ({
  setReplying,
}: {
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-1 items-center" onClick={() => setReplying(true)}>
      <Image src={ReplyArrow} alt="Reply arrow" />
      <p className="text-moderate-blue bold">Reply</p>
    </div>
  );
};

export default ReplyButton;
