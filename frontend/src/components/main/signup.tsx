import React, {useState} from 'react';
import {Screen} from './screen';
import {CentralHeader, CentralText} from '../shared/central';
import './styles/signup.css';
import {getTextBoxValue, PasswordMatcher, TextBox} from '../shared/textbox';
import {getSelectValue, Select} from '../shared/select';
import {Button} from '../shared/button';
import {signUp, SignUpData} from '../../server/signup'
import {useNavigate} from 'react-router-dom';

class Match {
    password: string = "";
    confirm: string = "";

    constructor(newPassword: string = "", newConfirm: string = "") {
        this.password = newPassword;
        this.confirm = newConfirm;
    }
}

function RussiaRegionSelector() {
    return (
        <Select id="region" caption="Регион РФ" width="700px">
            <option value="1">Республика Адыгея</option>
            <option value="2">Республика Алтай</option>
            <option value="3">Республика Башкортостан</option>
            <option value="4">Республика Бурятия</option>
            <option value="5">Республика Дагестан</option>
            <option value="6">Республика Ингушетия</option>
            <option value="7">Кабардино-Балкарская Республика</option>
            <option value="8">Республика Калмыкия</option>
            <option value="9">Карачаево-Черкесская Республика</option>
            <option value="10">Республика Карелия</option>
            <option value="11">Республика Коми</option>
            <option value="12">Республика Марий Эл</option>
            <option value="13">Республика Мордовия</option>
            <option value="14">Республика Саха (Якутия)</option>
            <option value="15">Республика Северная Осетия - Алания</option>
            <option value="16">Республика Татарстан</option>
            <option value="17">Республика Тыва</option>
            <option value="18">Удмуртская Республика</option>
            <option value="19">Республика Хакасия</option>
            <option value="20">Чеченская Республика</option>
            <option value="21">Чувашская Республика</option>
            <option value="22">Алтайский край</option>
            <option value="75">Забайкальский край</option>
            <option value="41">Камчатский край</option>
            <option value="23">Краснодарский край</option>
            <option value="24">Красноярский край</option>
            <option value="59">Пермский край</option>
            <option value="25">Приморский край</option>
            <option value="26">Ставропольский край</option>
            <option value="27">Хабаровский край</option>
            <option value="28">Амурская область</option>
            <option value="29">Архангельская область</option>
            <option value="30">Астраханская область</option>
            <option value="31">Белгородская область</option>
            <option value="32">Брянская область</option>
            <option value="33">Владимирская область</option>
            <option value="34">Волгоградская область</option>
            <option value="35">Вологодская область</option>
            <option value="36">Воронежская область</option>
            <option value="37">Ивановская область</option>
            <option value="38">Иркутская область</option>
            <option value="39">Калининградская область</option>
            <option value="40">Калужская область</option>
            <option value="42">Кемеровская область</option>
            <option value="43">Кировская область</option>
            <option value="44">Костромская область</option>
            <option value="45">Курганская область</option>
            <option value="46">Курская область</option>
            <option value="47">Ленинградская область</option>
            <option value="48">Липецкая область</option>
            <option value="49">Магаданская область</option>
            <option value="50">Московская область</option>
            <option value="51">Мурманская область</option>
            <option value="52">Нижегородская область</option>
            <option value="53">Новгородская область</option>
            <option value="54">Новосибирская область</option>
            <option value="55">Омская область</option>
            <option value="56">Оренбургская область</option>
            <option value="57">Орловская область</option>
            <option value="58">Пензенская область</option>
            <option value="60">Псковская область</option>
            <option value="61">Ростовская область</option>
            <option value="62">Рязанская область</option>
            <option value="63">Самарская область</option>
            <option value="64">Саратовская область</option>
            <option value="65">Сахалинская область</option>
            <option value="66">Свердловская область</option>
            <option value="67">Смоленская область</option>
            <option value="68">Тамбовская область</option>
            <option value="69">Тверская область</option>
            <option value="70">Томская область</option>
            <option value="71">Тульская область</option>
            <option value="72" selected>Тюменская область</option>
            <option value="73">Ульяновская область</option>
            <option value="74">Челябинская область</option>
            <option value="76">Ярославская область</option>
            <option value="77">Москва</option>
            <option value="78">Санкт-Петербург</option>
            <option value="79">Еврейская АО</option>
            <option value="80">Ненецкий АО</option>
            <option value="81">Ханты-Мансийский АО</option>
            <option value="82">Чукотский АО</option>
            <option value="83">Ямало-Ненецкий АО</option>
            <option value="84">Севастополь</option>
            <option value="85">Республика Крым</option>
        </Select>);
}

function CountrySelector(changeRussiaSelected: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    return <Select id="country" caption="Страна" width="700px" onChange={(v) => {
        changeRussiaSelected(v == "RU")
    }}>
        <option value="AU">Австралия</option>
        <option value="AT">Австрия</option>
        <option value="AZ">Азербайджан</option>
        <option value="AX">Аландские Острова</option>
        <option value="AL">Албания</option>
        <option value="DZ">Алжир</option>
        <option value="AS">Американское Самоа</option>
        <option value="AI">Ангилья</option>
        <option value="AO">Ангола</option>
        <option value="AD">Андорра</option>
        <option value="AQ">Антарктида</option>
        <option value="AG">Антигуа и Барбуда</option>
        <option value="AR">Аргентина</option>
        <option value="AM">Армения</option>
        <option value="AW">Аруба</option>
        <option value="AF">Афганистан</option>
        <option value="BS">Багамы</option>
        <option value="BD">Бангладеш</option>
        <option value="BB">Барбадос</option>
        <option value="BH">Бахрейн</option>
        <option value="BY">Беларусь</option>
        <option value="BZ">Белиз</option>
        <option value="BE">Бельгия</option>
        <option value="BJ">Бенин</option>
        <option value="CI">Берег Слоновой Кости</option>
        <option value="BM">Бермуды</option>
        <option value="BG">Болгария</option>
        <option value="BO">Боливия</option>
        <option value="BQ">Бонэйр, Синт-Эстатиус и Саба</option>
        <option value="BA">Босния и Герцеговина</option>
        <option value="BW">Ботсвана</option>
        <option value="BR">Бразилия</option>
        <option value="IO">Британская Территория Индийского Океана</option>
        <option value="BN">Бруней-Даруссалам</option>
        <option value="BF">Буркина-Фасо</option>
        <option value="BI">Бурунди</option>
        <option value="BT">Бутан</option>
        <option value="VU">Вануату</option>
        <option value="HU">Венгрия</option>
        <option value="VE">Венесуэла</option>
        <option value="VG">Виргинские Острова, Британские</option>
        <option value="VI">Виргинские Острова, Сша</option>
        <option value="UM">Внешние Малые Острова Сша</option>
        <option value="RE">Воссоединение</option>
        <option value="VN">Вьетнам</option>
        <option value="GA">Габон</option>
        <option value="HT">Гаити</option>
        <option value="GY">Гайана</option>
        <option value="GM">Гамбия</option>
        <option value="GH">Гана</option>
        <option value="GP">Гваделупа</option>
        <option value="GT">Гватемала</option>
        <option value="GN">Гвинея</option>
        <option value="GW">Гвинея-Бисау</option>
        <option value="DE">Германия</option>
        <option value="GG">Гернси</option>
        <option value="GI">Гибралтар</option>
        <option value="HN">Гондурас</option>
        <option value="HK">Гонконг</option>
        <option value="GD">Гренада</option>
        <option value="GL">Гренландия</option>
        <option value="GR">Греция</option>
        <option value="GE">Грузия</option>
        <option value="GU">Гуам</option>
        <option value="DK">Дания</option>
        <option value="JE">Джерси</option>
        <option value="DJ">Джибути</option>
        <option value="DM">Доминика</option>
        <option value="DO">Доминиканская Республика</option>
        <option value="EG">Египет</option>
        <option value="ZM">Замбия</option>
        <option value="EH">Западная Сахара</option>
        <option value="ZW">Зимбабве</option>
        <option value="TG">Идти</option>
        <option value="IL">Израиль</option>
        <option value="IN">Индия</option>
        <option value="ID">Индонезия</option>
        <option value="JO">Иордания</option>
        <option value="IQ">Ирак</option>
        <option value="IR">Иран, Исламская Республика</option>
        <option value="IE">Ирландия</option>
        <option value="IS">Исландия</option>
        <option value="ES">Испания</option>
        <option value="IT">Италия</option>
        <option value="YE">Йемен</option>
        <option value="CV">Кабо-Верде</option>
        <option value="KZ">Казахстан</option>
        <option value="KY">Каймановы Острова</option>
        <option value="KH">Камбоджа</option>
        <option value="CM">Камерун</option>
        <option value="CA">Канада</option>
        <option value="QA">Катар</option>
        <option value="KE">Кения</option>
        <option value="CY">Кипр</option>
        <option value="KI">Кирибати</option>
        <option value="CN">Китай</option>
        <option value="CC">Кокосовые (Килинг) Острова</option>
        <option value="CO">Колумбия</option>
        <option value="KM">Коморские Острова</option>
        <option value="CG">Конго</option>
        <option value="CD">Конго, Демократическая Республика Конго</option>
        <option value="KP">Корея, Народно-Демократическая Республика</option>
        <option value="KR">Корея, Республика</option>
        <option value="XK">Косово</option>
        <option value="CR">Коста-Рика</option>
        <option value="CU">Куба</option>
        <option value="KW">Кувейт</option>
        <option value="KG">Кыргызстан</option>
        <option value="CW">Кюрасао</option>
        <option value="LA">Лаосская Народно-Демократическая Республика</option>
        <option value="LV">Латвия</option>
        <option value="LS">Лесото</option>
        <option value="LR">Либерия</option>
        <option value="LB">Ливан</option>
        <option value="LY">Ливийская Арабская Джамахирия</option>
        <option value="LT">Литва</option>
        <option value="LI">Лихтенштейн</option>
        <option value="LU">Люксембург</option>
        <option value="MU">Маврикий</option>
        <option value="MR">Мавритания</option>
        <option value="MG">Мадагаскар</option>
        <option value="YT">Майотта</option>
        <option value="MO">Макао</option>
        <option value="MK">Македония, Бывшая Югославская Республика</option>
        <option value="MW">Малави</option>
        <option value="MY">Малайзия</option>
        <option value="ML">Мали</option>
        <option value="MV">Мальдивы</option>
        <option value="MT">Мальта</option>
        <option value="MA">Марокко</option>
        <option value="MQ">Мартиника</option>
        <option value="MH">Маршалловы Острова</option>
        <option value="MX">Мексика</option>
        <option value="FM">Микронезия, Федеративные Штаты</option>
        <option value="MZ">Мозамбик</option>
        <option value="MD">Молдова, Республика</option>
        <option value="MC">Монако</option>
        <option value="MN">Монголия</option>
        <option value="MS">Монтсеррат</option>
        <option value="MM">Мьянма</option>
        <option value="NA">Намибия</option>
        <option value="NR">Науру</option>
        <option value="NP">Непал</option>
        <option value="NE">Нигер</option>
        <option value="NG">Нигерия</option>
        <option value="AN">Нидерландские Антильские Острова</option>
        <option value="NL">Нидерланды</option>
        <option value="NI">Никарагуа</option>
        <option value="NU">Ниуэ</option>
        <option value="NZ">Новая Зеландия</option>
        <option value="NC">Новая Каледония</option>
        <option value="NO">Норвегия</option>
        <option value="GB">Объединенное Королевство</option>
        <option value="AE">Объединенные Арабские Эмираты</option>
        <option value="OM">Оман</option>
        <option value="BV">Остров Буве</option>
        <option value="IM">Остров Мэн</option>
        <option value="NF">Остров Норфолк</option>
        <option value="CX">Остров Рождества</option>
        <option value="HM">Остров Херд и Острова Макдональд</option>
        <option value="CK">Острова Кука</option>
        <option value="TC">Острова Теркс и Кайкос</option>
        <option value="PK">Пакистан</option>
        <option value="PW">Палау</option>
        <option value="PS">Палестинская Территория, Оккупированная</option>
        <option value="PA">Панама</option>
        <option value="PG">Папуа - Новая Гвинея</option>
        <option value="PY">Парагвай</option>
        <option value="PE">Перу</option>
        <option value="PN">Питкэрн</option>
        <option value="PL">Польша</option>
        <option value="PT">Португалия</option>
        <option value="PR">Пуэрто-Рико</option>
        <option value="RU" selected>Российская Федерация</option>
        <option value="RW">Руанда</option>
        <option value="RO">Румыния</option>
        <option value="WS">Самоа</option>
        <option value="SM">Сан-Марино</option>
        <option value="ST">Сан-Томе и Принсипи</option>
        <option value="SA">Саудовская Аравия</option>
        <option value="SZ">Свазиленд</option>
        <option value="VC">Святой Винсент и Гренадины</option>
        <option value="SH">Святой Елены</option>
        <option value="VA">Святой Престол (Государство-Город Ватикан)</option>
        <option value="MP">Северные Марианские Острова</option>
        <option value="SC">Сейшельские Острова</option>
        <option value="BL">Сен-Бартелеми</option>
        <option value="MF">Сен-Мартен</option>
        <option value="SX">Сен-Мартен</option>
        <option value="PM">Сен-Пьер и Микелон</option>
        <option value="SN">Сенегал</option>
        <option value="KN">Сент-Китс и Невис</option>
        <option value="LC">Сент-Люсия</option>
        <option value="RS">Сербия</option>
        <option value="CS">Сербия и Черногория</option>
        <option value="SG">Сингапур</option>
        <option value="SY">Сирийская Арабская Республика</option>
        <option value="SK">Словакия</option>
        <option value="SI">Словения</option>
        <option value="US">Соединенные Штаты</option>
        <option value="SB">Соломоновы Острова</option>
        <option value="SO">Сомали</option>
        <option value="SD">Судан</option>
        <option value="SR">Суринам</option>
        <option value="SL">Сьерра-Леоне</option>
        <option value="TJ">Таджикистан</option>
        <option value="TH">Таиланд</option>
        <option value="TW">Тайвань</option>
        <option value="TZ">Танзания, Объединенная Республика</option>
        <option value="TL">Тимор-Лешти</option>
        <option value="TK">Токелау</option>
        <option value="TO">Тонга</option>
        <option value="TT">Тринидад и Тобаго</option>
        <option value="TV">Тувалу</option>
        <option value="TN">Тунис</option>
        <option value="TM">Туркменистан</option>
        <option value="TR">Турция</option>
        <option value="UG">Уганда</option>
        <option value="UZ">Узбекистан</option>
        <option value="UA">Украина</option>
        <option value="WF">Уоллис и Футуна</option>
        <option value="UY">Уругвай</option>
        <option value="FO">Фарерские Острова</option>
        <option value="FJ">Фиджи</option>
        <option value="PH">Филиппины</option>
        <option value="FI">Финляндия</option>
        <option value="FK">Фолклендские (Мальвинские) Острова</option>
        <option value="FR">Франция</option>
        <option value="GF">Французская Гвиана</option>
        <option value="PF">Французская Полинезия</option>
        <option value="HR">Хорватия</option>
        <option value="CF">Центрально-Африканская Республика</option>
        <option value="TD">Чад</option>
        <option value="ME">Черногория</option>
        <option value="CZ">Чехия</option>
        <option value="CL">Чили</option>
        <option value="CH">Швейцария</option>
        <option value="SE">Швеция</option>
        <option value="SJ">Шпицберген и Ян Майен</option>
        <option value="LK">Шри-Ланка</option>
        <option value="EC">Эквадор</option>
        <option value="GQ">Экваториальная Гвинея</option>
        <option value="SV">Эль Сальвадор</option>
        <option value="ER">Эритрея</option>
        <option value="EE">Эстония</option>
        <option value="ET">Эфиопия</option>
        <option value="ZA">Южная Африка</option>
        <option value="GS">Южная Георгия и Южные Сандвичевы Острова</option>
        <option value="TF">Южные Французские Территории</option>
        <option value="SS">Южный Судан</option>
        <option value="JM">Ямайка</option>
        <option value="JP">Япония</option>
    </Select>;
}

export function SignUp() {
    var matcher = new PasswordMatcher();

    var [russiaSelected, changeRussiaSelected] = useState(true);
    var [errorText, changeErrorText] = useState("");
    const navigateTo = useNavigate();

    function processSignUp() {
        var data: SignUpData = new SignUpData();

        data.surname = getTextBoxValue("surname");
        data.name = getTextBoxValue("name");
        data.patronymic = getTextBoxValue("patronymic");
        data.country = getSelectValue("country");
        data.region = russiaSelected ? getSelectValue("region") : getTextBoxValue("region");
        data.currentGrade = getSelectValue("current_grade");
        data.participationGrades = getSelectValue("participation_grades");
        data.telegram = getTextBoxValue("telegram");
        data.email = getTextBoxValue("email");
        data.password = getTextBoxValue("password");
        data.confirm = getTextBoxValue("confirm");
        try {
            signUp(data);
            navigateTo("/login")
        } catch (e) {
            changeErrorText((e as Error).message)
        }
    }

    return (
        <Screen pageTitle="Регистрация на Кубок ЛФИ">
            <div id="signup_text_div">
                <CentralHeader>
                    Регистрация на Кубок ЛФИ
                </CentralHeader>

                <CentralText>
                    Необходимо указать основные данные, чтобы зарегистрироваться на Кубок.
                </CentralText>
            </div>

            <div id="signup_data">
                <div className="signup_group">
                    <i>Личная информация</i>
                    <TextBox id="surname" caption="Фамилия" type="text" width="700px" onEnter={processSignUp}/>
                    <TextBox id="name" caption="Имя" type="text" width="700px" onEnter={processSignUp}/>
                    <TextBox id="patronymic" caption="Отчество" type="text" width="700px" onEnter={processSignUp}/>
                    {CountrySelector(changeRussiaSelected)}
                    {russiaSelected ? <RussiaRegionSelector/> :
                        <TextBox id="region" caption="Регион / провинция / штат" type="text" width="700px"
                                 onEnter={processSignUp}/>}
                </div>

                <div className="signup_group">
                    <i>Информация об участии</i>
                    <div id="signup_grades">
                        <Select
                            id="current_grade"
                            caption="Твой класс в школе"
                            width="300px"
                        >
                            <option value='less'>6 класс и младше</option>
                            <option value='7'>7 класс</option>
                            <option value='8'>8 класс</option>
                            <option value='9' selected>9 класс</option>
                            <option value='10'>10 класс</option>
                            <option value='11'>11 класс</option>
                            <option value='12'>12 класс (не Россия)</option>
                        </Select>
                        <Select id="participation_grades" caption="Классы участия" width="300px">
                            <option value='9' selected>9 класс</option>
                            <option value='10'>10 класс</option>
                            <option value='11'>11 класс</option>
                            <option value='9_10'>9 и 10 класс</option>
                            <option value='10_11'>10 и 11 класс</option>
                            <option value='9_10_11'>9, 10 и 11 класс</option>
                        </Select>
                    </div>

                    <TextBox id="telegram" caption="Телеграм (если есть)" type="text" width="700px"
                             onEnter={processSignUp}/>
                    <TextBox id="email" caption="Электронная почта (лучше Gmail)" type="email" width="700px"
                             onEnter={processSignUp}/>
                    <TextBox id="password" caption="Пароль" type="password" width="700px"
                             onChange={matcher.onPasswordChange} onEnter={processSignUp}/>
                    <TextBox id="confirm" caption="Подтвердите пароль" type="password" width="700px"
                             onChange={matcher.onConfirmChange} passwordMatchState={matcher.isMatched()}
                             onEnter={processSignUp}/>
                </div>
            </div>

            <label id="signup_error_text">{errorText}</label>

            <Button caption="Зарегистрироваться!" onClick={processSignUp} width="600px" height="60px"/>
        </Screen>
    );
}


