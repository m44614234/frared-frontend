// utils/calculateReadingTime.js
 const CalculateReadingTime = (text : any) => {
    
    const wordsPerMinute = 250; // سرعت متوسط خواندن
    const words = text?.split(/s+/)?.filter(Boolean)?.length; // تعداد کلمات
    const minutes = Math?.ceil(words / wordsPerMinute); // زمان مطالعه به دقیقه
  
    return minutes;
  };
  export default CalculateReadingTime