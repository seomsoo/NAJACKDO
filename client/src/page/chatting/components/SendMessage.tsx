interface SendMessageProps {
  message: string;
}

const SendMessage = ({ message }: SendMessageProps) => {
  return (
    <div className="flex flex-row justify-end w-full">
      <p className="bg-[#5F6F52] p-3 rounded-xl rounded-tr-none text-white text-right ml-auto">
        {message}
      </p>
    </div>
  );
};

export default SendMessage;
