(function(){
'use strict';
var CARS=[
 {id:'g63',make:'Mercedes-Benz',model:'G 63',year:2024,type:'suv',image:'assets/g63.webp',price:350,longPrice:320,deposit:700,power:585,seats:5,engine:'4.0 V8',acc:'4.5'},
 {id:'porsche',make:'Porsche',model:'911 Carrera',year:2024,type:'sport',image:'assets/porsche.webp',price:300,longPrice:270,deposit:600,power:385,seats:4,engine:'3.0',acc:'4.2'}
];

var T={
ru:{
 nav_fleet:'Автомобили',nav_services:'Сервис',nav_faq:'Вопросы',nav_contact:'Контакты',
 hero_1:'Грузия.',hero_2:'В вашем ритме.',hero_p:'От городских улиц до горных серпантинов. Выберите автомобиль для своего путешествия.',hero_cta:'Посмотреть автопарк',
 perk_ins:'Страховка включена',perk_km:'150 км в сутки',perk_del:'Доставка по запросу',perk_long:'Выгоднее от 3 суток',
 fleet_h:'2. Автопарк',fleet_p:'Два характера: внедорожник для гор и купе для асфальта.',t_all:'Все автомобили',t_suv:'Внедорожник',t_sport:'Спорткупе',
 svc_h:'Сервис в вашем ритме',svc_p:'Вы планируете маршрут, остальное мы согласуем при бронировании.',
 s1_h:'Автомобиль к вашему приезду',s1_p:'Укажите удобное место получения: аэропорт, отель или город. Детали встречи согласуем при бронировании.',
 s2_h:'С вашим водителем',s2_p:'Для деловых встреч и поездок, в которых хочется просто смотреть в окно.',
 s3_h:'Долгосрочная аренда',s3_p:'Планируете несколько недель в Грузии? Подберём условия для длительной аренды.',
 faq_h:'Частые вопросы',
 foot_tag:'Грузия. В вашем ритме.',foot_nav:'Навигация',foot_contact:'Связаться',foot_city:'Тбилиси, Грузия',
 contact_soon:'Контакты компании появятся здесь после согласования',
 perDay:'сутки',longRate:'{p} от 3 суток',hp:'л.с.',auto:'Автомат',seats:'Мест',
 back:'Вернуться к автопарку',save:'Сохранить',saved_btn:'Сохранено',saved:'Добавлено в избранное',removed:'Убрано из избранного',fav_add:'В избранное',fav_rm:'Убрать из избранного',
 setup:'Настройка аренды',km_pack:'Пакет километража',km_val:'150 км',km_note:'Условия по дополнительным километрам согласуются при бронировании',
 deposit:'Залог',dep_note:'Полностью возвращается при возврате автомобиля',price_day:'Цена за сутки',all_in:'Страховка включена в стоимость',
 book_car:'Забронировать автомобиль',book_short:'Забронировать',
 tech:'Характеристики',year:'Год выпуска',engine:'Двигатель',power:'Мощность',acc:'0–100 км/ч',accU:'с',gearbox:'Коробка передач',
 descr:'Описание',included:'Включено в аренду',incl1:'Страховка',incl2:'150 км в сутки',incl3:'Доставка по запросу',incl4:'Согласование деталей при бронировании',others:'Другие автомобили',
 desc_g63:'Выразительный силуэт, высокий обзор и уверенное ощущение дороги. G 63 подходит для путешествия, в котором городские планы сменяются горными видами.',
 desc_porsche:'Низкая посадка, точное управление и узнаваемые линии 911. Для красивых асфальтовых маршрутов и удовольствия от каждого поворота.',
 b_title:'Бронирование',pickup:'Получение',ret:'Возврат',time_p:'Время получения',time_r:'Время возврата',place:'Место получения',
 pl_office:'Офис в Тбилиси',pl_airport:'Аэропорт',pl_hotel:'Отель или другой адрес',name:'Имя',phone:'Телефон',
 q_rate:'Тариф в сутки',q_days:'Срок',q_sum:'Аренда',q_dep:'Залог при получении',q_total:'Итого при получении',
 daysN:'{n} сут.',q_note:'Залог возвращается при возврате автомобиля. Итоговые условия подтверждает компания.',
 submit:'Отправить заявку',
 e_dates:'Укажите даты получения и возврата',e_order:'Дата возврата должна быть позже даты получения',e_max:'Максимальный срок аренды — 30 суток',e_past:'Дата получения не может быть в прошлом',e_name:'Укажите имя',e_phone:'Укажите телефон',
 ok_h:'Заявка принята',ok_p:'Спасибо! Менеджер свяжется с вами, чтобы подтвердить даты и место получения.',ok_note:'Форма бронирования пока в разработке: данные не отправляются и нигде не сохраняются.',ok_back:'К автомобилям',
 faq:[
  ['Как выбрать даты и узнать стоимость?','Откройте автомобиль и нажмите «Забронировать». Выберите даты и время: расчёт появится рядом с формой.'],
  ['Можно получить машину в аэропорту?','В форме предусмотрен выбор аэропорта, города или другого адреса. Доступность и стоимость доставки согласуются с компанией.'],
  ['Нужен ли залог?','Да. Залог указан отдельно в карточке автомобиля и в расчёте аренды: 700 $ для G 63 и 600 $ для Porsche 911. Окончательные условия подтверждает компания.'],
  ['Сколько километров включено?','В стоимость входит 150 км в сутки. Условия по дополнительным километрам согласуются при бронировании.'],
  ['Какие документы понадобятся?','Список документов, требования к возрасту и стажу водителя будут указаны в условиях аренды после согласования с владельцем.']
 ]
},
en:{
 nav_fleet:'Fleet',nav_services:'Service',nav_faq:'FAQ',nav_contact:'Contact',
 hero_1:'Georgia.',hero_2:'At your pace.',hero_p:'From city streets to mountain switchbacks. Pick the car for your journey.',hero_cta:'View the fleet',
 perk_ins:'Insurance included',perk_km:'150 km per day',perk_del:'Delivery on request',perk_long:'Better rate from 3 days',
 fleet_h:'2. The fleet',fleet_p:'Two characters: an SUV for the mountains and a coupe for the tarmac.',t_all:'All cars',t_suv:'SUV',t_sport:'Sports coupe',
 svc_h:'Service at your pace',svc_p:'You plan the route, we arrange the rest when you book.',
 s1_h:'A car ready for your arrival',s1_p:'Choose an airport, hotel or city pick-up. We will arrange the meeting details with you.',
 s2_h:'With your own driver',s2_p:'For business meetings and trips where you just want to look out of the window.',
 s3_h:'Long-term rental',s3_p:'Spending several weeks in Georgia? We will put together terms for a longer rental.',
 faq_h:'Frequently asked questions',
 foot_tag:'Georgia. At your pace.',foot_nav:'Navigation',foot_contact:'Contact us',foot_city:'Tbilisi, Georgia',
 contact_soon:'Company contacts will appear here once confirmed',
 perDay:'day',longRate:'{p} from 3 days',hp:'hp',auto:'Automatic',seats:'Seats',
 back:'Back to the fleet',save:'Save',saved_btn:'Saved',saved:'Added to favorites',removed:'Removed from favorites',fav_add:'Add to favorites',fav_rm:'Remove from favorites',
 setup:'Rental setup',km_pack:'Mileage package',km_val:'150 km',km_note:'Terms for extra kilometres are agreed when you book',
 deposit:'Deposit',dep_note:'Fully refunded when you return the car',price_day:'Price per day',all_in:'Insurance is included in the price',
 book_car:'Book this car',book_short:'Book',
 tech:'Specifications',year:'Year',engine:'Engine',power:'Power',acc:'0–100 km/h',accU:'s',gearbox:'Transmission',
 descr:'Description',included:'Included in the rental',incl1:'Insurance',incl2:'150 km per day',incl3:'Delivery on request',incl4:'Details arranged when you book',others:'Other cars',
 desc_g63:'An unmistakable silhouette, an elevated view and a confident feel. The G 63 takes you from city plans to mountain scenery.',
 desc_porsche:'A low driving position, precise handling and the timeless lines of a 911. Made for scenic paved roads and the joy of every bend.',
 b_title:'Booking',pickup:'Pick-up',ret:'Return',time_p:'Pick-up time',time_r:'Return time',place:'Pick-up place',
 pl_office:'Tbilisi office',pl_airport:'Airport',pl_hotel:'Hotel or another address',name:'Name',phone:'Phone',
 q_rate:'Daily rate',q_days:'Duration',q_sum:'Rental',q_dep:'Deposit at pick-up',q_total:'Total at pick-up',
 daysN:'{n} days',q_note:'The deposit is returned when you return the car. Final terms are confirmed by the company.',
 submit:'Send request',
 e_dates:'Enter pick-up and return dates',e_order:'The return date must be after the pick-up date',e_max:'Maximum rental period is 30 days',e_past:'The pick-up date cannot be in the past',e_name:'Enter your name',e_phone:'Enter your phone number',
 ok_h:'Request received',ok_p:'Thank you! A manager will contact you to confirm the dates and pick-up place.',ok_note:'The booking form is still in development: nothing is sent or stored.',ok_back:'Back to cars',
 faq:[
  ['How do I choose dates and see the price?','Open a car and select “Book”. Choose dates and times: the total appears beside the form.'],
  ['Can I pick up at the airport?','The form offers airport, city or another address. Delivery availability and pricing are confirmed with the company.'],
  ['Is a deposit required?','Yes. The deposit is listed separately in the car details and in the estimate: $700 for the G 63 and $600 for the Porsche 911. Final terms are confirmed by the company.'],
  ['How many kilometres are included?','150 km per day are included. Terms for extra kilometres are agreed when you book.'],
  ['Which documents will I need?','The required documents, driver age and experience will be set out in the rental terms once approved by the owner.']
 ]
},
ka:{
 nav_fleet:'ავტომობილები',nav_services:'სერვისი',nav_faq:'კითხვები',nav_contact:'კონტაქტი',
 hero_1:'საქართველო.',hero_2:'თქვენს რიტმში.',hero_p:'ქალაქის ქუჩებიდან მთის სერპანტინებამდე. აირჩიეთ ავტომობილი თქვენი მოგზაურობისთვის.',hero_cta:'ავტოპარკის ნახვა',
 perk_ins:'დაზღვევა შედის',perk_km:'150 კმ დღეში',perk_del:'მოყვანა მოთხოვნით',perk_long:'3 დღიდან უფრო ხელსაყრელია',
 fleet_h:'2. ავტოპარკი',fleet_p:'ორი ხასიათი: ჯიპი მთისთვის და კუპე ასფალტისთვის.',t_all:'ყველა ავტომობილი',t_suv:'ჯიპი',t_sport:'სპორტკუპე',
 svc_h:'სერვისი თქვენს რიტმში',svc_p:'თქვენ გეგმავთ მარშრუტს, დანარჩენს დაჯავშნისას შევათანხმებთ.',
 s1_h:'მანქანა თქვენი ჩამოსვლისთვის',s1_p:'აირჩიეთ მიღების ადგილი: აეროპორტი, სასტუმრო ან ქალაქი. შეხვედრის დეტალებს დაჯავშნისას შევათანხმებთ.',
 s2_h:'თქვენი მძღოლით',s2_p:'საქმიანი შეხვედრებისა და მოგზაურობებისთვის, როცა უბრალოდ ფანჯრიდან ყურება გსურთ.',
 s3_h:'გრძელვადიანი ქირაობა',s3_p:'საქართველოში რამდენიმე კვირით ჩამოდიხართ? გრძელვადიანი ქირაობის პირობებს შეგირჩევთ.',
 faq_h:'ხშირი კითხვები',
 foot_tag:'საქართველო. თქვენს რიტმში.',foot_nav:'ნავიგაცია',foot_contact:'კონტაქტი',foot_city:'თბილისი, საქართველო',
 contact_soon:'კომპანიის კონტაქტები აქ გამოჩნდება დადასტურების შემდეგ',
 perDay:'დღე',longRate:'{p} 3 დღიდან',hp:'ცხ.ძ.',auto:'ავტომატიკა',seats:'ადგილი',
 back:'ავტოპარკში დაბრუნება',save:'შენახვა',saved_btn:'შენახულია',saved:'რჩეულებში დაემატა',removed:'რჩეულებიდან ამოიღო',fav_add:'რჩეულებში დამატება',fav_rm:'რჩეულებიდან ამოღება',
 setup:'ქირაობის პარამეტრები',km_pack:'კილომეტრაჟის პაკეტი',km_val:'150 კმ',km_note:'დამატებითი კილომეტრების პირობები დაჯავშნისას შეთანხმდება',
 deposit:'დეპოზიტი',dep_note:'მანქანის დაბრუნებისას სრულად ბრუნდება',price_day:'ფასი დღეში',all_in:'დაზღვევა ფასში შედის',
 book_car:'ავტომობილის დაჯავშნა',book_short:'დაჯავშნა',
 tech:'მახასიათებლები',year:'გამოშვების წელი',engine:'ძრავა',power:'სიმძლავრე',acc:'0–100 კმ/სთ',accU:'წმ',gearbox:'გადაცემათა კოლოფი',
 descr:'აღწერა',included:'ქირაში შედის',incl1:'დაზღვევა',incl2:'150 კმ დღეში',incl3:'მოყვანა მოთხოვნით',incl4:'დეტალების შეთანხმება დაჯავშნისას',others:'სხვა ავტომობილები',
 desc_g63:'გამორჩეული სილუეტი, მაღალი ხედვა და გზაზე თავდაჯერებულობა. G 63 ქალაქის გეგმებიდან მთის პეიზაჟებამდე მიგიყვანთ.',
 desc_porsche:'დაბალი დასაჯდომი, ზუსტი მართვა და 911-ის ნაცნობი ხაზები. ლამაზი ასფალტირებული მარშრუტებისა და ყოველი მოსახვევით სიამოვნებისთვის.',
 b_title:'დაჯავშნა',pickup:'მიღება',ret:'დაბრუნება',time_p:'მიღების დრო',time_r:'დაბრუნების დრო',place:'მიღების ადგილი',
 pl_office:'ოფისი თბილისში',pl_airport:'აეროპორტი',pl_hotel:'სასტუმრო ან სხვა მისამართი',name:'სახელი',phone:'ტელეფონი',
 q_rate:'დღიური ტარიფი',q_days:'ვადა',q_sum:'ქირა',q_dep:'დეპოზიტი მიღებისას',q_total:'სულ მიღებისას',
 daysN:'{n} დღე',q_note:'დეპოზიტი ბრუნდება მანქანის დაბრუნებისას. საბოლოო პირობებს კომპანია ადასტურებს.',
 submit:'განაცხადის გაგზავნა',
 e_dates:'მიუთითეთ მიღებისა და დაბრუნების თარიღები',e_order:'დაბრუნების თარიღი მიღების თარიღის შემდეგ უნდა იყოს',e_max:'ქირაობის მაქსიმალური ვადაა 30 დღე',e_past:'მიღების თარიღი წარსულში ვერ იქნება',e_name:'მიუთითეთ სახელი',e_phone:'მიუთითეთ ტელეფონი',
 ok_h:'განაცხადი მიღებულია',ok_p:'გმადლობთ! მენეჯერი დაგიკავშირდებათ თარიღებისა და მიღების ადგილის დასადასტურებლად.',ok_note:'დაჯავშნის ფორმა ჯერ დამუშავების პროცესშია: მონაცემები არსად იგზავნება და არ ინახება.',ok_back:'ავტომობილებთან დაბრუნება',
 faq:[
  ['როგორ ავირჩიო თარიღები და ვნახო ფასი?','გახსენით ავტომობილი და აირჩიეთ „დაჯავშნა“. მიუთითეთ თარიღები და დრო: ფასი ფორმის გვერდით გამოჩნდება.'],
  ['შემიძლია მანქანა აეროპორტში მივიღო?','ფორმაში შეგიძლიათ აირჩიოთ აეროპორტი, ქალაქი ან სხვა მისამართი. მოყვანის შესაძლებლობა და ფასი კომპანიასთან შეთანხმდება.'],
  ['საჭიროა დეპოზიტი?','დიახ. დეპოზიტი ცალკე ჩანს ავტომობილის გვერდსა და გაანგარიშებაში: 700 $ G 63-ისთვის და 600 $ Porsche 911-ისთვის. საბოლოო პირობებს კომპანია ადასტურებს.'],
  ['რამდენი კილომეტრი შედის ფასში?','ფასში შედის 150 კმ დღეში. დამატებითი კილომეტრების პირობები დაჯავშნისას შეთანხმდება.'],
  ['რომელი დოკუმენტები დამჭირდება?','დოკუმენტების სია, ასაკისა და გამოცდილების მოთხოვნები მფლობელთან შეთანხმებულ ქირაობის პირობებში მიეთითება.']
 ]
},
he:{
 nav_fleet:'הרכבים',nav_services:'שירות',nav_faq:'שאלות',nav_contact:'צור קשר',
 hero_1:'גאורגיה.',hero_2:'בקצב שלכם.',hero_p:'מרחובות העיר ועד סרפנטינות ההרים. בחרו את הרכב למסע שלכם.',hero_cta:'לצפייה בצי הרכבים',
 perk_ins:'ביטוח כלול',perk_km:'150 ק״מ ביום',perk_del:'מסירה בתיאום',perk_long:'מחיר משתלם מ־3 ימים',
 fleet_h:'2. צי הרכבים',fleet_p:'שני אופי נהיגה: רכב שטח להרים וקופה לאספלט.',t_all:'כל הרכבים',t_suv:'רכב שטח',t_sport:'קופה ספורטיבית',
 svc_h:'שירות בקצב שלכם',svc_p:'אתם מתכננים את המסלול, ואת השאר נתאם בעת ההזמנה.',
 s1_h:'רכב מוכן לבואכם',s1_p:'בחרו איסוף בשדה התעופה, במלון או בעיר. נתאם איתכם את פרטי המפגש.',
 s2_h:'עם נהג משלכם',s2_p:'לפגישות עסקיות ולנסיעות שבהן רוצים פשוט להסתכל מהחלון.',
 s3_h:'השכרה ארוכת טווח',s3_p:'מתכננים כמה שבועות בגאורגיה? נתאים תנאים להשכרה ממושכת.',
 faq_h:'שאלות נפוצות',
 foot_tag:'גאורגיה. בקצב שלכם.',foot_nav:'ניווט',foot_contact:'יצירת קשר',foot_city:'טביליסי, גאורגיה',
 contact_soon:'פרטי הקשר של החברה יופיעו כאן לאחר אישור',
 perDay:'יום',longRate:'{p} מ־3 ימים',hp:'כ״ס',auto:'אוטומט',seats:'מושבים',
 back:'חזרה לצי הרכבים',save:'שמירה',saved_btn:'נשמר',saved:'נוסף למועדפים',removed:'הוסר מהמועדפים',fav_add:'הוספה למועדפים',fav_rm:'הסרה מהמועדפים',
 setup:'הגדרות ההשכרה',km_pack:'חבילת קילומטראז׳',km_val:'150 ק״מ',km_note:'תנאי הקילומטרים הנוספים יתואמו בעת ההזמנה',
 deposit:'פיקדון',dep_note:'מוחזר במלואו עם החזרת הרכב',price_day:'מחיר ליום',all_in:'הביטוח כלול במחיר',
 book_car:'הזמנת הרכב',book_short:'הזמנה',
 tech:'מפרט',year:'שנת ייצור',engine:'מנוע',power:'הספק',acc:'0–100 קמ״ש',accU:'שנ׳',gearbox:'תיבת הילוכים',
 descr:'תיאור',included:'כלול בהשכרה',incl1:'ביטוח',incl2:'150 ק״מ ביום',incl3:'מסירה בתיאום',incl4:'תיאום פרטים בעת ההזמנה',others:'רכבים נוספים',
 desc_g63:'צללית ייחודית, שדה ראייה גבוה ותחושת ביטחון על הכביש. ה־G 63 מתאים למסע שמחבר בין העיר לנופי ההרים.',
 desc_porsche:'תנוחת נהיגה נמוכה, היגוי מדויק והקווים המזוהים של ה־911. לכבישים סלולים יפים ולהנאה מכל פנייה.',
 b_title:'הזמנה',pickup:'איסוף',ret:'החזרה',time_p:'שעת איסוף',time_r:'שעת החזרה',place:'מקום האיסוף',
 pl_office:'משרד בטביליסי',pl_airport:'שדה התעופה',pl_hotel:'מלון או כתובת אחרת',name:'שם',phone:'טלפון',
 q_rate:'תעריף ליום',q_days:'משך',q_sum:'השכרה',q_dep:'פיקדון באיסוף',q_total:'סה״כ באיסוף',
 daysN:'{n} ימים',q_note:'הפיקדון מוחזר עם החזרת הרכב. התנאים הסופיים מאושרים על ידי החברה.',
 submit:'שליחת בקשה',
 e_dates:'יש לבחור תאריכי איסוף והחזרה',e_order:'תאריך ההחזרה חייב להיות אחרי תאריך האיסוף',e_max:'משך ההשכרה המרבי הוא 30 ימים',e_past:'תאריך האיסוף לא יכול להיות בעבר',e_name:'יש להזין שם',e_phone:'יש להזין מספר טלפון',
 ok_h:'הבקשה התקבלה',ok_p:'תודה! נציג ייצור איתכם קשר לאישור התאריכים ומקום האיסוף.',ok_note:'טופס ההזמנה עדיין בפיתוח: שום מידע לא נשלח ולא נשמר.',ok_back:'חזרה לרכבים',
 faq:[
  ['איך בוחרים תאריכים ורואים מחיר?','פתחו רכב ולחצו על «הזמנה». בחרו תאריכים ושעות והמחיר יופיע לצד הטופס.'],
  ['אפשר לקבל את הרכב בשדה התעופה?','בטופס אפשר לבחור שדה תעופה, עיר או כתובת אחרת. זמינות ועלות המסירה יתואמו עם החברה.'],
  ['האם נדרש פיקדון?','כן. הפיקדון מופיע בנפרד בפרטי הרכב ובחישוב: 700 $ ל־G 63 ו־600 $ ל־Porsche 911. התנאים הסופיים מאושרים על ידי החברה.'],
  ['כמה קילומטרים כלולים?','150 ק״מ ליום כלולים במחיר. תנאי הקילומטרים הנוספים יתואמו בעת ההזמנה.'],
  ['אילו מסמכים נדרשים?','המסמכים הנדרשים, גיל הנהג והוותק יפורטו בתנאי ההשכרה לאחר אישור הבעלים.']
 ]
}};

Object.assign(T.ru,{
 login:'Войти',
 ad_title:'Администрирование',ad_sub:'Управляйте автомобилями, бронированиями и клиентами.',ad_back:'Вернуться на сайт',
 ad_t1:'Бронирования',ad_t2:'Календарь',ad_t3:'Автомобили',ad_t4:'Клиенты',ad_t5:'Отзывы',ad_t6:'Статистика',
 ad_k1:'Доход',ad_k2:'Бронирования',ad_k3:'Активные',ad_k4:'Загрузка парка',
 ad_c1:'Новая заявка',ad_c2:'Подтверждена',ad_c3:'Выдана',ad_c4:'Возвращена',ad_c5:'Отменена',
 ad_add:'Добавить автомобиль',ad_manual:'Добавить аренду',ad_export:'Экспорт CSV',
 ad_car:'Автомобиль',ad_cat:'Категория',ad_price:'Цена/сутки',ad_dep:'Залог',ad_status:'Статус',ad_act:'Действия',ad_free:'Доступен',
 ad_cl:'Клиент',ad_ph:'Телефон',ad_bk:'Бронирований',ad_sp:'Всего потрачено',
 ad_rt:'Оценка',ad_cm:'Комментарий',ad_dt:'Дата',
 ad_ch:'Ежедневный доход',ad_day:'День',

 ct_ins:'Страховка',ct_ins_v:'Включена в стоимость',ct_km:'Пробег',ct_km_v:'150 км в сутки',ct_dep:'Залог',ct_dep_v:'Возвращается при возврате автомобиля',ct_del:'Доставка',ct_del_v:'По запросу',
 cond_more:'Продление и отмена',cond_fines:'Штрафы',
 dtp_h:'Страховка включена. А если ДТП?',dtp_p:'Коротко и по шагам: что делать и за что вы отвечаете.',
 dtp1:'Сначала безопасность',dtp2:'Позвоните нам',dtp3:'Вызовите полицию',dtp4:'Мы поможем с документами',
 dtp_c1:'Что покрывает страховка',dtp_c2:'Что оплачивает клиент',dtp_c3:'Если ДТП не по вашей вине',

 nav_pricing:'Условия',
 offer_1:'Премиальные авто',offer_2:'в Грузии',offer_sub:'Страховка включена. 150 км в сутки. Доставка в аэропорт и отель.',
 s_pick:'Получение',s_ret:'Возврат',s_btn:'Подобрать автомобиль',s_total:'За {n} суток: {p}',s_period:'Выбранный период: {n} суток',
 b3_h:'3. Почему нам доверяют',
 b4_h:'4. Условия аренды',b4_p:'Что входит, какие требования и что делать при ДТП. Всё до заявки.',
 th_car:'Автомобиль',th_day:'Сутки',th_long:'От 3 суток',th_dep:'Залог',th_km:'Км в сутки',
 calc_h:'Рассчитать аренду',calc_car:'Автомобиль',
 cond_in:'Входит в цену',cond_ins:'Страховка',cond_km:'150 км в сутки',cond_del:'Доставка по запросу',cond_dep:'Залог возвращается',
 cond_age:'Возраст и стаж водителя',cond_doc:'Документы',cond_fuel:'Топливо',cond_border:'Выезд за пределы Грузии',
 b5_h:'5. Как проходит аренда',h1_t:'Выбираете авто и даты',h2_t:'Оставляете заявку',h3_t:'Мы подтверждаем детали',h4_t:'Получаете ключи и едете',
 b6_h:'6. Получение и дополнительные услуги',x1_t:'Доставка в аэропорт',x2_t:'Доставка в отель или домой',x3_t:'Водитель',x4_t:'Долгосрочная аренда',pk_t:'Офис в Тбилиси',
 b7_h:'7. Отзывы клиентов',b8_h:'8. Частые вопросы',b9_h:'9. Куда отправимся?',b9_p:'Выберите автомобиль и даты, остальное согласуем при бронировании: место получения, доставку и детали поездки.',b9_b1:'Выбрать автомобиль',b9_b2:'Написать в мессенджер',
});
Object.assign(T.en,{
 login:'Sign in',
 ad_title:'Administration',ad_sub:'Manage your cars, bookings and customers.',ad_back:'Back to the site',
 ad_t1:'Bookings',ad_t2:'Calendar',ad_t3:'Cars',ad_t4:'Customers',ad_t5:'Reviews',ad_t6:'Statistics',
 ad_k1:'Revenue',ad_k2:'Bookings',ad_k3:'Active',ad_k4:'Fleet utilisation',
 ad_c1:'New request',ad_c2:'Confirmed',ad_c3:'On rent',ad_c4:'Returned',ad_c5:'Cancelled',
 ad_add:'Add a car',ad_manual:'Add a rental',ad_export:'Export CSV',
 ad_car:'Car',ad_cat:'Category',ad_price:'Price/day',ad_dep:'Deposit',ad_status:'Status',ad_act:'Actions',ad_free:'Available',
 ad_cl:'Customer',ad_ph:'Phone',ad_bk:'Bookings',ad_sp:'Total spent',
 ad_rt:'Rating',ad_cm:'Comment',ad_dt:'Date',
 ad_ch:'Daily revenue',ad_day:'Day',

 ct_ins:'Insurance',ct_ins_v:'Included in the price',ct_km:'Mileage',ct_km_v:'150 km per day',ct_dep:'Deposit',ct_dep_v:'Refunded when you return the car',ct_del:'Delivery',ct_del_v:'On request',
 cond_more:'Extension and cancellation',cond_fines:'Fines',
 dtp_h:'Insurance is included. What if there is an accident?',dtp_p:'Short and step by step: what to do and what you are responsible for.',
 dtp1:'Safety first',dtp2:'Call us',dtp3:'Call the police',dtp4:'We help with the paperwork',
 dtp_c1:'What the insurance covers',dtp_c2:'What the customer pays',dtp_c3:'If the accident is not your fault',

 nav_pricing:'Terms',
 offer_1:'Premium cars',offer_2:'in Georgia',offer_sub:'Insurance included. 150 km a day. Delivery to the airport and hotel.',
 s_pick:'Pick-up',s_ret:'Return',s_btn:'Find a car',s_total:'For {n} days: {p}',s_period:'Selected period: {n} days',
 b3_h:'3. Why trust ROVE',
 b4_h:'4. Rental terms',b4_p:'What is included, what we ask of drivers and what to do after an accident. All before you book.',
 th_car:'Car',th_day:'Per day',th_long:'From 3 days',th_dep:'Deposit',th_km:'Km per day',
 calc_h:'Calculate your rental',calc_car:'Car',
 cond_in:'Included in the price',cond_ins:'Insurance',cond_km:'150 km per day',cond_del:'Delivery on request',cond_dep:'Deposit is refunded',
 cond_age:'Driver age and experience',cond_doc:'Documents',cond_fuel:'Fuel',cond_border:'Leaving Georgia',
 b5_h:'5. How the rental works',h1_t:'Choose a car and dates',h2_t:'Send a request',h3_t:'We confirm the details',h4_t:'Get the keys and go',
 b6_h:'6. Pick-up and extra services',x1_t:'Airport delivery',x2_t:'Delivery to a hotel or home',x3_t:'Driver',x4_t:'Long-term rental',pk_t:'Tbilisi office',
 b7_h:'7. Customer reviews',b8_h:'8. Frequently asked questions',b9_h:'9. Where to next?',b9_p:'Choose a car and dates, and we will arrange the rest when you book: pick-up place, delivery and trip details.',b9_b1:'Choose a car',b9_b2:'Message us',
});
var LOC={ru:'ru-RU',en:'en-GB',ka:'ka-GE',he:'he-IL'};
var KEY='rove-site-v2';
var lang='ru',filter='all',fav={},curId=null,route={name:'home'},search=null;
var $=function(id){return document.getElementById(id)};
function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');if(T[s.lang]&&s.lang!=='ka'&&s.lang!=='he')lang=s.lang;fav=s.fav||{};}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify({lang:lang,fav:fav}));}catch(e){}}
function t(k,v){var s=(T[lang][k]!==undefined?T[lang][k]:(T.en[k]!==undefined?T.en[k]:T.ru[k]))||'';if(v)for(var x in v)s=s.replace('{'+x+'}',v[x]);return s}
function money(n){return '<bdi>$'+n+'</bdi>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function car(id){return CARS.find(function(x){return x.id===id})}
var I={
 heart:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
 arr:'<svg class="arr" viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="m5 12 4 4L20 5"/></svg>'
};

/* ---------- home ---------- */
function applyStatic(){
  var d=document.documentElement;d.lang=lang;d.dir=lang==='he'?'rtl':'ltr';
  document.querySelectorAll('[data-i]').forEach(function(el){el.textContent=t(el.getAttribute('data-i'))});
  document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.l===lang))});
  $('menuBtn').setAttribute('aria-label',lang==='ru'?'Меню':lang==='he'?'תפריט':lang==='ka'?'მენიუ':'Menu');
}
function periodQuote(c){if(!search)return null;var days=Math.round((search.e-search.s)/864e5);if(days<1||days>30)return null;return {days:days,total:days*(days>=3?c.longPrice:c.price)}}
function cardHtml(c){var pq=periodQuote(c);
  var hid=filter!=='all'&&filter!==c.type&&route.name==='home';
  return '<article class="card" '+(hid?'hidden':'')+'>'+
   '<a class="shot" href="#/car/'+c.id+'" aria-label="'+esc(c.make+' '+c.model)+'"><img src="'+c.image+'" alt="'+esc(c.make+' '+c.model)+'" loading="lazy"></a>'+
   '<button class="fav" data-fav="'+c.id+'" aria-pressed="'+!!fav[c.id]+'" aria-label="'+esc(t(fav[c.id]?'fav_rm':'fav_add'))+'">'+I.heart+'</button>'+
   '<div class="cmeta"><div><p class="make">'+c.make+'</p><a class="model" href="#/car/'+c.id+'" style="display:block">'+c.model+'</a></div>'+
   '<div class="cprice"><b>'+money(c.price)+'</b> <small>/ '+t('perDay')+'</small><br><small>'+t('longRate',{p:'$'+c.longPrice})+'</small>'+(pq?'<span class="ptotal">'+t('s_total',{n:pq.days,p:'$'+pq.total})+'</span>':'')+'</div></div>'+
   '<div class="cspecs"><span><bdi>'+c.power+' '+t('hp')+'</bdi></span><span>'+t('auto')+'</span><span>'+t('seats')+' '+c.seats+'</span><span><bdi>'+c.year+'</bdi></span></div></article>';
}
function renderCards(){$('grid').innerHTML=CARS.map(cardHtml).join('')}
function renderFaq(){var bar=function(w){return '<i class="wf-bar" style="width:'+w+'"></i>'};$('faqBox').innerHTML=T[lang].faq.map(function(q,i){return '<details'+(i===0?' open':'')+'><summary>'+esc(q[0])+'</summary><div class="wf-lines">'+bar('100%')+bar('90%')+bar('55%')+'</div></details>'}).join('')}

/* ---------- car page ---------- */
function renderCar(id){
  var c=car(id);if(!c){location.hash='#fleet';return}
  var tiles=[['year','<bdi>'+c.year+'</bdi>'],['engine','<bdi>'+c.engine+'</bdi>'],['power','<bdi>'+c.power+' '+t('hp')+'</bdi>'],['acc','<bdi>'+c.acc+' '+t('accU')+'</bdi>'],['seats',c.seats],['gearbox',t('auto')]];
  var others=CARS.filter(function(x){return x.id!==id});
  $('carView').innerHTML=
   '<div class="stickbar"><div class="wrap"><span class="l"><bdi>150 '+(lang==='ru'?'км':lang==='en'?'km':lang==='ka'?'კმ':'ק״מ')+'</bdi> / '+t('perDay')+' · '+t('deposit')+' '+money(c.deposit)+'</span>'+
   '<span class="r"><span><b>'+money(c.price)+'</b> <small>/ '+t('perDay')+'</small></span><a class="btn solid sm" href="#/book/'+c.id+'">'+t('book_short')+'</a></span></div></div>'+
   '<div class="wrap"><a class="back" href="#fleet">'+I.arr+t('back')+'</a>'+
   '<div class="cwrap"><div>'+
   '<div class="ctitle"><div><p class="make">'+c.make+'</p><h1>'+c.model+'</h1></div>'+
   '<button class="save" data-fav="'+c.id+'" aria-pressed="'+!!fav[c.id]+'">'+I.heart+'<span>'+t(fav[c.id]?'saved_btn':'save')+'</span></button></div>'+
   '<div class="bigshot"><img src="'+c.image+'" alt="'+esc(c.make+' '+c.model)+'"></div>'+
   '<h3 class="sub">'+t('tech')+'</h3><dl class="tiles">'+tiles.map(function(x){return '<div class="tile"><dt>'+t(x[0])+'</dt><dd>'+x[1]+'</dd></div>'}).join('')+'</dl>'+
   '<h3 class="sub">'+t('descr')+'</h3><p class="cdesc">'+esc(t('desc_'+c.id))+'</p>'+
   '<h3 class="sub">'+t('included')+'</h3><ul class="incl">'+['incl1','incl2','incl3','incl4'].map(function(k){return '<li>'+I.check+t(k)+'</li>'}).join('')+'</ul>'+
   '</div>'+
   '<aside class="panel"><h2>'+t('setup')+'</h2>'+
   '<div class="prow"><p class="plabel">'+t('km_pack')+' · '+t('perDay')+'</p><p class="pval">'+t('km_val')+'</p><p class="pnote">'+t('km_note')+'</p></div>'+
   '<div class="prow"><p class="plabel">'+t('deposit')+'</p><p class="pval">'+money(c.deposit)+'</p><p class="pnote">'+t('dep_note')+'</p></div>'+
   '<div class="prow"><div class="pprice"><span class="plabel">'+t('price_day')+'</span><b>'+money(c.price)+'</b></div><p class="pnote">'+t('longRate',{p:'$'+c.longPrice})+' · '+t('all_in')+'</p></div>'+
   '<a class="btn solid full" href="#/book/'+c.id+'">'+t('book_car')+'</a></aside></div></div>'+
   (others.length?'<div class="others"><div class="wrap"><h2>'+t('others')+'</h2><div class="grid">'+others.map(cardHtml).join('')+'</div></div></div>':'');
}

/* ---------- booking page ---------- */
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function addDays(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x}
function parse(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function renderBook(id,keep){
  var c=car(id);if(!c){location.hash='#fleet';return}
  var prev=keep&&$('bStart')?{s:$('bStart').value,e:$('bEnd').value,tp:$('bTP').value,tr:$('bTR').value,pl:$('bPlace').value,n:$('bName').value,ph:$('bPhone').value}:null;
  var today=new Date();
  $('bookView').innerHTML='<div class="wrap"><a class="back" href="#/car/'+c.id+'">'+I.arr+c.make+' '+c.model+'</a>'+
   '<form class="bwrap" id="bForm" novalidate><div><h1>'+t('b_title')+'</h1><p class="bcar">'+c.make+' '+c.model+'</p><div class="fields">'+
   '<label>'+t('pickup')+'<input type="date" id="bStart" min="'+ymd(today)+'" value="'+ymd(search?search.s:addDays(today,1))+'"></label>'+
   '<label>'+t('ret')+'<input type="date" id="bEnd" min="'+ymd(today)+'" value="'+ymd(search?search.e:addDays(today,4))+'"></label>'+
   '<label>'+t('time_p')+'<input type="time" id="bTP" value="10:00"></label>'+
   '<label>'+t('time_r')+'<input type="time" id="bTR" value="10:00"></label>'+
   '<label class="wide">'+t('place')+'<select id="bPlace"><option value="office">'+t('pl_office')+'</option><option value="airport">'+t('pl_airport')+'</option><option value="hotel">'+t('pl_hotel')+'</option></select></label>'+
   '<label>'+t('name')+'<input id="bName" autocomplete="name" maxlength="80"></label>'+
   '<label>'+t('phone')+'<input id="bPhone" type="tel" autocomplete="tel" inputmode="tel" maxlength="30" dir="ltr" style="text-align:start"></label>'+
   '<p class="err wide" id="bErr" role="alert"></p></div></div>'+
   '<aside class="quote"><div class="qcar"><img src="'+c.image+'" alt=""><div><small>'+c.make+'</small><b>'+c.model+'</b></div></div><div id="qBody"></div><p class="note">'+t('q_note')+'</p>'+
   '<button class="btn solid full" type="submit">'+t('submit')+'</button></aside></form></div>';
  if(prev){$('bStart').value=prev.s;$('bEnd').value=prev.e;$('bTP').value=prev.tp;$('bTR').value=prev.tr;$('bPlace').value=prev.pl;$('bName').value=prev.n;$('bPhone').value=prev.ph}
  quote();
}
function calc(){
  var s=parse($('bStart').value),e=parse($('bEnd').value),c=car(curId);
  if(!s||!e)return {err:'e_dates'};
  var td=new Date();td.setHours(0,0,0,0);
  if(s<td)return {err:'e_past'};
  var days=Math.round((e-s)/864e5);
  if(days<1)return {err:'e_order'};
  if(days>30)return {err:'e_max'};
  var rate=days>=3?c.longPrice:c.price,sum=days*rate;
  return {days:days,rate:rate,sum:sum,dep:c.deposit,total:sum+c.deposit};
}
function quote(){
  var q=calc(),b=$('qBody');if(!b)return;
  if(q.err){b.innerHTML='<p class="note" style="margin:20px 0">'+t(q.err)+'</p>';return}
  b.innerHTML='<div class="row"><span>'+t('q_rate')+'</span><b>'+money(q.rate)+'</b></div>'+
   '<div class="row"><span>'+t('q_days')+'</span><b>'+t('daysN',{n:q.days})+'</b></div>'+
   '<div class="row"><span>'+t('q_sum')+'</span><b>'+money(q.sum)+'</b></div>'+
   '<div class="row"><span>'+t('q_dep')+'</span><b>'+money(q.dep)+'</b></div>'+
   '<div class="row total"><span>'+t('q_total')+'</span><span>'+money(q.total)+'</span></div>';
}
function submitBook(e){
  e.preventDefault();
  var q=calc(),err=$('bErr');
  if(q.err){err.textContent=t(q.err);return}
  if(!$('bName').value.trim()){err.textContent=t('e_name');$('bName').focus();return}
  if($('bPhone').value.replace(/\D/g,'').length<6){err.textContent=t('e_phone');$('bPhone').focus();return}
  var c=car(curId),f=new Intl.DateTimeFormat(LOC[lang],{day:'numeric',month:'short'});
  var s=parse($('bStart').value),en=parse($('bEnd').value);
  $('bookView').innerHTML='<div class="wrap"><div class="done"><div class="tick">'+I.check+'</div><h1>'+t('ok_h')+'</h1><p>'+t('ok_p')+'</p>'+
   '<p>'+c.make+' '+c.model+' · <bdi>'+f.format(s)+' – '+f.format(en)+'</bdi> · '+money(q.total)+'</p>'+
   '<p class="note">'+t('ok_note')+'</p><a class="btn" href="#fleet">'+t('ok_back')+'</a></div></div>';
  window.scrollTo(0,0);
}


function renderPricing(){
  var el=$('pricingBody');if(!el)return;
  var bar=function(w){return '<i class="wf-bar" style="width:'+w+'"></i>'};
  var known=[['ct_ins','ct_ins_v'],['ct_km','ct_km_v'],['ct_dep','ct_dep_v'],['ct_del','ct_del_v']].map(function(p){return '<div><dt>'+t(p[0])+'</dt><dd>'+I.check+t(p[1])+'</dd></div>'}).join('');
  var unk=['cond_age','cond_doc','cond_fuel','cond_border','cond_more','cond_fines'].map(function(k){return '<div><dt>'+t(k)+'</dt>'+bar('70%')+'</div>'}).join('');
  var steps=['dtp1','dtp2','dtp3','dtp4'].map(function(k,i){return '<li><span class="dn">'+(i+1)+'</span><div><h4>'+t(k)+'</h4>'+bar('90%')+bar('55%')+'</div></li>'}).join('');
  var cards=['dtp_c1','dtp_c2','dtp_c3'].map(function(k){return '<div class="dcard"><h4>'+t(k)+'</h4>'+bar('100%')+bar('85%')+bar('50%')+'</div>'}).join('');
  el.innerHTML='<dl class="cond">'+known+unk+'</dl>'+
   '<div class="dtp"><div class="dtp-l"><h3>'+t('dtp_h')+'</h3><p>'+t('dtp_p')+'</p></div><ol class="dtp-s">'+steps+'</ol></div>'+
   '<div class="dcards">'+cards+'</div>';
}
function searchSubmit(e){
  e.preventDefault();
  var s=parse($('sStart').value),en=parse($('sEnd').value),err=$('sErr'),td=new Date();td.setHours(0,0,0,0);
  var msg=!s||!en?'e_dates':s<td?'e_past':Math.round((en-s)/864e5)<1?'e_order':Math.round((en-s)/864e5)>30?'e_max':'';
  if(msg){err.textContent=t(msg);return}
  err.textContent='';search={s:s,e:en};
  var n=Math.round((en-s)/864e5),p=$('period');p.hidden=false;p.textContent=t('s_period',{n:n});
  renderCards();renderPricing();$('fleet').scrollIntoView({behavior:'smooth'});
}


/* ---------- админка (макет) ---------- */
var admTab=1; /* вкладки пока отключены, показан раздел Бронирования */
function renderAdmin(){
  var el=$('adminView');if(!el)return;
  var bar=function(w){return '<i class="wf-bar" style="width:'+w+'"></i>'};
  var tabs=[1,2,3,4,5,6].map(function(n){return '<button data-adm="'+n+'" aria-pressed="'+(admTab===n)+'" disabled>'+t('ad_t'+n)+'</button>'}).join('');
  var body='';
  var kpi=function(keys){return '<div class="kpis">'+keys.map(function(k){return '<div class="kpi"><span>'+t(k)+'</span>'+bar('55%')+'</div>'}).join('')+'</div>'};
  if(admTab===1){
    var cols=[1,2,3,4,5].map(function(n){
      var cards='';var cnt=n===1?3:n===2?2:n===3?2:1;
      for(var i=0;i<cnt;i++)cards+='<div class="kb-card"><div class="r"><i class="wf-sq"></i><div style="flex:1">'+bar('70%')+bar('45%')+'</div></div>'+bar('90%')+'</div>';
      return '<div class="kb-col"><div class="kb-h"><span>'+t('ad_c'+n)+'</span><i></i></div>'+cards+'</div>';
    }).join('');
    body=kpi(['ad_k1','ad_k2','ad_k3','ad_k4'])+'<div class="adm-bar"><span></span><div style="display:flex;gap:12px"><button class="btn sm" type="button" disabled>'+t('ad_export')+'</button><button class="btn solid sm" type="button" disabled>'+t('ad_manual')+'</button></div></div><div class="kb">'+cols+'</div>';
  }else if(admTab===2){
    var g='<div class="hd"></div>';for(var d=1;d<=14;d++)g+='<div class="hd">'+d+'</div>';
    var bk=[[[2,6]],[[7,11]]];
    CARS.forEach(function(c,ci){
      g+='<div class="car">'+c.make+' '+c.model+'</div>';
      for(var d2=1;d2<=14;d2++){
        var hit=bk[ci].find(function(r){return d2===r[0]});
        if(hit){g+='<div class="bk" style="grid-column:span '+(hit[1]-hit[0]+1)+'"></div>';d2=hit[1]}else g+='<div></div>';
      }
    });
    body='<div class="cal"><div class="cal-g">'+g+'</div></div>';
  }else if(admTab===3){
    var rows=CARS.map(function(c){return '<tr><td><div class="nm"><i class="wf-sq"></i><span>'+c.make+' '+c.model+'</span></div></td><td>'+bar('70px')+'</td><td>'+bar('60px')+'</td><td>'+bar('60px')+'</td><td><span class="ok">'+t('ad_free')+'</span></td><td>'+bar('90px')+'</td></tr>'}).join('');
    body='<div class="adm-bar"><span></span><button class="btn solid sm" type="button" disabled>'+t('ad_add')+'</button></div><div class="tw"><table class="tbl"><thead><tr><th>'+t('ad_car')+'</th><th>'+t('ad_cat')+'</th><th>'+t('ad_price')+'</th><th>'+t('ad_dep')+'</th><th>'+t('ad_status')+'</th><th>'+t('ad_act')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }else if(admTab===4){
    var r4='';for(var i4=0;i4<5;i4++)r4+='<tr><td>'+bar('130px')+'</td><td>'+bar('110px')+'</td><td>'+bar('40px')+'</td><td>'+bar('70px')+'</td></tr>';
    body='<div class="tw"><table class="tbl"><thead><tr><th>'+t('ad_cl')+'</th><th>'+t('ad_ph')+'</th><th>'+t('ad_bk')+'</th><th>'+t('ad_sp')+'</th></tr></thead><tbody>'+r4+'</tbody></table></div>';
  }else if(admTab===5){
    var r5='';for(var i5=0;i5<4;i5++)r5+='<tr><td>'+bar('120px')+'</td><td>'+bar('70px')+'</td><td>'+bar('260px')+'</td><td>'+bar('80px')+'</td></tr>';
    body='<div class="tw"><table class="tbl"><thead><tr><th>'+t('ad_cl')+'</th><th>'+t('ad_rt')+'</th><th>'+t('ad_cm')+'</th><th>'+t('ad_dt')+'</th></tr></thead><tbody>'+r5+'</tbody></table></div>';
  }else{
    var hs=[40,60,35,80,55,70,45,90,50,65,30,75,60,85];
    body=kpi(['ad_k1','ad_k2','ad_k3','ad_k4'])+'<h3 class="ch-t">'+t('ad_ch')+'</h3><div class="chart">'+hs.map(function(v){return '<i style="height:'+v+'%"></i>'}).join('')+'</div>';
  }
  el.innerHTML='<div class="wrap adm"><div class="adm-top"><div><h1>'+t('ad_title')+'</h1><p>'+t('ad_sub')+'</p></div><a class="btn sm" href="#top">'+t('ad_back')+'</a></div><div class="adm-tabs" role="group">'+tabs+'</div>'+body+'</div>';
}

/* ---------- router ---------- */
function show(name){
  $('home').hidden=name!=='home';$('carView').hidden=name!=='car';$('bookView').hidden=name!=='book';$('adminView').hidden=name!=='admin';
  $('header').classList.toggle('solid',name!=='home'||window.scrollY>40);
}
function go(keep){
  var h=location.hash,m;
  if(h==='#/admin'){route={name:'admin'};show('admin');renderAdmin();if(!keep)window.scrollTo(0,0);return}
  if((m=h.match(/^#\/car\/([a-z0-9]+)$/))){route={name:'car'};curId=m[1];show('car');renderCar(curId);if(!keep)window.scrollTo(0,0);return}
  if((m=h.match(/^#\/book\/([a-z0-9]+)$/))){route={name:'book'};curId=m[1];show('book');renderBook(curId,keep);if(!keep)window.scrollTo(0,0);return}
  var was=route.name;route={name:'home'};show('home');
  renderCards();renderFaq();renderPricing();syncSearch();
  var id=h.replace('#',''),el=id&&$(id);
  if(was!=='home'||keep!==true){ if(el){el.scrollIntoView({behavior:'instant'})}else if(was!=='home'){window.scrollTo(0,0)} }
  observeRv();
}
function syncSearch(){var td=new Date();if($('sStart')&&!$('sStart').value){$('sStart').min=ymd(td);$('sEnd').min=ymd(td);$('sStart').value=ymd(search?search.s:addDays(td,1));$('sEnd').value=ymd(search?search.e:addDays(td,4))}var p=$('period');if(p){if(search){var n=Math.round((search.e-search.s)/864e5);p.hidden=false;p.textContent=t('s_period',{n:n})}else p.hidden=true}}
var tt;function toast(m){var el=$('toast');el.textContent=m;el.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('show')},2600)}

document.addEventListener('click',function(e){
  var el;
  if((el=e.target.closest('[data-fav]'))){e.preventDefault();var id=el.dataset.fav;if(fav[id]){delete fav[id];toast(t('removed'))}else{fav[id]=1;toast(t('saved'))}save();if(route.name==='car')renderCar(curId);else go(true);return}
  if((el=e.target.closest('.lang button'))){lang=el.dataset.l;save();applyStatic();go(true);return}
  if((el=e.target.closest('#tabs .tab'))){filter=el.dataset.f;document.querySelectorAll('#tabs .tab').forEach(function(b){b.setAttribute('aria-pressed',String(b===el))});renderCards();return}
  if((el=e.target.closest('[data-adm]'))){admTab=+el.dataset.adm;renderAdmin();return}
  if(e.target.closest('[data-contact]')){toast(t('contact_soon'));return}
  if(e.target.closest('#mnav a')){$('mnav').hidden=true;$('menuBtn').setAttribute('aria-expanded','false');return}
  if((el=e.target.closest('a[href^="#"]'))&&!/^#\//.test(el.getAttribute('href'))&&route.name!=='home'){/* leaving inner page: hashchange handles it */}
});
document.addEventListener('input',function(e){if(e.target.closest('#bForm')){$('bErr').textContent='';quote()}});
document.addEventListener('submit',function(e){if(e.target.id==='bForm')submitBook(e);else if(e.target.id==='searchForm')searchSubmit(e)});

$('menuBtn').addEventListener('click',function(){var h=!$('mnav').hidden;$('mnav').hidden=h;this.setAttribute('aria-expanded',String(!h))});
window.addEventListener('hashchange',function(){go(false)});
window.addEventListener('scroll',function(){if(route.name==='home')$('header').classList.toggle('solid',window.scrollY>40)},{passive:true});

/* ---------- hero slider ---------- */
var slide=0,photos=document.querySelectorAll('.hero-photo'),dots=document.querySelectorAll('#dots button'),timer;
function setSlide(i){slide=i;photos.forEach(function(p,k){p.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k===i)});$('cnt').textContent='0'+(i+1)}
function run(){clearInterval(timer);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;timer=setInterval(function(){if(!document.hidden&&route.name==='home')setSlide((slide+1)%photos.length)},7000)}
dots.forEach(function(d,i){d.addEventListener('click',function(){setSlide(i);run()})});

/* ---------- reveal on scroll ---------- */
var io=null;
function observeRv(){
  var els=document.querySelectorAll('.rv:not(.in)');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  if(!io)io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
}

/* ---------- preloader ---------- */
function preloader(){
  var pre=$('pre'),t0=Date.now(),done=false;
  function finish(){
    if(done)return;done=true;
    var wait=Math.max(0,2400-(Date.now()-t0));
    setTimeout(function(){pre.classList.add('done');document.body.classList.remove('lock');setTimeout(function(){pre.remove()},1100)},wait);
  }
  var img=new Image();img.src='assets/g63.webp';
  var imgReady=new Promise(function(r){if(img.complete)r();else{img.onload=r;img.onerror=r}});
  var winReady=new Promise(function(r){if(document.readyState==='complete')r();else window.addEventListener('load',r)});
  Promise.all([imgReady,winReady]).then(finish);
  setTimeout(finish,6000);
}

load();applyStatic();go(true);run();preloader();
})();
