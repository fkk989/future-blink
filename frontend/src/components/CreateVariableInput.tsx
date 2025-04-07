export const CreateVariableInput = ({
  onChange,
}: {
  onChange: (input: string) => void;
}) => {
  return (
    <input
      type="text"
      className="w-[150px] h-[40px] rounded"
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
