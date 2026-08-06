const washServices = [
  ["01", "Мойка кузова", "Эконом, стандарт или комплекс — от быстрой очистки до полного ухода с сушкой, воском и уборкой салона.", "Эконом · Стандарт · Комплекс"],
  ["02", "Уход за салоном", "Пылесос салона и багажника, глубокая химчистка текстиля, пластика и потолка, деликатный уход за кожей.", "Пылесос · Химчистка · Кожа"],
  ["03", "Защита кузова", "Жидкий и твёрдый воск, защитная и абразивная полировка, жидкое стекло и чернение резины.", "Воск · Полировка · Жидкое стекло"],
  ["04", "Глубокая очистка", "Удаление битума, солей, насекомых и металлических вкраплений. Очистка дисков, двигателя и днища.", "Кузов · Диски · Двигатель"],
];

const tireServices = [
  ["01", "Сезонная смена", "Снятие и установка колёс, монтаж и демонтаж шин, точная балансировка для легковых автомобилей и SUV.", "R13–R22 · Седан · Кроссовер"],
  ["02", "Ремонт шин", "Проколы, камеры и боковые порезы: ремонт заплаткой или жгутом, холодная и горячая вулканизация.", "Проколы · Порезы · Камеры"],
  ["03", "Работы с дисками", "Восстановление геометрии, реставрация и покраска дисков. Проверим состояние перед началом работ.", "Правка · Реставрация · Покраска"],
  ["04", "Дополнительно", "Шиповка зимних шин, сезонное хранение, развал-схождение и экологичная утилизация старых шин.", "Хранение · Шиповка · Утилизация"],
];

const faqItems = [
  ["Нужно ли записываться заранее?", "Запись поможет принять автомобиль без ожидания. Если вы рядом, можно приехать без записи — свободное место подтвердим на месте."],
  ["Сколько автомобилей принимаете одновременно?", "До пяти автомобилей. На одной площадке можно совместить мойку и работы с колёсами."],
  ["Где подождать автомобиль?", "Для клиентов предусмотрен зал ожидания. Мы сообщим, когда автомобиль будет готов."],
  ["Когда появятся точные цены?", "Прайс-листы автомойки и шиномонтажа готовятся. До публикации стоимость уточняем после выбора услуги и типа автомобиля."],
];

function renderServices(items, activeIndex) {
  document.querySelectorAll(".service-tabs button").forEach((button, index) => {
    button.classList.toggle("active", index === activeIndex);
    button.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
  });
  document.querySelector(".service-grid").innerHTML = items.map((item) => `
    <article class="service-card">
      <div class="card-top"><span>${item[0]}</span><i>↗</i></div>
      <h3>${item[1]}</h3><p>${item[2]}</p><div class="card-meta">${item[3]}</div>
    </article>`).join("");
}

function renderFaq(openIndex = 0) {
  document.querySelector(".faq-list").innerHTML = faqItems.map((item, index) => `
    <button type="button" aria-expanded="${index === openIndex}">
      <span class="faq-no">0${index + 1}</span><strong>${item[0]}</strong><i>${index === openIndex ? "−" : "+"}</i>
      ${index === openIndex ? `<p>${item[1]}</p>` : ""}
    </button>`).join("");
  document.querySelectorAll(".faq-list button").forEach((button, index) => {
    button.addEventListener("click", () => renderFaq(button.getAttribute("aria-expanded") === "true" ? -1 : index));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".service-tabs button");
  tabs[0]?.addEventListener("click", () => renderServices(washServices, 0));
  tabs[1]?.addEventListener("click", () => renderServices(tireServices, 1));
  renderServices(washServices, 0);
  renderFaq(0);

  const form = document.querySelector(".booking form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector(".booking-intro h2").innerHTML = "Спасибо.<br><em>Заявка готова.</em>";
    document.querySelector(".booking-intro p").textContent = "Это демонстрация формы. Для рабочего сайта можно подключить отправку заявок на телефон, почту или в CRM.";
    form.outerHTML = '<div class="success-panel"><span>✓</span><h3>Форма работает</h3><p>Подключите нужный канал приёма заявок — и обращения будут приходить автоматически.</p></div>';
  });
});
