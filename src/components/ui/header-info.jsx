import React from 'react';
import { Badge } from '@/components/ui/badge';

const HeaderInfo = ({ badgeText, title, description, className }) => {
  return (
    <div
      className={`container mx-auto px-4 pb-6 md:pb-8 text-left md:text-center ${
        className || ''
      }`}
    >
      <Badge variant='secondary' className='mb-3 md:mb-4 text-xs'>
        {badgeText}
      </Badge>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4'>
        {title}
      </h2>
      <p className='text-base md:text-lg text-muted-foreground'>
        {description}
      </p>
    </div>
  );
};

export default HeaderInfo;
