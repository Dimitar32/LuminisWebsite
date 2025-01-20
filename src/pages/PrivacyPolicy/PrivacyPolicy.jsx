import React from 'react';
import styles from '../PrivacyPolicy/PrivacyPolicy.module.css'; // Импорт на CSS стиловете

const Privacy = () => {
    return(
        <section className={styles.privacySection}>
            <h2>Политика за поверителност</h2>
            <div className={styles.privacyInfo}>
                <h3>Въведение</h3>
                <p>
                    Добре дошли в Luminis. Ние се ангажираме да защитаваме личната ви информация и да спазваме поверителността ви. Тази Политика за поверителност обяснява как събираме, използваме и разкриваме информация, която събираме за потребителите на нашия уебсайт и други услуги, които предоставяме.
                </p>

                <h3>1. Каква информация събираме</h3>
                <p>
                    Събираме лична информация, която вие доброволно ни предоставяте, включително, но не само:

                    Име
                    Имейл адрес
                    Адрес за доставка
                    Платежна информация (само за целите на транзакциите)
                </p>

                <h3>2. Как използваме вашата информация</h3>
                <p>
                    Вашата информация може да бъде използвана за:
                </p>
                <ul>
                    <li>Обработване и изпращане на поръчки</li>
                    <li>Комуникация с вас относно вашите поръчки или промоции</li>
                    <li>Подобряване на нашите продукти и услуги</li>
                    <li>Анализ на използването на нашия уебсайт с цел подобряване на потребителското изживяване</li>
                </ul>

                <h3>3. Споделяне на информация</h3>
                <p>
                    Ние не споделяме вашата лична информация с трети лица, освен в случаите, когато това е необходимо за обработката на поръчки (например с куриерски компании) или когато е изисквано от закона.
                </p>

                <h3>4. Сигурност на информацията</h3>
                <p>
                    Ние предприемаме мерки за защита на вашата информация от неоторизиран достъп, разкриване или унищожаване. Използваме подходящи технически и организационни мерки за сигурност.
                </p>

                <h3>5. Вашите права</h3>
                <p>
                    Имате право да:
                </p>
                <ul>
                    <li>Достъпвате личната си информация, която съхраняваме</li>
                    <li>Искате корекция на неточности във вашата информация</li>
                    <li>Изтриете личната си информация, ако вече не е необходима за целите, за които е събрана</li>
                </ul>

                <h3>6. Промени в Политиката за поверителност</h3>
                <p>
                    Можем да актуализираме тази Политика за поверителност, за да отразим промените в нашите практики или поради други оперативни, законови или регулаторни причини. Препоръчваме редовно да проверявате тази страница за актуализации.
                </p>

                <h3>Контакт с нас</h3>
                <p>
                    Ако имате въпроси относно тази Политика за поверителност или начина, по който обработваме вашата информация, моля свържете се с нас на luminis@outlook.com.
                </p>
            </div>
        </section>
    );
};

export default Privacy;
