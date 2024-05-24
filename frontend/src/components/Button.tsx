type buttonProps = {
  placeholder: string;
  styleClass: string;
  onclick: () => void;
};
export const Button = ({ placeholder, styleClass, onclick }: buttonProps) => {
  return (
    <button
      className={`bg-black text-white p-2 px-4 text-sm rounded-md border-0 ${styleClass}`}
      onClick={() => onclick()}
    >
      {placeholder}
    </button>
  );
};
