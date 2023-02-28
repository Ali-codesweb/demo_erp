import { showNotification } from '@mantine/notifications';


export const ErrorNotification = (message) => {
  showNotification({
    title: 'Error',
    message,
    color: 'red'
  })
}