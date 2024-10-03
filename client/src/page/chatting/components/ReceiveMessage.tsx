interface ReceiveMessageProps {
  message: string;
  talkType: "MESSAGE" | "PAY" | "RETURN";
}

const ReceiveMessage = ({ message, talkType }: ReceiveMessageProps) => {
  return (
    <div className="flex">
      {talkType === "MESSAGE" ? (
        <span className="p-3 bg-white rounded-xl rounded-tl-none text-left">
          {message}
        </span>
      ) : (
        <span
          className="p-3 rounded-xl rounded-tl-none text-left"
          dangerouslySetInnerHTML={{ __html: message }}
        ></span>
      )}
    </div>
  );
};

export default ReceiveMessage;
