interface ButtonTypes {
  title: string;
  disabled?: boolean;
  click: () => void;
}

export const Button = ({ title, disabled = false, click }: ButtonTypes) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      disabled={disabled}
      onClick={click}
    >
      {disabled ? `loading...` : title}
    </button>
  );
};
