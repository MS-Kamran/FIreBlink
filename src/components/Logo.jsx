import logo from '../assets/fireblink-logo.svg';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={logo} 
        alt="FireBlink Logo" 
        className="h-12 w-auto object-contain"
      />
    </div>
  );
};

export default Logo; 