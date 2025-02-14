import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './OrderForm.css';

const OrderForm = () => {
    const navigate = useNavigate();
    const [isOrdered, setIsOrdered] = useState(false);
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [cityFilter, setCityFilter] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        note: ''
    });

    const { submitOrder } = useSaveOrder();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Количката е празна!");
            return;
        }

        await submitOrder(formData, cartItems, cityFilter, clearCart);
        setIsOrdered(true);
        
        setTimeout(() => {
            setIsOrdered(false);
            navigate("/"); 
        }, 5000);
    };

    const { offices } = useEcontOffices();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,  
            ...(name === "office" && { address: value }) 
        }));
    };

    const handleCityFilterChange = (e) => {
        setCityFilter(e.target.value);
    };

    const filteredOffices = offices.filter((office) => {
        const fullAddress = office.address?.fullAddress?.toLowerCase().trim() || "";
        const searchInput = cityFilter.toLowerCase().trim();
        
        return fullAddress.includes(searchInput);
    });
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (cartItems.length === 0) {
    //         alert("Количката е празна!");
    //         return;
    //     }
    
    //     try {
    //         const orderData = {
    //             firstName: formData.firstName,
    //             lastName: formData.lastName,
    //             phone: formData.phone,
    //             address: formData.address,  
    //             city: cityFilter,  
    //             note: formData.note || "",
    //             orderItems: cartItems.map(item => ({
    //                 id: item.id,
    //                 name: item.name,
    //                 quantity: item.quantity,
    //                 option: item.option || "",
    //                 price: parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity
    //             }))
    //         };
    
    //         const response = await fetch("https://luminisapi.onrender.com/api/save-order", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(orderData),
    //         });
    
    //         const result = await response.json();
    
    //         if (!response.ok) {
    //             throw new Error(result.message || "Грешка при запазване на поръчката. Моля пробвайте пак!");
    //         }
    
    //         setIsOrdered(true);
    //         setTimeout(() => setIsOrdered(false), 5000);
    //         setFormData({
    //             firstName: '',
    //             lastName: '',
    //             phone: '',
    //             address: '',
    //             city: '',
    //             note: ''
    //         });

    //         const orderDetails = cartItems
    //             .map(item => `Продукт: ${item.name}, Количество: ${item.quantity}` + (item.option ? `, Option: ${item.option}` : ''))
    //             .join('\n');
             
    //         formData.city = cityFilter;
    
    //         const emailData = { ...formData, order: orderDetails };
    
    //         emailjs.send('service_b06m24g', 'template_mk02aun', emailData, 'PLenflNoe6IDfFa9G')
    //             .then(() => {
    //                 setIsOrdered(true);
    //                 setTimeout(() => setIsOrdered(false), 5000);
    //                 setFormData({
    //                     firstName: '',
    //                     lastName: '',
    //                     phone: '',
    //                     address: '',
    //                     city: '',
    //                     note: ''
    //                 });
    //                 clearCart();
    //             })
    //             .catch((err) => {
    //                 console.error('FAILED...', err);
    //                 alert('Грешка при изпращането на поръчката.');
    //             });
    //     } catch (error) {
    //         console.error("❌ Error submitting order:", error);
    //         alert(error.message);
    //     }
    // };

    return (
        <div className="order-form-container">
            <h3>Завършете поръчката</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Име</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Търси офис по град</label>
                    <input 
                        type="text" 
                        value={cityFilter} 
                        onChange={handleCityFilterChange} 
                        placeholder="Например: София" 
                    />
                </div>

                <div className="form-group">
                    <label>Офис на Еконт</label>
                    <select
                        name="office"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Избери офис</option>
                        {filteredOffices.length > 0 ? (
                            filteredOffices.map((office) => (
                                <option key={office.code} value={'Име на офиса: ' + office.name + ' ; Адрес: ' + office.address.fullAddress}>
                                    {office.name || "Няма име"} - {office.address.settlement?.name || office.address.fullAddress || "Няма адрес"}
                                </option>
                            ))
                        ) : (
                            <option value="">Няма намерени офиси</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label>Бележка</label>
                    <textarea 
                        name="note" 
                        value={formData.note} 
                        onChange={handleChange} 
                        placeholder="Ако искате до личен адрес, не намирате офиса на Еконт или имате въпрос може да го оставите тука"
                        rows="5" 
                        cols="35"
                    />
                </div>

                <div className="cart-items">
                    <h3>Вашата количка</h3>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна!!!</p>
                    ) : (
                        <>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.id} className="cart-item">
                                        {item.name} - {item.quantity} бр. - {item.option || ''} {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
                                        <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)}>
                                            Премахни
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <h3>Цена без доставка: {cartItems
                                .reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity), 0)
                                .toFixed(2)} лв.
                            </h3>
                        </>
                    )}
                </div>

                <button type="submit" className="submit-button">Изпрати поръчка</button>
            </form>

            {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение след 23.02.2025г.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
