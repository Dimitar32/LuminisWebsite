import emailjs from 'emailjs-com';

export const sendOrderEmail = async (formData, productDetails = null) => {
    try {
        let orderDetails = productDetails
            ? `Продукт: ${productDetails.name}, Количество: ${formData.quantity}` + 
              (productDetails.option ? `, Option: ${productDetails.option}` : '')
            : formData.order;

        const emailData = { ...formData, order: orderDetails };

        await emailjs.send('service_b06m24g', 'template_mk02aun', emailData, 'mjkXxA3GKaz2EgF9X');
        return true;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};

export const fetchEcontOffices = async () => {
    try {
      const response = await fetch("https://luminisapi.onrender.com/api/get-offices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
  
      if (data?.success && data.offices) {
        return data.offices;
      } else {
        console.error("❌ No offices found:", data);
        return [];
      }
    } catch (error) {
      console.error("❌ Error fetching Econt offices:", error);
      alert("Грешка при зареждането на офисите на Еконт.");
      return [];
    }
  };
  