interface Example {
  text: string;
}

const Example: React.FC<Example> = ({ text }) => {
  return <div>{text}</div>;
};

export default Example;
