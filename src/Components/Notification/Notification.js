import { notification } from 'antd';
import './Notification.scss'

const openNotification = (text) => {
  notification.warning({
    message: `Warning`,
    description: text,
    placement: 'topRight'
  });
};

export default openNotification