const Message = ({
  content,
  isSender,
}: {
  content: string;
  isSender: boolean;
}) => {
  if (isSender) {
    return (
      <li className="p-2 bg-blue-600 w-max max-w-[50%] break-words text-white self-end rounded-lg mx-3 my-1">
        {content}
      </li>
    );
  } else {
    return (
      <li className="p-2 bg-slate-100 w-max max-w-[50%] break-words rounded-lg mx-3 my-1">
        {content}
      </li>
    );
  }
};

export default Message;
