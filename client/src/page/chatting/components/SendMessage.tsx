interface SendMessageProps {
  message: string;
  messageType: "MESSAGE" | "PAY" | "RETURN";
}

const SendMessage = ({ message, messageType }: SendMessageProps) => {
  return (
    <div className="flex flex-row justify-end w-full">
      {messageType === "MESSAGE" ? (
        <p className="bg-[#5F6F52] p-3 rounded-xl rounded-tr-none text-white text-right ml-auto">
          {message}
        </p>
      ) : (
        <p
          className="bg-[#5F6F52] p-3 rounded-xl rounded-tr-none text-white text-right ml-auto"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
      )}
    </div>
  );
};

export default SendMessage;
