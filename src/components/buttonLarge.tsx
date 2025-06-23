import './style/buttonLarge.css'

type ButtonProps = {
  title: string;
  onClick: () => any;
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