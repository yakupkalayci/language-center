interface ButtonProps {
    title: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    onClick?: () => void;
}

function Button(props: ButtonProps) {

    const { title, type = "button", disabled, onClick } = props;

  return (
    <button 
        type={type}
        disabled={disabled}
        onClick={onClick}
        className='bg-[#102B4E] text-white rounded-[6px] px-4 cursor-pointer h-[40px] font-medium hover:opacity-90 flex justify-center items-center'
    >
        {title}
    </button>
  )
}

export default Button;