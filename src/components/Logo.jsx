import { Images } from '../utils/images';
import OptimizedImage from './OptimizedImage';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <OptimizedImage 
        src={Images.logo} 
        alt="FireBlink Logo" 
        className="h-12 w-auto"
        priority={true}
        sizes="thumbnail"
      />
    </div>
  );
};

export default Logo; 