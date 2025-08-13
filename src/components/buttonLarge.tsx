import './style/buttonLarge.css'

type ButtonProps = {
  title: string;
  onClick: () => void;
};

function buttonLarge({title, onClick} : ButtonProps) {
  return (
    <button 
      className="button-large" 
      onClick={onClick} 
    >
          {title}
    </button>
  )
}


export default buttonLarge