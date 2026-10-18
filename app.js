(function () {
'use strict';

/* ---------- утилиты ---------- */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
var NB = ' ';
var MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
function dt(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
function ndays(a, b) { return Math.round((dt(b) - dt(a)) / 864e5); }
function fmt(a, b) { var x = dt(a), y = dt(b); return x.getDate() + (x.getMonth() === y.getMonth() ? '' : ' ' + MONTHS[x.getMonth()]) + '–' + y.getDate() + ' ' + MONTHS[y.getMonth()]; }
function fmtOne(a) { var x = dt(a); return x.getDate() + ' ' + MONTHS[x.getMonth()] + ' ' + x.getFullYear(); }
function money(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + '$'; }
var tt;
function toast(m) { var el = $('#toast'); el.textContent = m; el.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove('show'); }, 2800); }
function openModal(html) { $('#mbody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal() { $('#modal').hidden = true; $('#mbody').innerHTML = ''; document.body.style.overflow = ''; }
$('#modal').addEventListener('click', function (e) { if (e.target.id === 'modal' || e.target.classList.contains('mx')) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (!$('#modal').hidden) closeModal(); closePhoneLists(); } });

/* ---------- связь с сервером (если указан apiBase в config.js) ---------- */
function apiBase() { return (window.APP_CONFIG && window.APP_CONFIG.apiBase) || ''; }
function api(path, body, method) {
  return fetch(apiBase() + path, {
    method: method || 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined
  }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); });
}
var LOGIN_ERR = '';
var LOGIN_UNVERIFIED = '';

/* ---------- флаги и телефонные коды ---------- */
var FL = {
  RU: '<rect width="24" height="16" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#0039a6"/><rect y="10.67" width="24" height="5.33" fill="#d52b1e"/>',
  IL: '<rect width="24" height="16" fill="#fff"/><rect y="2" width="24" height="2" fill="#0038b8"/><rect y="12" width="24" height="2" fill="#0038b8"/><path d="M12 5.2 14.6 9.7H9.4ZM12 10.8 9.4 6.3H14.6Z" fill="none" stroke="#0038b8" stroke-width=".7"/>',
  GE: '<rect width="24" height="16" fill="#fff"/><path d="M10.5 0h3v16h-3zM0 6.5h24v3H0z" fill="#f00"/><path d="M4.3 2.2v3M2.8 3.7h3M19.7 2.2v3M18.2 3.7h3M4.3 10.8v3M2.8 12.3h3M19.7 10.8v3M18.2 12.3h3" stroke="#f00" stroke-width=".9"/>',
  AM: '<rect width="24" height="5.33" fill="#d90012"/><rect y="5.33" width="24" height="5.34" fill="#0033a0"/><rect y="10.67" width="24" height="5.33" fill="#f2a800"/>',
  AZ: '<rect width="24" height="5.33" fill="#00b5e2"/><rect y="5.33" width="24" height="5.34" fill="#ef3340"/><rect y="10.67" width="24" height="5.33" fill="#509e2f"/><circle cx="11.2" cy="8" r="2.6" fill="#fff"/><circle cx="12" cy="8" r="2.1" fill="#ef3340"/><circle cx="14" cy="8" r=".6" fill="#fff"/>',
  KZ: '<rect width="24" height="16" fill="#00afca"/><circle cx="12" cy="7" r="3" fill="#fec50c"/><path d="M5 13h14" stroke="#fec50c" stroke-width=".8"/>',
  BY: '<rect width="24" height="16" fill="#cf101a"/><rect y="10.67" width="24" height="5.33" fill="#007c2e"/><rect width="3.2" height="16" fill="#fff"/><path d="M1.6 2 .4 4l1.2 2 1.2-2zM1.6 10l-1.2 2 1.2 2 1.2-2z" fill="#cf101a"/>',
  UA: '<rect width="24" height="8" fill="#0057b7"/><rect y="8" width="24" height="8" fill="#ffd700"/>',
  UZ: '<rect width="24" height="5.3" fill="#0099b5"/><rect y="5.3" width="24" height="5.4" fill="#fff"/><rect y="10.7" width="24" height="5.3" fill="#1eb53a"/><rect y="5" width="24" height=".5" fill="#ce1126"/><rect y="10.5" width="24" height=".5" fill="#ce1126"/>',
  TR: '<rect width="24" height="16" fill="#e30a17"/><circle cx="9" cy="8" r="4" fill="#fff"/><circle cx="10.2" cy="8" r="3.2" fill="#e30a17"/><circle cx="14" cy="8" r="1" fill="#fff"/>',
  AE: '<rect width="24" height="16" fill="#00732f"/><rect y="5.33" width="24" height="5.34" fill="#fff"/><rect y="10.67" width="24" height="5.33" fill="#000"/><rect width="6" height="16" fill="#f00"/>',
  XX: '<rect width="24" height="16" fill="#2b2b2f"/><circle cx="12" cy="8" r="5.5" fill="none" stroke="#ebe7df" stroke-width="1"/><path d="M6.5 8h11M12 2.5c-2.5 2.5-2.5 8.5 0 11M12 2.5c2.5 2.5 2.5 8.5 0 11" stroke="#ebe7df" stroke-width=".8" fill="none"/>',
  DE: '<rect width="24" height="5.33" fill="#000"/><rect y="5.33" width="24" height="5.34" fill="#dd0000"/><rect y="10.67" width="24" height="5.33" fill="#ffce00"/>'
};
var COUNTRIES = [
  { c: 'RU', n: 'Россия', d: '+7', ph: '900 000-00-00' },
  { c: 'IL', n: 'Израиль', d: '+972', ph: '50 000 0000' },
  { c: 'GE', n: 'Грузия', d: '+995', ph: '555 00 00 00' },
  { c: 'AM', n: 'Армения', d: '+374', ph: '77 000000' },
  { c: 'AZ', n: 'Азербайджан', d: '+994', ph: '50 000 00 00' },
  { c: 'KZ', n: 'Казахстан', d: '+7', ph: '700 000 00 00' },
  { c: 'BY', n: 'Беларусь', d: '+375', ph: '29 000-00-00' },
  { c: 'UA', n: 'Украина', d: '+380', ph: '50 000 0000' },
  { c: 'UZ', n: 'Узбекистан', d: '+998', ph: '90 000 00 00' },
  { c: 'TR', n: 'Турция', d: '+90', ph: '501 000 00 00' },
  { c: 'AE', n: 'ОАЭ', d: '+971', ph: '50 000 0000' },
  { c: 'DE', n: 'Германия', d: '+49', ph: '1512 0000000' },
  { c: 'XX', n: 'Другая страна (ввести номер с кодом)', d: '+…', ph: '+33 1 23 45 67 89' }
];
function cdata(c) { return COUNTRIES.filter(function (x) { return x.c === c; })[0] || COUNTRIES[0]; }
function flag(c) { return '<svg class="fl" viewBox="0 0 24 16" aria-hidden="true">' + (FL[c] || '') + '</svg>'; }
var CV = '<svg class="cv" viewBox="0 0 12 12"><path d="M2 4.5l4 4 4-4"/></svg>';
function phoneField(id, country, value) {
  var cd = cdata(country);
  return '<div class="phone" data-phone="' + id + '" data-c="' + cd.c + '">' +
    '<button type="button" class="pc" aria-haspopup="listbox" aria-expanded="false" aria-label="Страна">' + flag(cd.c) + '<span class="dc">' + cd.d + '</span>' + CV + '</button>' +
    '<input type="tel" inputmode="tel" dir="ltr" autocomplete="tel-national" placeholder="' + esc(cd.ph) + '" value="' + esc(value || '') + '" aria-label="Номер телефона">' +
    '<ul class="plist" role="listbox" hidden>' + COUNTRIES.map(function (x) {
      return '<li role="option" data-c="' + x.c + '" aria-selected="' + (x.c === cd.c) + '">' + flag(x.c) + '<span>' + x.n + '</span><span class="cd">' + x.d + '</span></li>';
    }).join('') + '</ul></div>';
}
function closePhoneLists() { $$('.plist').forEach(function (l) { l.hidden = true; }); $$('.phone .pc').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
document.addEventListener('click', function (e) {
  var pc = e.target.closest('.phone .pc');
  if (pc) {
    var list = $('.plist', pc.parentNode), open = !list.hidden;
    closePhoneLists();
    if (!open) { list.hidden = false; pc.setAttribute('aria-expanded', 'true'); }
    return;
  }
  var li = e.target.closest('.plist li');
  if (li) {
    var ph = li.closest('.phone'), cd = cdata(li.dataset.c);
    ph.dataset.c = cd.c;
    $('.pc', ph).innerHTML = flag(cd.c) + '<span class="dc">' + cd.d + '</span>' + CV;
    $('input', ph).placeholder = cd.ph;
    $$('li', ph).forEach(function (x) { x.setAttribute('aria-selected', String(x === li)); });
    closePhoneLists(); $('input', ph).focus();
    return;
  }
  if (!e.target.closest('.phone')) closePhoneLists();
});
document.addEventListener('input', function (e) {
  var inp = e.target, ph = inp.closest && inp.closest('.phone');
  if (!ph) return;
  var v = inp.value.replace(/\s/g, '');
  if (v.charAt(0) !== '+' || v.length < 3) return;
  var best = null;
  COUNTRIES.forEach(function (c) { if (c.c !== 'XX' && v.indexOf(c.d) === 0 && (!best || c.d.length > best.d.length)) best = c; });
  var cd = best || cdata('XX');
  if (ph.dataset.c === cd.c) return;
  ph.dataset.c = cd.c;
  $('.pc', ph).innerHTML = flag(cd.c) + '<span class="dc">' + cd.d + '</span>' + CV;
  $$('li', ph).forEach(function (x) { x.setAttribute('aria-selected', String(x.dataset.c === cd.c)); });
});
function phoneValue(id, root) {
  var ph = $('[data-phone="' + id + '"]', root || document);
  var cd = cdata(ph.dataset.c), raw = $('input', ph).value.trim(), digits = raw.replace(/\D/g, '');
  var intl = raw.charAt(0) === '+' || cd.c === 'XX';
  return { code: cd.d, digits: digits, full: intl ? raw : cd.d + ' ' + raw };
}

/* ---------- данные ---------- */
var CARS = {
  g63: { name: 'Mercedes-Benz G 63', short: 'G 63', cat: 'Внедорожник', img: 'assets/g63.webp', price: 350, long: 320, dep: 700, hidden: false },
  p911: { name: 'Porsche 911 Carrera', short: '911 Carrera', cat: 'Спорткупе', img: 'assets/porsche.webp', price: 300, long: 270, dep: 600, hidden: false }
};
var carSeq = 2;
function calc(car, n) { return n * (n >= 3 ? car.long : car.price); }
var ST = [['new', 'Новая заявка'], ['confirmed', 'Подтверждена'], ['issued', 'Выдана'], ['returned', 'Возвращена'], ['cancelled', 'Отменена']];
function stName(k) { return ST.filter(function (s) { return s[0] === k; })[0][1]; }
var PLACES = ['Аэропорт Тбилиси', 'Отель в Тбилиси', 'Офис в Тбилиси', 'Другой адрес'];
var BK = [
  { id: 'B-1041', cl: 'Дмитрий Орлов', co: 'RU', phone: '+7 915 000-00-01', email: 'd.orlov@example.com', car: 'g63', from: '2026-10-26', to: '2026-10-30', place: PLACES[0], st: 'new' },
  { id: 'B-1040', cl: 'Лея Коэн', co: 'IL', phone: '+972 50 000 0002', email: 'leah.c@example.com', car: 'p911', from: '2026-10-25', to: '2026-10-27', place: PLACES[1], st: 'new' },
  { id: 'B-1039', cl: 'Армен Саркисян', co: 'AM', phone: '+374 77 000003', email: 'a.sarkisyan@example.com', car: 'g63', from: '2026-10-22', to: '2026-10-25', place: PLACES[0], st: 'confirmed' },
  { id: 'B-1038', cl: 'Михаил Левин', co: 'IL', phone: '+972 52 000 0004', email: 'm.levin@example.com', car: 'p911', from: '2026-10-16', to: '2026-10-21', place: PLACES[2], st: 'issued' },
  { id: 'B-1037', cl: 'Иван Смирнов', co: 'RU', phone: '+7 926 000-00-05', email: 'i.smirnov@example.com', car: 'g63', from: '2026-10-05', to: '2026-10-09', place: PLACES[0], st: 'returned' },
  { id: 'B-1036', cl: 'Йосеф Леви', co: 'IL', phone: '+972 54 000 0006', email: 'y.levi@example.com', car: 'p911', from: '2026-10-12', to: '2026-10-14', place: PLACES[1], st: 'cancelled' }
];
var REVIEWS = [
  { id: 1, cl: 'Иван Смирнов', car: 'g63', stars: 5, date: '2026-10-10', text: 'Машина в отличном состоянии, подали в аэропорт точно ко времени. Условия были понятны с самого начала.', st: 'pub' },
  { id: 2, cl: 'Михаил Левин', car: 'p911', stars: 5, date: '2026-10-17', text: 'Удобно, что написали в WhatsApp и сразу ответили на все вопросы. Спасибо за сервис.', st: 'pending' },
  { id: 3, cl: 'Йосеф Леви', car: 'p911', stars: 4, date: '2026-10-14', text: 'Всё прошло хорошо, хотелось бы больше вариантов по дополнительному оборудованию.', st: 'pub' }
];
var TODAY = '2026-10-18';
function bkDays(b) { return ndays(b.from, b.to); }
function bkTotal(b) { return calc(CARS[b.car], bkDays(b)); }

/* ============================================================
   РЕГИСТРАЦИЯ
   ============================================================ */
var REG = { name: '', last: '', email: '', ph: '', co: 'RU', dob: '', state: 'form' };
var LOGIN_MSG = '';
var ENV = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>';
var WARN = '<svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.5"/></svg>';
var OKI = '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L20 6"/></svg>';
var BACK = '<a class="back" href="#top"><svg class="arr" viewBox="0 0 24 24" style="transform:scaleX(-1)"><path d="M4 12h16M14 6l6 6-6 6"/></svg>Вернуться на сайт</a>';
var SIDE = '<aside class="aside"><h3>Что даёт аккаунт</h3><ul><li>История бронирований со статусами</li><li>Избранные автомобили</li><li>Быстрая бронь без повторного ввода данных</li><li>Отзывы после аренды</li></ul></aside>';
var cdTimer = null;

function renderRegister() {
  var v = $('#registerView');
  if (REG.state === 'sent') { renderSent(v); return; }
  v.innerHTML = '<div class="wrap pg">' + BACK + '<h1>Регистрация</h1><p class="sub">Создайте аккаунт, чтобы видеть свои бронирования и сохранять автомобили.</p>' +
    '<div class="auth"><div><div class="tabs2"><a href="#/login" class="tb">Вход</a><a href="#/register" class="tb on">Регистрация</a></div>' +
    '<form class="fields" id="regForm" novalidate>' +
    '<label>Имя<input name="name" autocomplete="given-name" value="' + esc(REG.name) + '"></label>' +
    '<label>Фамилия<input name="last" autocomplete="family-name" value="' + esc(REG.last) + '"></label>' +
    '<label class="wide">Email<input name="email" type="email" autocomplete="email" placeholder="name@email.com" value="' + esc(REG.email) + '"></label>' +
    '<label class="wide">Телефон' + phoneField('reg', REG.co, REG.ph) + '</label>' +
    '<label>Дата рождения<input name="dob" type="date" value="' + esc(REG.dob) + '"></label>' +
    '<div></div>' +
    '<label>Пароль<input name="pw" type="password" autocomplete="new-password" placeholder="Минимум 8 символов"></label>' +
    '<label>Повторите пароль<input name="pw2" type="password" autocomplete="new-password" placeholder="Ещё раз"></label>' +
    '<label class="chk"><input type="checkbox" name="agree" style="width:18px;height:18px;flex:none;margin-top:2px"><span>Согласен с условиями аренды и обработкой персональных данных</span></label>' +
    '<p class="err wide" id="regErr" role="alert"></p>' +
    '<div class="wide"><button class="btn solid full" type="submit">Создать аккаунт</button></div>' +
    '<p class="wide hint">После регистрации мы отправим письмо со ссылкой для подтверждения на ваш email.</p>' +
    '<p class="wide hint">Уже есть аккаунт? <a href="#/login" class="lnk">Войти</a></p></form></div>' + SIDE + '</div></div>';
}
function renderSent(v) {
  v.innerHTML = '<div class="wrap pg">' + BACK + '<div class="sent"><div class="env">' + ENV + '</div><h1>Проверьте почту</h1>' +
    '<p>Мы отправили письмо со ссылкой для подтверждения регистрации на <b>' + esc(REG.email) + '</b>. Перейдите по ссылке из письма, чтобы войти в личный кабинет.</p>' +
    '<div class="spam">' + WARN + '<div><b>Письма нет? Проверьте папку «Спам»</b><span>Иногда письмо попадает в «Спам» или «Нежелательную почту», а иногда приходит с небольшой задержкой. Если нашли его там, отметьте «Не спам».</span></div></div>' +
    '<div class="mact"><button class="btn" type="button" id="resend" disabled>Отправить письмо ещё раз</button><button class="btn" type="button" id="editMail">Изменить email</button></div>' +
    (apiBase() ? '' : '<p class="hint" style="margin-top:22px">Это макет: нажмите <span class="lnk" id="openMail">«Открыть письмо (пример)»</span>, чтобы увидеть, как оно выглядит.</p>') + '</div></div>';
  startCountdown();
}
function startCountdown() {
  clearInterval(cdTimer);
  var left = 30, b = $('#resend');
  function tick() { if (!b) return; if (left > 0) { b.disabled = true; b.textContent = 'Отправить ещё раз через ' + left + ' с'; left--; } else { b.disabled = false; b.textContent = 'Отправить письмо ещё раз'; clearInterval(cdTimer); } }
  tick(); cdTimer = setInterval(function () { b = $('#resend'); if (!b) { clearInterval(cdTimer); return; } tick(); }, 1000);
}
function mailPreview() {
  openModal('<h3>Письмо клиенту (пример)</h3><p class="sub2">Так письмо выглядит в почте.</p>' +
    '<div class="mail"><div class="mh"><b>От:</b> Прокат автомобилей &lt;no-reply@example.com&gt;<br><b>Кому:</b> ' + esc(REG.email) + '<br><b>Тема:</b> Подтвердите регистрацию</div>' +
    '<div class="mb"><p>Здравствуйте, ' + esc(REG.name || 'клиент') + '!</p><p>Чтобы завершить регистрацию и войти в личный кабинет, подтвердите ваш email.</p>' +
    '<button class="mbtn" type="button" id="confirmMail">Подтвердить email</button>' +
    '<p>Ссылка действует 24 часа.</p><p class="mnote">Не нашли это письмо во «Входящих»? Проверьте папку «Спам» или «Нежелательная почта». Если вы не регистрировались, просто проигнорируйте письмо.</p></div></div>');
}

/* ============================================================
   ВХОД
   ============================================================ */
function renderLogin() {
  var v = $('#loginView');
  v.innerHTML = '<div class="wrap pg">' + BACK + '<h1>Вход</h1><p class="sub">Войдите, чтобы увидеть свои бронирования.</p>' +
    '<div class="auth"><div><div class="tabs2"><a href="#/login" class="tb on">Вход</a><a href="#/register" class="tb">Регистрация</a></div>' +
    (LOGIN_MSG ? '<div class="ok-msg">' + OKI + '<span>' + esc(LOGIN_MSG) + '</span></div>' : '') + (LOGIN_ERR ? '<div class="ok-msg bad">' + WARN + '<span>' + esc(LOGIN_ERR) + '</span></div>' : '') +
    '<form class="fields" id="loginForm" novalidate>' +
    '<label class="wide">Email или телефон<input name="login" value="' + (apiBase() ? '' : 'admin') + '" autocomplete="username"></label>' +
    '<label class="wide">Пароль<input name="pw" type="password" value="' + (apiBase() ? '' : 'admin') + '" autocomplete="current-password"></label>' +
    '<p class="err wide" id="loginErr" role="alert"></p>' +
    '<div class="wide"><button class="btn solid full" type="submit">Войти</button></div>' +
    '<p class="wide hint">Нет аккаунта? <a href="#/register" class="lnk">Зарегистрироваться</a> · <a href="#/cabinet" class="lnk">Войти как клиент</a></p></form></div>' + SIDE + '</div></div>';
  LOGIN_MSG = ''; LOGIN_ERR = '';
}

/* ============================================================
   ЛИЧНЫЙ КАБИНЕТ
   ============================================================ */
var C = { tab: 'bookings', open: null };
var CLIENT = { name: 'Дмитрий', last: 'Орлов', email: 'd.orlov@example.com', co: 'RU', ph: '915 000-00-01', dob: '1988-05-14' };
var CB = [
  { id: 'B-1041', car: 'g63', from: '2026-10-26', to: '2026-10-30', st: 'confirmed', place: PLACES[0] },
  { id: 'B-0987', car: 'p911', from: '2026-10-05', to: '2026-10-08', st: 'completed', place: PLACES[2], reviewed: false },
  { id: 'B-0954', car: 'p911', from: '2026-10-12', to: '2026-10-14', st: 'cancelled', place: PLACES[1] }
];
var FAVS = ['g63', 'p911'];
var CST = { confirmed: 'Подтверждено', active: 'Активно', completed: 'Завершено', cancelled: 'Отменено' };

function renderCabinet() {
  var v = $('#cabinetView'), tabs = [['bookings', 'Мои бронирования'], ['favs', 'Избранное'], ['profile', 'Профиль']];
  var spent = CB.filter(function (b) { return b.st === 'completed' || b.st === 'confirmed'; }).reduce(function (s, b) { return s + calc(CARS[b.car], ndays(b.from, b.to)); }, 0);
  var body = '';
  if (C.tab === 'bookings') {
    body = '<div class="stat"><div><small>Всего аренд</small><b>' + CB.length + '</b></div><div><small>Активные и предстоящие</small><b>' + CB.filter(function (b) { return b.st === 'confirmed' || b.st === 'active'; }).length + '</b></div><div><small>Всего потрачено</small><b>' + money(spent) + '</b></div></div>' +
      (CB.length ? CB.map(function (b) {
        var car = CARS[b.car], n = ndays(b.from, b.to), tot = calc(car, n), op = C.open === b.id;
        var acts = '<button class="btn sm" type="button" data-act="cmore" data-id="' + b.id + '">' + (op ? 'Скрыть' : 'Подробнее') + '</button>';
        if (b.st === 'confirmed') acts += '<button class="btn sm" type="button" data-act="ccancel" data-id="' + b.id + '">Отменить бронь</button>';
        if (b.st === 'completed') acts += b.reviewed ? '<span class="hint">Отзыв оставлен</span>' : '<button class="btn sm" type="button" data-act="creview" data-id="' + b.id + '">Оставить отзыв</button>';
        return '<div class="bk2"><div class="top"><div class="ph"><img src="' + car.img + '" alt=""></div><div><span class="st' + (b.st === 'confirmed' || b.st === 'active' ? ' ok' : '') + '">' + CST[b.st] + '</span><h4>' + car.name + '</h4>' +
          '<div class="meta"><span>Даты<b>' + fmt(b.from, b.to) + '</b></span><span>Срок<b>' + n + ' сут.</b></span><span>Пакет км<b>150 км в сутки</b></span><span>Итого<b>' + money(tot) + '</b></span></div></div><div class="act">' + acts + '</div></div>' +
          (op ? '<div class="more"><div><small>Номер брони</small>' + b.id + '</div><div><small>Место получения</small>' + b.place + '</div><div><small>Залог</small>' + money(car.dep) + ' (возвращается при возврате)</div><div><small>Аренда</small>' + money(tot) + '</div><div><small>Итого при получении</small>' + money(tot + car.dep) + '</div><div><small>Связь с менеджером</small>WhatsApp или Telegram</div></div>' : '') + '</div>';
      }).join('') : '<p class="hint">Пока нет бронирований.</p>');
  } else if (C.tab === 'favs') {
    body = FAVS.length ? '<div class="fav2">' + FAVS.map(function (id) {
      var c = CARS[id];
      return '<div class="fc"><img src="' + c.img + '" alt=""><div class="fb2"><h4>' + c.name + '</h4><p>' + money(c.price) + ' в сутки · залог ' + money(c.dep) + '</p><div class="row-act"><a class="btn sm solid" href="#catalog">В каталог</a><button class="btn sm" type="button" data-act="unfav" data-id="' + id + '">Убрать</button></div></div></div>';
    }).join('') + '</div>' : '<p class="hint">Здесь пока пусто. Нажмите сердечко на карточке автомобиля в каталоге.</p>';
  } else {
    body = '<form class="fields" id="profForm" style="max-width:720px" novalidate><label>Имя<input value="' + esc(CLIENT.name) + '"></label><label>Фамилия<input value="' + esc(CLIENT.last) + '"></label>' +
      '<label class="wide">Email<input type="email" value="' + esc(CLIENT.email) + '"></label><label class="wide">Телефон' + phoneField('prof', CLIENT.co, CLIENT.ph) + '</label>' +
      '<label>Дата рождения<input type="date" value="' + CLIENT.dob + '"></label><label>Язык интерфейса<select><option>Русский</option><option>English</option><option disabled>ქართული (скоро)</option><option disabled>עברית (скоро)</option></select></label>' +
      '<div class="wide row-act" style="gap:12px"><button class="btn solid" type="submit">Сохранить</button><button class="btn" type="button" data-act="pw">Сменить пароль</button></div></form>';
  }
  v.innerHTML = '<div class="wrap pg">' + BACK + '<div class="cab-top"><div><h1>Мои бронирования</h1><p class="sub">Здравствуйте, ' + esc(CLIENT.name) + '! История ваших аренд.</p></div><button class="btn sm" type="button" data-act="logout">Выйти</button></div>' +
    '<div class="tabs2">' + tabs.map(function (t) { return '<button type="button" data-ctab="' + t[0] + '" aria-pressed="' + (C.tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' + body + '</div>';
}

/* ============================================================
   АДМИНИСТРИРОВАНИЕ
   ============================================================ */
var A = { tab: 'bookings', q: '' };
var ATABS = [['bookings', 'Бронирования'], ['calendar', 'Календарь'], ['cars', 'Автомобили'], ['clients', 'Клиенты'], ['reviews', 'Отзывы'], ['stats', 'Статистика']];
function octOverlap(b) { var a = Math.max(dt(b.from), dt('2026-10-01')), z = Math.min(dt(b.to), dt('2026-11-01')); return Math.max(0, Math.round((z - a) / 864e5)); }
function kpis() {
  var rev = BK.filter(function (b) { return b.st === 'issued' || b.st === 'returned'; }).reduce(function (s, b) { return s + bkTotal(b); }, 0);
  var booked = BK.filter(function (b) { return b.st !== 'cancelled' && b.st !== 'new'; }).reduce(function (s, b) { return s + octOverlap(b); }, 0);
  var cars = Object.keys(CARS).length;
  return { rev: rev, cnt: BK.length, act: BK.filter(function (b) { return b.st === 'issued'; }).length, util: Math.round(booked / (cars * 31) * 100), avg: BK.length ? Math.round(BK.filter(function (b) { return b.st !== 'cancelled'; }).reduce(function (s, b) { return s + bkTotal(b); }, 0) / Math.max(1, BK.filter(function (b) { return b.st !== 'cancelled'; }).length)) : 0 };
}
function kpiHtml() {
  var k = kpis();
  return '<div class="kpis"><div><small>Доход за октябрь</small><b>' + money(k.rev) + '</b><i>выданные и завершённые</i></div><div><small>Бронирования</small><b>' + k.cnt + '</b><i>всего за месяц</i></div><div><small>Активные</small><b>' + k.act + '</b><i>сейчас у клиентов</i></div><div><small>Загрузка парка</small><b>' + k.util + ' %</b><i>дни в аренде из 31</i></div></div>';
}
function renderAdmin() {
  var v = $('#adminView'), body = '';
  if (A.tab === 'bookings') {
    body = kpiHtml() + '<div class="bar-top"><span class="hint">Нажмите на карточку, чтобы открыть бронь.</span><div class="row-act"><button class="btn sm" type="button" data-act="export">Экспорт CSV</button><button class="btn sm solid" type="button" data-act="addrent">Добавить аренду</button></div></div><div class="kb">' +
      ST.map(function (s) {
        var list = BK.filter(function (b) { return b.st === s[0]; });
        return '<div class="kcol"><div class="kh"><span>' + s[1] + '</span><em>' + list.length + '</em></div>' + (list.length ? list.map(function (b) {
          var c = CARS[b.car];
          return '<button type="button" class="kcard" data-act="bk" data-id="' + b.id + '"><div class="r">' + (c.img ? '<img class="th" src="' + c.img + '" alt="">' : '<i class="th"></i>') + '<div><div class="nm">' + c.short + '</div><div class="id">' + b.id + '</div></div></div><div class="ln"><span>' + esc(b.cl) + '</span><span>' + flagS(b.co) + '</span></div><div class="ln"><span>' + fmt(b.from, b.to) + '</span><b>' + money(bkTotal(b)) + '</b></div></button>';
        }).join('') : '<div class="empty">Пусто</div>') + '</div>';
      }).join('') + '</div>';
  } else if (A.tab === 'calendar') {
    var td = 18, hd = '<div class="hd"></div>';
    for (var d = 1; d <= 31; d++) hd += '<div class="hd' + (d === td ? ' today' : '') + '">' + d + '</div>';
    var g = hd;
    Object.keys(CARS).forEach(function (id, ri) {
      var c = CARS[id], row = ri + 2;
      g += '<div class="car" style="grid-row:' + row + ';grid-column:1">' + c.short + '</div>';
      for (var d2 = 1; d2 <= 31; d2++) g += '<div style="grid-row:' + row + ';grid-column:' + (d2 + 1) + '"></div>';
      BK.filter(function (b) { return b.car === id && b.st !== 'cancelled'; }).forEach(function (b) {
        var s = Math.max(1, dt(b.from).getMonth() === 9 ? dt(b.from).getDate() : 1), e = Math.min(31, dt(b.to).getMonth() === 9 ? dt(b.to).getDate() : 31);
        g += '<div class="bar s-' + b.st + '" style="grid-row:' + row + ';grid-column:' + (s + 1) + '/' + (e + 2) + '" data-act="bk" data-id="' + b.id + '" title="' + esc(b.cl) + '">' + esc(b.cl.split(' ')[1] || b.cl) + '</div>';
      });
    });
    body = '<div class="bar-top"><span class="hint">Октябрь 2026. Сегодня 18 октября.</span></div><div class="cal"><div class="cal-g">' + g + '</div></div>' +
      '<div class="legend"><span class="l-new"><i></i>Новая заявка</span><span class="l-confirmed"><i></i>Подтверждена</span><span class="l-issued"><i></i>Выдана</span><span class="l-returned"><i></i>Возвращена</span></div>';
  } else if (A.tab === 'cars') {
    body = '<div class="bar-top"><span class="hint">Автомобили в каталоге: ' + Object.keys(CARS).length + '</span><button class="btn sm solid" type="button" data-act="addcar">Добавить автомобиль</button></div><div class="tw"><table class="tbl"><thead><tr><th>Автомобиль</th><th>Категория</th><th>Цена/сутки</th><th>От 3 суток</th><th>Залог</th><th>Статус</th><th>Действия</th></tr></thead><tbody>' +
      Object.keys(CARS).map(function (id) {
        var c = CARS[id], busy = BK.some(function (b) { return b.car === id && b.st === 'issued'; });
        return '<tr><td><div class="nmc">' + (c.img ? '<img class="th" src="' + c.img + '" alt="">' : '<i class="th"></i>') + '<span>' + c.name + '</span></div></td><td>' + c.cat + '</td><td>' + money(c.price) + '</td><td>' + money(c.long) + '</td><td>' + money(c.dep) + '</td><td>' + (c.hidden ? '<span class="tag2 dim">Скрыт</span>' : busy ? '<span class="tag2 on">Арендован</span>' : '<span class="tag2">Доступен</span>') + '</td><td><div class="row-act"><span class="lbtn" data-act="editcar" data-id="' + id + '">Изменить</span><span class="lbtn" data-act="hidecar" data-id="' + id + '">' + (c.hidden ? 'Показать' : 'Скрыть') + '</span></div></td></tr>';
      }).join('') + '</tbody></table></div>';
  } else if (A.tab === 'clients') {
    var map = {};
    BK.forEach(function (b) { var k = b.cl; if (!map[k]) map[k] = { cl: b.cl, co: b.co, phone: b.phone, email: b.email, n: 0, sum: 0 }; map[k].n++; if (b.st !== 'cancelled') map[k].sum += bkTotal(b); });
    var q = A.q.toLowerCase(), rows = Object.keys(map).map(function (k) { return map[k]; }).filter(function (c) { return !q || (c.cl + c.phone + c.email).toLowerCase().indexOf(q) >= 0; });
    body = '<div class="bar-top"><input class="sinp" id="cq" placeholder="Поиск клиента" value="' + esc(A.q) + '"><span class="hint">Клиентов: ' + rows.length + '</span></div><div class="tw"><table class="tbl"><thead><tr><th>Клиент</th><th>Страна</th><th>Телефон</th><th>Email</th><th>Бронирований</th><th>Всего потрачено</th></tr></thead><tbody>' +
      (rows.length ? rows.map(function (c) { return '<tr><td>' + esc(c.cl) + '</td><td><span class="fc2">' + flagS(c.co) + cdata(c.co).n + '</span></td><td>' + esc(c.phone) + '</td><td>' + esc(c.email) + '</td><td>' + c.n + '</td><td>' + money(c.sum) + '</td></tr>'; }).join('') : '<tr><td colspan="6" class="hint">Клиент не найден.</td></tr>') + '</tbody></table></div>';
  } else if (A.tab === 'reviews') {
    var pend = REVIEWS.filter(function (r) { return r.st === 'pending'; }).length;
    body = '<div class="bar-top"><span class="hint">Всего отзывов: ' + REVIEWS.length + ', на проверке: ' + pend + '</span></div>' + (REVIEWS.length ? REVIEWS.map(function (r) {
      return '<div class="rev"><div class="rh"><span><b style="font-weight:400">' + esc(r.cl) + '</b> · ' + CARS[r.car].short + ' · ' + fmtOne(r.date) + '</span><span class="stars">' + new Array(r.stars + 1).join('★') + new Array(6 - r.stars).join('☆') + '</span></div><p>' + esc(r.text) + '</p>' +
        '<div class="row-act"><span class="tag2' + (r.st === 'pub' ? ' on' : '') + '">' + (r.st === 'pub' ? 'Опубликован' : r.st === 'hidden' ? 'Скрыт' : 'На проверке') + '</span>' +
        (r.st !== 'pub' ? '<span class="lbtn" data-act="rpub" data-id="' + r.id + '">Опубликовать</span>' : '<span class="lbtn" data-act="rhide" data-id="' + r.id + '">Скрыть</span>') + '<span class="lbtn red" data-act="rdel" data-id="' + r.id + '">Удалить</span></div></div>';
    }).join('') : '<p class="hint">Пока нет отзывов.</p>');
  } else {
    var k = kpis(), perDay = new Array(31).fill(0);
    BK.filter(function (b) { return b.st === 'issued' || b.st === 'returned'; }).forEach(function (b) {
      var c = CARS[b.car], n = bkDays(b), rate = n >= 3 ? c.long : c.price, s = dt(b.from);
      for (var i = 0; i < n; i++) { var dd = new Date(s.getTime() + i * 864e5); if (dd.getMonth() === 9) perDay[dd.getDate() - 1] += rate; }
    });
    var mx = Math.max.apply(null, perDay.concat([1]));
    var byCar = Object.keys(CARS).map(function (id) { var l = BK.filter(function (b) { return b.car === id && b.st !== 'cancelled'; }); return { n: CARS[id].short, c: l.length, s: l.reduce(function (s, b) { return s + bkTotal(b); }, 0) }; });
    var maxC = Math.max.apply(null, byCar.map(function (x) { return x.s; }).concat([1]));
    var src = [['Telegram', 45], ['WhatsApp', 30], ['Сайт', 15], ['Звонок', 10]];
    body = kpiHtml().replace('сейчас у клиентов', 'сейчас у клиентов') + '<div class="kpis" style="margin-top:-14px"><div><small>Средний чек</small><b>' + money(k.avg) + '</b><i>без отменённых</i></div><div><small>Отменено</small><b>' + BK.filter(function (b) { return b.st === 'cancelled'; }).length + '</b><i>за месяц</i></div><div><small>Новых заявок</small><b>' + BK.filter(function (b) { return b.st === 'new'; }).length + '</b><i>ждут ответа</i></div><div><small>Средний срок</small><b>' + (BK.reduce(function (s, b) { return s + bkDays(b); }, 0) / BK.length).toFixed(1).replace('.', ',') + ' сут.</b><i>по всем броням</i></div></div>' +
      '<h3 class="ch-t">Ежедневный доход, октябрь 2026</h3><div class="chart">' + perDay.map(function (x, i) { return '<i title="' + (i + 1) + ' окт: ' + money(x) + '" style="height:' + Math.max(2, Math.round(x / mx * 100)) + '%"' + (i + 1 === 18 ? ' class="on"' : '') + '></i>'; }).join('') + '</div>' +
      '<div class="two"><div><h3 class="ch-t">Популярные автомобили</h3>' + byCar.map(function (x) { return '<div class="hb"><div class="l"><b style="font-weight:300">' + x.n + '</b><span>' + x.c + ' аренд · ' + money(x.s) + '</span></div><div class="t"><i style="width:' + Math.round(x.s / maxC * 100) + '%"></i></div></div>'; }).join('') + '</div>' +
      '<div><h3 class="ch-t">Источники заявок (пример)</h3>' + src.map(function (x) { return '<div class="hb"><div class="l"><b style="font-weight:300">' + x[0] + '</b><span>' + x[1] + ' %</span></div><div class="t"><i style="width:' + x[1] + '%"></i></div></div>'; }).join('') + '</div></div>';
  }
  v.innerHTML = '<div class="wrap pg"><div class="cab-top"><div><h1>Администрирование</h1><p class="sub">Управляйте автомобилями, бронированиями и клиентами.</p></div><div class="row-act"><a class="btn sm" href="#top">Вернуться на сайт</a><button class="btn sm" type="button" data-act="logout">Выйти</button></div></div>' +
    '<div class="tabs2">' + ATABS.map(function (t) { return '<button type="button" data-atab="' + t[0] + '" aria-pressed="' + (A.tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' + body + '</div>';
}
function flagS(c) { return flag(c); }

function bookingModal(id) {
  var b = BK.filter(function (x) { return x.id === id; })[0], c = CARS[b.car], n = bkDays(b), tot = bkTotal(b);
  var nxt = { new: ['Подтвердить бронь', 'confirmed'], confirmed: ['Выдать автомобиль', 'issued'], issued: ['Принять возврат', 'returned'] }[b.st];
  openModal('<h3>Бронь ' + b.id + '</h3><p class="sub2"><span class="tag2' + (b.st === 'issued' ? ' on' : '') + '">' + stName(b.st) + '</span></p>' +
    '<div class="dlist"><div><small>Клиент</small>' + esc(b.cl) + '</div><div><small>Страна</small><span class="fc2">' + flag(b.co) + cdata(b.co).n + '</span></div><div><small>Телефон</small>' + esc(b.phone) + '</div><div><small>Email</small>' + esc(b.email) + '</div>' +
    '<div><small>Автомобиль</small>' + c.name + '</div><div><small>Даты</small>' + fmt(b.from, b.to) + ' (' + n + ' сут.)</div><div><small>Место получения</small>' + b.place + '</div><div><small>Пакет км</small>150 км в сутки</div></div>' +
    '<div class="sumrow"><span>Аренда (' + money(n >= 3 ? c.long : c.price) + ' × ' + n + ')</span><span>' + money(tot) + '</span></div><div class="sumrow"><span>Залог</span><span>' + money(c.dep) + '</span></div><div class="sumrow t"><span>Итого при получении</span><span>' + money(tot + c.dep) + '</span></div>' +
    '<div class="mact">' + (nxt ? '<button class="btn solid" type="button" data-act="bkstep" data-id="' + b.id + '" data-to="' + nxt[1] + '">' + nxt[0] + '</button>' : '') +
    ((b.st === 'new' || b.st === 'confirmed') ? '<button class="btn" type="button" data-act="bkcancel" data-id="' + b.id + '">Отменить бронь</button>' : '') + '<button class="btn" type="button" data-act="mclose">Закрыть</button></div>');
}
function rentForm() {
  var opts = Object.keys(CARS).map(function (id) { return '<option value="' + id + '">' + CARS[id].name + '</option>'; }).join('');
  openModal('<h3>Добавить аренду</h3><p class="sub2">Ручная бронь, например по звонку. Попадёт в «Новую заявку».</p>' +
    '<form id="rentForm" class="dfields" novalidate><label>Имя клиента<input name="cl"></label><label class="w">Телефон' + phoneField('rent', 'RU', '') + '</label>' +
    '<label class="w">Автомобиль<select name="car">' + opts + '</select></label><label>Получение<input type="date" name="from" value="2026-10-26"></label><label>Возврат<input type="date" name="to" value="2026-10-29"></label>' +
    '<label class="w">Место получения<select name="place">' + PLACES.map(function (p) { return '<option>' + p + '</option>'; }).join('') + '</select></label>' +
    '<div class="w sumrow t" id="rentSum"><span>Итого</span><span>—</span></div><p class="err w" id="rentErr"></p><div class="w mact" style="margin-top:0"><button class="btn solid" type="submit">Добавить</button><button class="btn" type="button" data-act="mclose">Отмена</button></div></form>');
  updRent();
}
function updRent() {
  var f = $('#rentForm'); if (!f) return;
  var n = ndays(f.from.value, f.to.value), c = CARS[f.car.value];
  $('#rentSum').innerHTML = '<span>Итого' + (n > 0 ? ' (' + n + ' сут.)' : '') + '</span><span>' + (n > 0 ? money(calc(c, n)) : '—') + '</span>';
}
function carForm(id) {
  var c = id ? CARS[id] : { name: '', cat: 'Внедорожник', price: '', long: '', dep: '' };
  openModal('<h3>' + (id ? 'Изменить автомобиль' : 'Добавить автомобиль') + '</h3><p class="sub2">Карточка появится в каталоге.</p><form id="carForm" class="dfields" data-id="' + (id || '') + '" novalidate>' +
    '<label class="w">Название (марка и модель)<input name="name" value="' + esc(c.name) + '"></label><label>Категория<select name="cat">' + ['Внедорожник', 'Седан', 'Спорткупе', 'Минивэн', 'Бизнес'].map(function (x) { return '<option' + (x === c.cat ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label><label>Год<input name="year" value="2024"></label>' +
    '<label>Цена за сутки, $<input name="price" inputmode="numeric" value="' + c.price + '"></label><label>Цена от 3 суток, $<input name="long" inputmode="numeric" value="' + c.long + '"></label><label>Залог, $<input name="dep" inputmode="numeric" value="' + c.dep + '"></label><label>Мощность, л.с.<input name="hp"></label>' +
    '<label>Коробка<select><option>Автомат</option><option>Механика</option></select></label><label>Мест<input name="seats" inputmode="numeric" value="5"></label>' +
    '<p class="err w" id="carErr"></p><div class="w mact" style="margin-top:0"><button class="btn solid" type="submit">Сохранить</button><button class="btn" type="button" data-act="mclose">Отмена</button></div></form>');
}
function reviewForm(id) {
  openModal('<h3>Оставить отзыв</h3><p class="sub2">Расскажите, как прошла аренда. Отзыв появится после проверки.</p><div class="star-in" id="stars">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" data-star="' + i + '" class="on" aria-label="' + i + '">★</button>'; }).join('') + '</div>' +
    '<textarea id="rtext" placeholder="Ваш отзыв"></textarea><p class="err" id="rerr"></p><div class="mact" style="margin-top:6px"><button class="btn solid" type="button" data-act="rsend" data-id="' + id + '">Отправить</button><button class="btn" type="button" data-act="mclose">Отмена</button></div>');
  window._stars = 5;
}

/* ---------- события ---------- */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-act],[data-atab],[data-ctab],[data-star],#resend,#resendLogin,#editMail,#openMail,#confirmMail');
  if (!t) return;
  if (t.id === 'openMail') { mailPreview(); return; }
  if (t.id === 'editMail') { REG.state = 'form'; clearInterval(cdTimer); renderRegister(); return; }
  if (t.id === 'resend') {
    if (apiBase()) { api('/api/auth/resend', { email: REG.email }).then(function (j) { toast(j.ok ? 'Письмо отправлено ещё раз. Проверьте и папку «Спам»' : 'Не удалось отправить письмо'); }); startCountdown(); return; }
    toast('Письмо отправлено ещё раз. Проверьте и папку «Спам»'); startCountdown(); return;
  }
  if (t.id === 'resendLogin') { api('/api/auth/resend', { email: LOGIN_UNVERIFIED }).then(function (j) { toast(j.ok ? 'Письмо отправлено. Проверьте и папку «Спам»' : 'Не удалось отправить письмо'); }); return; }
  if (t.id === 'confirmMail') { closeModal(); REG.state = 'form'; clearInterval(cdTimer); LOGIN_MSG = 'Email подтверждён. Теперь можно войти в личный кабинет.'; location.hash = '#/login'; return; }
  if (t.dataset.atab) { A.tab = t.dataset.atab; renderAdmin(); return; }
  if (t.dataset.ctab) { C.tab = t.dataset.ctab; renderCabinet(); return; }
  if (t.dataset.star) { window._stars = +t.dataset.star; $$('#stars button').forEach(function (b) { b.classList.toggle('on', +b.dataset.star <= window._stars); }); return; }
  var a = t.dataset.act, id = t.dataset.id;
  if (a === 'mclose') closeModal();
  else if (a === 'bk') bookingModal(id);
  else if (a === 'bkstep') { var b = BK.filter(function (x) { return x.id === id; })[0]; b.st = t.dataset.to; closeModal(); renderAdmin(); toast('Статус: ' + stName(b.st)); }
  else if (a === 'bkcancel') { if (confirm('Отменить бронь ' + id + '?')) { BK.filter(function (x) { return x.id === id; })[0].st = 'cancelled'; closeModal(); renderAdmin(); toast('Бронь отменена'); } }
  else if (a === 'addrent') rentForm();
  else if (a === 'export') toast('Файл bookings.csv сформирован (пример)');
  else if (a === 'addcar') carForm('');
  else if (a === 'editcar') carForm(id);
  else if (a === 'hidecar') { CARS[id].hidden = !CARS[id].hidden; renderAdmin(); toast(CARS[id].hidden ? 'Автомобиль скрыт из каталога' : 'Автомобиль показан в каталоге'); }
  else if (a === 'rpub') { REVIEWS.filter(function (r) { return r.id == id; })[0].st = 'pub'; renderAdmin(); toast('Отзыв опубликован'); }
  else if (a === 'rhide') { REVIEWS.filter(function (r) { return r.id == id; })[0].st = 'hidden'; renderAdmin(); toast('Отзыв скрыт'); }
  else if (a === 'rdel') { if (confirm('Удалить отзыв?')) { REVIEWS = REVIEWS.filter(function (r) { return r.id != id; }); renderAdmin(); toast('Отзыв удалён'); } }
  else if (a === 'logout') { if (apiBase()) api('/api/auth/logout'); toast('Вы вышли из аккаунта'); location.hash = '#/login'; }
  else if (a === 'cmore') { C.open = C.open === id ? null : id; renderCabinet(); }
  else if (a === 'ccancel') { if (confirm('Отменить бронь ' + id + '? Бесплатная отмена возможна за 48 часов до получения.')) { CB.filter(function (b) { return b.id === id; })[0].st = 'cancelled'; renderCabinet(); toast('Бронь отменена'); } }
  else if (a === 'creview') reviewForm(id);
  else if (a === 'rsend') { var txt = $('#rtext').value.trim(); if (txt.length < 5) { $('#rerr').textContent = 'Напишите хотя бы пару слов'; return; } CB.filter(function (b) { return b.id === id; })[0].reviewed = true; closeModal(); renderCabinet(); toast('Спасибо! Отзыв отправлен на проверку'); }
  else if (a === 'unfav') { FAVS = FAVS.filter(function (x) { return x !== id; }); renderCabinet(); toast('Убрано из избранного'); }
  else if (a === 'pw') openModal('<h3>Сменить пароль</h3><p class="sub2">Введите текущий и новый пароль.</p><div class="dfields"><label class="w">Текущий пароль<input type="password"></label><label>Новый пароль<input type="password"></label><label>Повторите<input type="password"></label></div><div class="mact"><button class="btn solid" type="button" data-act="pwsave">Сохранить</button><button class="btn" type="button" data-act="mclose">Отмена</button></div>');
  else if (a === 'pwsave') { closeModal(); toast('Пароль изменён'); }
});
document.addEventListener('input', function (e) {
  if (e.target.id === 'cq') { A.q = e.target.value; var pos = e.target.selectionStart; renderAdmin(); var n = $('#cq'); n.focus(); n.setSelectionRange(pos, pos); }
  if (e.target.closest && e.target.closest('#rentForm')) updRent();
});
document.addEventListener('change', function (e) { if (e.target.closest && e.target.closest('#rentForm')) updRent(); });
document.addEventListener('submit', function (e) {
  var f = e.target;
  if (f.id === 'regForm') {
    e.preventDefault();
    var ph = phoneValue('reg', f), v = { name: f.name.value.trim(), last: f.last.value.trim(), email: f.email.value.trim(), dob: f.dob.value };
    REG.name = v.name; REG.last = v.last; REG.email = v.email; REG.dob = v.dob; REG.co = $('[data-phone="reg"]', f).dataset.c; REG.ph = $('[data-phone="reg"] input', f).value;
    var err = !v.name ? 'Укажите имя' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? 'Проверьте email: он нужен для подтверждения' : ph.digits.length < 6 ? 'Укажите номер телефона' : f.pw.value.length < 8 ? 'Пароль должен быть не короче 8 символов' : f.pw.value !== f.pw2.value ? 'Пароли не совпадают' : !f.agree.checked ? 'Подтвердите согласие с условиями' : '';
    if (err) { $('#regErr').textContent = err; return; }
    if (apiBase()) {
      var sb = $('button[type=submit]', f); sb.disabled = true;
      api('/api/auth/register', { name: v.name, last: v.last, email: v.email, phone: ph.full, dob: v.dob, password: f.pw.value, agree: true, lang: 'ru' })
        .then(function (j) {
          sb.disabled = false;
          if (j.ok) { REG.state = 'sent'; renderRegister(); window.scrollTo(0, 0); return; }
          var e = $('#regErr'); if (!e) return;
          if (j.errors) e.textContent = j.errors[Object.keys(j.errors)[0]];
          else if (j.error === 'mail_failed') e.textContent = 'Не удалось отправить письмо. Попробуйте позже или напишите нам.';
          else if (j.error === 'too_many_requests' || j.status === 429) e.textContent = 'Слишком много попыток. Подождите немного и повторите.';
          else e.textContent = 'Не удалось зарегистрироваться. Попробуйте позже.';
        })
        .catch(function () { sb.disabled = false; var e = $('#regErr'); if (e) e.textContent = 'Нет связи с сервером. Попробуйте позже.'; });
      return;
    }
    REG.state = 'sent'; renderRegister(); window.scrollTo(0, 0);
  } else if (f.id === 'loginForm') {
    e.preventDefault();
    var lg = f.login.value.trim().toLowerCase();
    if (!lg || !f.pw.value) { $('#loginErr').textContent = 'Введите email или телефон и пароль'; return; }
    if (apiBase()) {
      var lb = $('button[type=submit]', f); lb.disabled = true;
      api('/api/auth/login', { login: f.login.value.trim(), password: f.pw.value }).then(function (j) {
        lb.disabled = false;
        var e = $('#loginErr');
        if (j.ok) {
          if (j.user) { CLIENT.name = j.user.name || CLIENT.name; CLIENT.last = j.user.last || ''; CLIENT.email = j.user.email || CLIENT.email; }
          location.hash = j.role === 'admin' ? '#/admin' : '#/cabinet'; return;
        }
        if (!e) return;
        if (j.error === 'not_verified') { LOGIN_UNVERIFIED = j.email || ''; e.innerHTML = 'Email не подтверждён. Откройте письмо и проверьте папку «Спам». <span class="lnk" id="resendLogin">Отправить письмо ещё раз</span>'; }
        else if (j.error === 'invalid_credentials') e.textContent = 'Неверный логин или пароль';
        else if (j.error === 'too_many_requests' || j.status === 429) e.textContent = 'Слишком много попыток. Подождите немного и повторите.';
        else e.textContent = 'Не удалось войти. Попробуйте позже.';
      }).catch(function () { lb.disabled = false; var e = $('#loginErr'); if (e) e.textContent = 'Нет связи с сервером. Попробуйте позже.'; });
      return;
    }
    location.hash = lg === 'admin' ? '#/admin' : '#/cabinet';
  } else if (f.id === 'profForm') { e.preventDefault(); toast('Профиль сохранён'); }
  else if (f.id === 'rentForm') {
    e.preventDefault();
    var n = ndays(f.from.value, f.to.value), ph2 = phoneValue('rent', f);
    if (!f.cl.value.trim()) { $('#rentErr').textContent = 'Укажите имя клиента'; return; }
    if (ph2.digits.length < 6) { $('#rentErr').textContent = 'Укажите телефон'; return; }
    if (!(n > 0)) { $('#rentErr').textContent = 'Дата возврата должна быть позже даты получения'; return; }
    var num = 1042 + BK.length - 6;
    BK.unshift({ id: 'B-' + num, cl: f.cl.value.trim(), co: $('[data-phone="rent"]', f).dataset.c, phone: ph2.full, email: '—', car: f.car.value, from: f.from.value, to: f.to.value, place: f.place.value, st: 'new' });
    closeModal(); A.tab = 'bookings'; renderAdmin(); toast('Аренда добавлена в «Новые заявки»');
  } else if (f.id === 'carForm') {
    e.preventDefault();
    var nm = f.name.value.trim(), pr = +f.price.value, lg2 = +f.long.value, dp = +f.dep.value;
    if (!nm || !(pr > 0) || !(dp >= 0) || !(lg2 > 0)) { $('#carErr').textContent = 'Заполните название, цены и залог'; return; }
    var cid = f.dataset.id;
    if (cid) { Object.assign(CARS[cid], { name: nm, short: nm.split(' ').slice(-2).join(' '), cat: f.cat.value, price: pr, long: lg2, dep: dp }); }
    else { carSeq++; CARS['c' + carSeq] = { name: nm, short: nm, cat: f.cat.value, img: '', price: pr, long: lg2, dep: dp, hidden: false }; }
    closeModal(); renderAdmin(); toast(cid ? 'Изменения сохранены' : 'Автомобиль добавлен');
  }
});

/* ---------- маршруты ---------- */
function onRoute() {
  var parts = location.hash.split('/'), page = parts[1], sub = parts[2];
  if (page === 'register') {
    if (sub === 'sent') { REG.email = REG.email || 'name@example.com'; REG.name = REG.name || 'Лея'; REG.state = 'sent'; }
    else { REG.state = 'form'; clearInterval(cdTimer); }
    renderRegister();
  } else if (page === 'login') {
    if (sub === 'confirmed') LOGIN_MSG = 'Email подтверждён. Теперь можно войти в личный кабинет.';
    if (sub === 'expired') LOGIN_ERR = 'Ссылка устарела или уже использована. Войдите: если email не подтверждён, мы предложим отправить письмо ещё раз.';
    renderLogin();
  }
  else if (page === 'cabinet') { if (['bookings', 'favs', 'profile'].indexOf(sub) >= 0) C.tab = sub; renderCabinet(); }
  else if (page === 'admin') { if (ATABS.some(function (t) { return t[0] === sub; })) A.tab = sub; renderAdmin(); }
}
window.addEventListener('hashchange', onRoute);
renderRegister(); renderLogin(); renderCabinet(); renderAdmin();
onRoute();
})();
