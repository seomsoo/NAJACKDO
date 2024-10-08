interface SendMessageProps {
  message: string;
  talkType: "MESSAGE" | "PAY" | "RETURN";
}

const SendMessage = ({ message, talkType }: SendMessageProps) => {
  return (
    <div className="flex flex-row justify-end w-full">
      {talkType === "MESSAGE" ? (
        <p className="bg-main p-3 rounded-xl text-white rounded-tr-none text-right ml-auto">
          {message}
        </p>
      ) : (
        <p
          className="p-3 rounded-xl rounded-tr-none text-right ml-auto"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
      )}
    </div>
  );
};

export default SendMessage;
