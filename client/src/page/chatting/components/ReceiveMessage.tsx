interface ReceiveMessageProps {
  message: string;
}

const ReceiveMessage = ({ message }: ReceiveMessageProps) => {
  return (
    <div className="flex">
      <span className="p-3 bg-white rounded-xl rounded-tl-none text-left">
        {message}
      </span>
    </div>
  );
};

export default ReceiveMessage;
