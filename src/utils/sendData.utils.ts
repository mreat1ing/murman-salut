import { ICartItem } from 'src/interfaces/cartItem.interface';
import { fullSessionStorageClear } from 'src/utils/sessionStorage.utils';
 
interface IFormData {
  name: string,
  phone: string,
  email: string,
  address: string,
  items: ICartItem[],
  sum: number,
  amount: number,
  num?: number
}

async function sendForm(data: IFormData) {
  const req = await fetch('./file.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const res = await req.json();
  if (req.status === 200) {
    const newData = {...data, num: res};
    return sendToUser(newData);
  } else {
    return 'error';
  }
}
async function sendToUser(data: IFormData) {
const req = await fetch('./user.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});


if (req.status === 200) {
  fullSessionStorageClear();
  return 'thanks';

} else {
  fullSessionStorageClear();
  return 'user-error';
}
}

export { sendForm };