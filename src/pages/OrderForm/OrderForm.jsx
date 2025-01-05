import React, { useContext, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { CartContext } from '../contexts/CartContext';
import './OrderForm.css';

const OrderForm = () => {
    const [isOrdered, setIsOrdered] = useState(false);
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    // Econt Office States
    const [offices, setOffices] = useState([]);  
    const [cityFilter, setCityFilter] = useState('');

    // Order form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        office: '',
        city: ''
    });

    useEffect(() => {
        const fetchEcontOffices = async () => {
            try {
                const response = await fetch('https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ filter: { countryCode: "BGR" } })
                });
    
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
                const data = await response.json();
                console.log("📌 Econt API Full Response:", data); // Debugging
    
                if (data?.offices) {
                    // 🔥 Filter out only Bulgarian offices (if API doesn't do it properly)
                    const bulgarianOffices = data.offices.filter(office => 
                        office.address?.city?.country?.code2 === "BG"
                    );
    
                    setOffices(bulgarianOffices);
                    
                    // Log first few offices to see structure
                    console.log("📌 Sample Office Data:", data.offices.slice(0, 5));
                } else {
                    console.error("❌ No offices found:", data);
                }
            } catch (error) {
                console.error("❌ Error fetching Econt offices:", error);
                alert("Грешка при зареждането на офисите на Еконт.");
            }
        };
    
        fetchEcontOffices();
    }, []);

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle city filter input change
    const handleCityFilterChange = (e) => {
        setCityFilter(e.target.value);
    };

    // Fixed filtering: Use `settlement.name` instead of `city`
    const filteredOffices = offices.filter((office) => {
        const fullAddress = office.address?.fullAddress?.toLowerCase().trim() || "";
        const searchInput = cityFilter.toLowerCase().trim();
        
        return fullAddress.includes(searchInput);
    });
    
    console.log("🔍 Filtered City Input:", cityFilter);
    console.log("🔍 Filtered Offices:", filteredOffices);

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderDetails = cartItems
            .map(item => `Name: ${item.name}, Quantity: ${item.quantity}, Option: ${item.option || 'None'}`)
            .join('\n');

        const emailData = { ...formData, order: orderDetails };

        emailjs.send('service_b06m24g', 'template_mk02aun', emailData, 'mjkXxA3GKaz2EgF9X')
            .then(() => {
                setIsOrdered(true);
                setTimeout(() => setIsOrdered(false), 5000);
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    office: '',
                    city: ''
                });
                clearCart();
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Грешка при изпращането на поръчката.');
            });
    };

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

                {/* City Search Input */}
                <div className="form-group">
                    <label>Търси офис по град</label>
                    <input 
                        type="text" 
                        value={cityFilter} 
                        onChange={handleCityFilterChange} 
                        placeholder="Например: София" 
                    />
                </div>

                {/* Econt Office Dropdown */}
                <div className="form-group">
                    <label>Офис на Еконт</label>
                    <select name="office" value={formData.office} onChange={handleChange} required>
                        <option value="">Избери офис</option>
                        {filteredOffices.length > 0 ? (
                            filteredOffices.map((office) => (
                                <option key={office.code} value={office.code}>
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
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Ако искате до личен адрес може да го оставите тука" />
                </div>

                <div className="cart-items">
                    <h3>Вашата количка</h3>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна!!!</p>
                    ) : (
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
                    )}
                </div>

                <button type="submit" className="submit-button">Изпрати поръчка</button>
            </form>

            {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
