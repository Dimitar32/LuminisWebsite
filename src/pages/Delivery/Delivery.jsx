import React from 'react';
import '../Delivery/Delivery.css'; // Импорт на CSS стиловете

const Delivery = () => {
    return(
        <section className='delivery-section'>
            <h2>Правила за доставка</h2>
            <div class="delivery-info">
                <p>Ние изпращаме всички поръчки чрез куриерска фирма Еконт. Имайте предвид следната информация за доставка:</p>
                <ul>
                    <li><strong>Срок на доставка:</strong> Доставката отнема от 1 до 5 работни дни, в зависимост от местоположението на получателя и натовареността на куриерската фирма.</li>
                    <li><strong>Такси за доставка:</strong> Стойността на доставката се изчислява според тарифите на Еконт и се заплаща от клиента при получаване на пратката. При поръчка над 70лв доставката е безплатна.</li>
                    <li><strong>Работни дни:</strong> Моля, имайте предвид, че куриерските услуги не работят през официални празници и почивни дни, което може да удължи срока за доставка.</li>
                </ul>
                <p>Ако имате допълнителни въпроси, може да се свържете с нас на keycouple@outlook.com</p>
            </div>
        </section>
    );
};

export default Delivery;
