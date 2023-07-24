import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainerWrapper = ({ isMobile, isDarkMode }) => (
  <ToastContainer
    position={isMobile ? 'bottom-center' : 'bottom-right'}
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={isDarkMode ? 'dark' : 'light'}
  />
);
