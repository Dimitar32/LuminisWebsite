import { useState } from 'react';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './ProductDetails.css';
import Saturn from '../Products/luminis saturn.png';
import Heart from '../Products/luminis heart.png';
import MilkyWay from '../Products/luminis milky way.png';
import Earth from '../Products/luminis earth.png';
import Perla11 from '../Products/Perla11.png';
import Perla12 from '../Products/Perla12.png';
import Perla13 from '../Products/Perla13.png';
import { CartContext } from '../contexts/CartContext'; 

const products = [
    { id: 9, name: 'Luminis Saturn', oldPrice: '35.99 лв', price: '29.99 лв', imageUrl: [Saturn], description: `
                        Luminis Saturn е изящна светеща кристална сфера с диаметър 6 см, вдъхновена от мистичната красота на Сатурн. 
                        Изработена от висококачествен кристал, тя излъчва меко сияние, създавайки завладяваща атмосфера във всяко пространство. 
                        Със своя елегантен дизайн и ефектен блясък, тази сфера е перфектен избор за декорация 
                        у дома, в офиса или като специален подарък за любителите на космоса и изисканата естетика.✨` },
    { id: 10, name: 'Luminis Milky Way', oldPrice: '35.99 лв', price: '29.99 лв', imageUrl: [MilkyWay], description: `
                        Luminis Milky Way е уникална светеща кристална сфера с диаметър 6 см, вдъхновена от магията на Млечния път. 
                        Създадена да отразява светлината по впечатляващ начин, тя създава усещане за безкрайност и спокойствие.
                        Подходяща както за интериорна декорация, така и за медитация или енергийно балансиране, 
                        тази сфера е идеален подарък за всички, които обичат мистерията на космоса.✨` },
    { id: 11, name: 'Luminis Earth', oldPrice: '35.99 лв', price: '29.99 лв', imageUrl: [Earth], description: `
                        Luminis Earth е кристална сфера с нежно сияние и естествена красота, вдъхновена от нашата планета. 
                        С диаметър 6 см, тя комбинира стил и хармония, като създава балансирана и топла атмосфера в дома или офиса. 
                        Нейният мек блясък придава усещане за спокойствие и връзка с природата, правейки я перфектен подарък за любителите на естествените елементи и естетиката.✨` },
    { id: 12, name: 'Luminis Heart', oldPrice: '35.99 лв', price: '29.99 лв', imageUrl: [Heart], description: `
                        Luminis Heart е изящна светеща кристална сфера с диаметър 6 см, създадена да излъчва топлина и емоция. 
                        Вдъхновена от енергията на любовта и хармонията, тя нежно отразява светлината, създавайки уютна и романтична атмосфера. 
                        Перфектна като декорация за дома, като символ на емоционална връзка или като специален подарък за любим човек. 
                        Добавете нотка на нежност и сияние към пространството си с Luminis Heart – светлината, която говори със сърцето! ❤️✨` },
    { id: 13, name: 'Колие с перла в мида', oldPrice: '25.99 лв', price: '17.99 лв', imageUrl: [Perla11, Perla12, Perla13], description: `
                        Колие с перла в мида – Елегантно и изискано бижу, което съчетава естествена красота и символика. 
                        Всяка мида съдържа автентична перла, която разкрива своя уникален цвят при отваряне. 
                        Идеален подарък за специален човек, символизиращ чистота, любов и късмет. 
                        Изработено с фин синджир, допълващ нежния и стилен дизайн.🦪✨` }
];

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1); 
    
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [cantAddZero, cantAddZeroToCart] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    
    const [cityFilter, setCityFilter] = useState('');

    const { offices } = useEcontOffices();

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    const handleOrderClick = () => {
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        order: product.name,
        quantity: 1,
        additionalInfo: '',
        option: product.option
    });

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

    const { submitOrder } = useSaveOrder();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItems = [{ id: product.id, name: product.name, quantity: formData.quantity, option: product.option, price: product.price }];
        await submitOrder(formData, orderItems, cityFilter);
        handleCloseModal();
        handleSubmitFastOrder(product);
    };

    const { addToCart } = useContext(CartContext); 

    const handleSubmitFastOrder = () =>{
        setIsOrdered(true);

        setTimeout(() => {
            setIsOrdered(false);
            navigate("/"); 
        }, 5000);
    }
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // if (value > 0) {
            setQuantity(value); // Актуализиране на бройката само ако е по-голямо от 0
        // }
    };

    const handleAddToCart = (product, quantity, value) => {
        if (product.id === 7 && !value) {
            alert('Моля, изберете опция преди да добавите този продукт в количката.');
            return;
        }

        addToCart(product, quantity, value); 

        if (quantity > 0) {
            setIsAdded(true);
        } else if (quantity === 0) {
            cantAddZeroToCart(true);
        }

        setTimeout(() => {
            cantAddZeroToCart(false);
            setIsAdded(false);
        }, 1500);
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                loop
                className="swiper-container" 
            >
                {product.imageUrl.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="product-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="product-details">
            <h2>{product.name}</h2>
                <p className="old-price">Стара Цена: {product.oldPrice}</p>
                <p className="product-price">Цена: {product.price}</p>

                <label className='product-quantity-input-label'>
                    <input className="product-quantity-input"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        style={{ width: '50px', marginLeft: '0px' }}
                    />
                </label>
                
                {product.id === 7 && (
                    <label className="product-options-dropdown-label">
                        <select 
                            className="product-options-dropdown" 
                            value={formData.option || ''} 
                            onChange={(e) => 
                                setFormData({ ...formData, option: e.target.value })
                            }
                            required
                        >
                            <option value="" disabled>Изберете опция</option>
                            <option value="Ариел и Ерик">Ариел и Ерик</option>
                            <option value="Шрек и Фиона">Шрек и Фиона</option>
                            <option value="Нала и Симба">Нала и Симба</option>
                            <option value="Бел и Звяр">Бел и Звяр</option>
                            <option value="Рапунцел и Флин">Рапунцел и Флин</option>
                            <option value="Бъгс и Лола">Бъгс и Лола</option>
                        </select>
                    </label>
                )}

                <div className="product-buttons">
                    <button className="order-button" onClick={() => handleAddToCart(product, quantity, formData.option)}>Добави в количката</button>
                    <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button>
                </div>

                <div className="product-description">
                    <div onClick={toggleDescription} className="description-toggle">
                        Описание на продукта {isDescriptionOpen ? "▲" : "▼"}
                    </div>
                    {isDescriptionOpen && <p className="description-text">{product.description}</p>}
                </div>

            </div>

            {isAdded && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Успешно добавено в количката!
                        </p>
                    </div>
                </div>
            )}

            {cantAddZero && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Не може да добавяте 0 продукта в количката!
                        </p>
                    </div>
                </div>
            )}

             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}> &times;{/*times;*/}</span>
                        <form  onSubmit={handleSubmit} className="order-form">
                        <div className="form-group">
                                <label>
                                    Име:
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                </label>
                                <label>
                                    Фамилия:
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                </label>
                                <label>
                                    Телефон:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Брой {product.name} :
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </label>
                                <label>Търси офис по град
                                    <input 
                                        type="text" 
                                        value={cityFilter} 
                                        onChange={handleCityFilterChange} 
                                        placeholder="Например: София" 
                                    />
                                </label>
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
                            <button type="submit">Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
