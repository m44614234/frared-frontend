import { baseUrl } from "./baseUrl";

export const logout = async () => {

    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('خطای درخواست');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('خطایی رخ داد:', error);
      throw error; // می‌توانید خطا را مدیریت کنید یا به کاربر اطلاع دهید
    }
  };
  