"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type DeleteModalProps = {
  onClose: () => void;
  onDelete: () => void;
  // commentId: string;
  // parentId: string | null; // to remove from list of replies of parent
};

const DeleteModal = ({ onClose, onDelete }: DeleteModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get("showModal");
  const commentId = searchParams.get("commentId");
  const parentId = searchParams.get("parentId");

  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    router.push("/");
  };

  console.log(commentId);

  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      await axios.post("api/comments/delete", {
        commentId: commentId,
        parentId: parentId,
      });
    },
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return (
    <dialog
      ref={modalRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/5"
    >
      <div className="flex flex-col p-4 bg-white w-4/5">
        <h1 className="">Delete comment</h1>
        <p className="">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className="flex">
          <button
            className="p-2 bg-grayish-blue text-white"
            onClick={closeModal}
          >
            NO, CANCEL
          </button>
          <button
            className="p-2 bg-soft-red text-white"
            onClick={() => deleteComment()}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
