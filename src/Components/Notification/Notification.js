import { notification } from 'antd';
import './Notification.scss'

/**
 * Display notification box
 * @method
 * @param {String} text Notification description 
 * @return Notification box in right top corner
 */
const openNotification = (text) => {
  notification.warning({
    message: `Warning`,
    description: text,
    placement: 'topRight'
  });
};

export default openNotification