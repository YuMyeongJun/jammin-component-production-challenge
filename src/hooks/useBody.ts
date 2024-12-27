import { useEffect, useState } from 'react';

export const useBody = () => {
  const [body, setBody] = useState<HTMLBodyElement | null>(null);

  useEffect(() => {
    setBody(document.querySelector('body'));
  }, []);

  return body;
};
