import {showMessage} from 'react-native-flash-message';

// Define a type for the options if you want to make it more customizable

// Function to show a success message
export const showSuccess = (message: string) => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
    duration: 5000,
  });
};

// Function to show an error message
export const showError = (message: string) => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
    duration: 5000, 
  });
};

export const showMessages = (message: string) => {
  showMessage({
    message,
    type: 'info',
    icon: 'info',
    duration: 5000, 
  });
};
