import './style/button.css';

type ButtonProps = {
  title: string;
  onClick: () => any;
  bgColor: string;
  textColor: string;
  type?: "button" | "submit" | "reset";
};

function button({ title, onClick, bgColor, textColor, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      className="button-common"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {title}
    </button>
  );
}

export default button;
