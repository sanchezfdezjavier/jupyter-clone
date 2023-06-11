type OutputProps = {
  output: string;
};

const Output = ({ output }: OutputProps) => {
  return (
    <div className="mt-4 p-2">
      <pre>{output}</pre>
    </div>
  );
};

export default Output;
