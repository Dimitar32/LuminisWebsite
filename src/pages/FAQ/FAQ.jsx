import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './FAQ.css';

const questionsAnswers = [
    { question: 'Как мога да поръчам?', answer: 'Можете да поръчате директно през уебсайта ни или по телефона.' },
    { question: 'За колко време пристигат?', answer: 'Вашата поръчка ще бъде обработена между 1 и 3 работни дни.' },
    { question: 'От кого се поема доставката?', answer: (
        <>
            Доставката се поема от клиента, при поръчки над 70лв е безплатна. Повече подробности може да намерите
            <Link to="/delivery" className='link-faq'> тук</Link>.
        </>
    )},
    { question: 'Кога се начислява доставката?', answer: (
        <>
            Доставката се начислява след като се обработи поръчката. Повече подробности може да намерите
            <Link to="/delivery" className='link-faq'> тук</Link>.
        </>
    )},
    { question: 'Има ли преглед и тест?', answer: 'Да, има преглед и тест в офиса на куриерската фирма.' },
    { question: 'Какви са методите за плащане?', answer: 'Приемаме различни методи за плащане, включително по Revolut, банков превод, наложен платеж при вземане от куриер. За повече информация ни пишете на лично в Instagram - @the.luminis или на телефон +359 879330389.' },
    { question: 'Мога ли да сменя адреса за доставка след като съм направил поръчка?', answer: 'Ако поръчката ви все още не е изпратена, можете да се свържете с нас на телефон +359 879330389, и ние ще го актуализираме.' }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section id="faq" className="faq-section">
            <h2>Често задавани въпроси</h2>
            {questionsAnswers.map((qa, index) => (
                <div key={index} className="faq-item">
                    <button onClick={() => toggleAnswer(index)} className="faq-question">{qa.question}</button>
                    <p className={activeIndex === index ? "faq-answer active" : "faq-answer"}>{qa.answer}</p>
                </div>
            ))}
        </section>
    );
};

export default FAQ;