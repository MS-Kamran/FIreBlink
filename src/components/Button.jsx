const Button = ({ primary, children, className = '', ...props }) => {
  return (
    <button
      className={`
        px-6 py-3 rounded-lg
        font-medium text-sm
        transition-all duration-300
        transform hover:scale-[1.02]
        ${primary 
          ? 'bg-primary text-white hover:bg-amber-800' 
          : 'bg-secondary text-white hover:bg-orange-400'}
        shadow-sm hover:shadow-md
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 