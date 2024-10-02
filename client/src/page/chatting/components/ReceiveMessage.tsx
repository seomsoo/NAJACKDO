interface ReceiveMessageProps {
  message: string;
  messageType: "MESSAGE" | "PAY" | "RETURN";
}

const ReceiveMessage = ({ message, messageType }: ReceiveMessageProps) => {
  return (
    <div className="flex">
      {messageType === "MESSAGE" ? (
        <span className="p-3 bg-white rounded-xl rounded-tl-none text-left">
          {message}
        </span>
      ) : (
        <span
          className="p-3 bg-white rounded-xl rounded-tl-none text-left"
          dangerouslySetInnerHTML={{ __html: message }}
        ></span>
      )}
    </div>
  );
};

export default ReceiveMessage;
