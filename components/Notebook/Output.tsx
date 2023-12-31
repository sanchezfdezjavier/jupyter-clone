type OutputProps = {
  content: string;
};

const Output = (props: OutputProps) => {
  return (
    <div className="mt-4 p-2 overflow-auto">
      <p className="font-mono whitespace-pre-wrap">{props.content}</p>
    </div>
  );
};

export default Output;
