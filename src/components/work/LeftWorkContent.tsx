import React from "react";

const LeftWorkContent: React.FC<{
  headingText: string;
  leftBodyText: string;
}> = ({ headingText, leftBodyText }) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-xl font-semibold">{headingText}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: leftBodyText }} />
    </>
  );
};

export default LeftWorkContent;
