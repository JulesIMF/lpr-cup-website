# Сайт Кубка ЛФИ
## Проблема
В следующем году будет проводиться юбилейный Пятый Кубок ЛФИ. Кубок ЛФИ представлят из себя удалённую олимпиаду по физике, в которой задание выдаётся на одну неделю, посылки этого задания можно делать неоднократно, получая обратную связь, в течение недели появляется две подсказки, а так же в середине задания имеется возможность переключиться на более простую задачу, которая оценивается меньше. 

Из-за того, что система оценивания этой олипиады очень сложная по сравнению с традиционными олимпиадами (она расписана на нескольких страницах, например, [здесь](https://lpr-olimp.ru/storage/editor/rules.pdf)), предыдущие 4 Сезона приходилось либо использовать Google Classroom и считать все баллы вручную, либо использовать Google Classroom и автоматизировать проверку через Google Таблицы и ботов в Telegram. 

Ни один из этих подходов не представляется в полной мере удобным:

* Проверка и выставление баллов происходит сразу в нескольких сервисах, что приводит к ошибкам при проверке
* Google Classroom часто начинает сильно тормозить даже в ситуациях, когда ничего не предвещает беды
* Даже с автоматизацией через таблицы трудно отслеживать, какие пункты были исправлены в какую из посылок, какие решены неверно, а какие просто не сданы
* Трудно отслеживать зарегистрированных участников, если они используют в Google Classroom одни данные, а при регистрации через Google Формы вводили другие
* Необходимо связывать между собой несколько сервисов и, в том числе, регулярно делать запросы к Google Таблицам, которые по понятным причинам выполняются сильно дольше, чем выполнялись бы запросы к локальной базе данных

## Решение
Гораздо лучше предоставить единый сервис (сайт Кубка), на котором будет происходить и сдача задач, и проверка. Предполагается, что будет два типа аккаунтов --- аккаунты Участников и аккаунты Жюри. Участники регистрируются на Кубок просто через сайт, указывая в т.ч. свою личную информацию (ФИО, страну и регион, школу, фактический класс и классы, за которые пишется олимпиада и т.д), а аккаунты Жюри создаются централизованно через некоторую панель управления. 

Участники сдают на сайте задачи, прикрепляя PDF или серию изображений, а Жюри получают эти решения и выставляют баллы. Для Участников и Жюри в каждой задаче доступна детальная история посылок, изменения коэффициентов в каждом пункте задачи и другая детализированная информация по проверке. Интерфейс для проверяющих позволяет выбирать при проверке посылки только отправленные задачи, что устраняет путанницу при отделении решенных неверно и просто не отправленных подпунктов, а также избавляет от необходимости писать комментарии по каждому из пунктов.

Так как олимпиада проводится на двух языках (русском и английском), сайт должен быть переведён в полной мере по крайней мере на эти два языка.
