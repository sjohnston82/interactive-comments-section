"use client";

import React from "react";

// /@\S+\b/;

const HighlightedText = ({
  text,
  pattern,
}: {
  text: string;
  pattern: RegExp;
}) => {

  const parts = text.split(pattern).map((part, index) =>
    pattern.test(part) ? (
      <span key={index} className="text-moderate-blue font-bold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );

  return (
    <div>
      <p>{parts}</p>
    </div>
  );
};

export default HighlightedText;
