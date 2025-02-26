import { useState } from "react";
import emailjs from "emailjs-com";
import { saveOrder } from "../api/api";

const useSaveOrder = () => {
    const [isOrdered, setIsOrdered] = useState(false);

    const submitOrder = async (formData, orderItems, cityFilter, clearCart = null) => {
        try {
            const orderData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                address: formData.address,
                city: cityFilter,
                note: formData.note || "",
                orderItems: orderItems.map(item => ({
                    id: item.id,
                    name: item.productname,
                    quantity: item.quantity,
                    option: item.option || "",
                    price: parseFloat(item.discount_price.replace(/[^\d.-]/g, "")) * item.quantity
                }))
            };

            await saveOrder(orderData);

            setIsOrdered(true);
            setTimeout(() => setIsOrdered(false), 5000);

            const orderDetails = orderItems
                .map(item => `Продукт: ${item.productname}, Количество: ${item.quantity}` + (item.option ? `, Опция: ${item.option}` : ""))
                .join("\n");

            formData.city = cityFilter;

            const emailData = { ...formData, order: orderDetails };

            emailjs.send("service_b06m24g", "template_mk02aun", emailData, "PLenflNoe6IDfFa9G")
                .then(() => {
                    setIsOrdered(true);
                    setTimeout(() => setIsOrdered(false), 5000);
                    if (clearCart) clearCart();
                })
                .catch((err) => {
                    console.error("❌ Email sending failed:", err);
                    alert("Грешка при изпращането на поръчката.");
                });

            formData.firstName = "";
            formData.lastName = "";
            formData.phone = "";
            formData.address = "";
            formData.city = "";
            formData.note = "";

        } catch (error) {
            console.error("❌ Error submitting order:", error);
            alert(error.message);
        }
    };

    return { isOrdered, submitOrder };
};

export default useSaveOrder;
