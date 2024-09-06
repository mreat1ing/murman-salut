import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { getOrdered } from 'src/utils/sessionStorage.utils';
interface IPrivateRoute {
  children: JSX.Element
}

const PrivateRoute:FC<IPrivateRoute> = ({ children }) => {
  // const [isPrivate, setIsPrivate] = useState<boolean>(getOrdered());
  const ordered = getOrdered();

  return (ordered ? children : <Navigate to="/" replace={true} />);
};

export default PrivateRoute;