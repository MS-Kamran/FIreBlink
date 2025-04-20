import { Images } from '../utils/images';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={Images.logo} 
        alt="FireBlink Logo" 
        className="h-12 w-auto object-contain"
      />
    </div>
  );
};

export default Logo; 