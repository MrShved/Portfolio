/**
 * ========================= ИНСТРУКЦИЯ ПО ДОБАВЛЕНИЮ МЕТОДА =========================
 *                         используйте ТОЛЬКО значения из левого столбца
 *
 * ┌─────────────┬────────────────────────────────────────────────────────────────┐
 * │    ПОЛЕ     │                     ДОПУСТИМЫЕ ЗНАЧЕНИЯ                        │
 * ├─────────────┼────────────────────────────────────────────────────────────────┤
 * │    type     │ QUALITATIVE    │ QUANTITATIVE   │ MIXED                        │
 * │             │ Качественный   │ Количественный │ Смешанный                    │
 * ├─────────────┼────────────────────────────────────────────────────────────────┤
 * │    stage    │ DISCOVERY      │ VALIDATION     │ POSTLAUNCH    │ DEBUG        │
 * │             │ Идея           │ Прототип       │ Работает      │ Проблемы     │
 * ├─────────────┼────────────────────────────────────────────────────────────────┤
 * │    goal     │ EXPLORE        │ EVALUATE       │ COMPARE       │ OBSERVE      │
 * │             │ Понять боли    │ Оценить        │ Сравнить      │ Наблюдать    │
 * │             ├────────────────┼────────────────┴───────────────┴──────────────┤
 * │             │ SEGMENT        │ DEBUG                                         │
 * │             │ Изучить        │ Найти причину                                 │
 * ├─────────────┼────────────────┼───────────────┬───────────────┬───────────────┤
 * │   access    │ OWN            │ PANEL         │ HARD          │ INTERNAL      │
 * │             │ Свои           │ Платная       │ Сложно        │ Команда       │
 * ├─────────────┼────────────────┼───────────────┼───────────────┼───────────────┤
 * │   budget    │ ZERO           │ LOW           │ MID           │ HIGH          │
 * │             │ Бесплатно      │ до 10k ₽      │ до 50k ₽      │ >50k ₽        │
 * ├─────────────┼────────────────┼───────────────┼───────────────┴───────────────┤
 * │ complexity  │ LOW            │ MEDIUM        │ HIGH                          │
 * │             │ Низкая         │ Средняя       │ Высокая                       │
 * ├─────────────┼────────────────┼───────────────┼───────────────────────────────┤
 * │ popularity  │ OFTEN          │ SOMETIMES     │ RARELY                        │
 * │             │ Часто          │ Иногда        │ Редко                         │
 * └─────────────┴────────────────┴───────────────┴───────────────────────────────┘
 *
 * minDays, maxDays — целые числа (дни)
 * ================================================================================
 */

const methods = [
  {
    "id": "usability-testing",
    "russianTitle": "Юзабилити-тестирование",
    "title": "Usability Testing",
    "type": "MIXED",
    "stage": ["VALIDATION", "POSTLAUNCH"],
    "goal": ["EVALUATE", "DEBUG"],
    "minDays": 3,
    "maxDays": 14,
    "access": ["OWN", "PANEL"],
    "budget": ["LOW", "MID"],
    "shortDescription": "Наблюдение за тем, как пользователи выполняют задачи в интерфейсе, чтобы найти барьеры и точки трения",
    "complexity": "MEDIUM",
    "popularity": "OFTEN",
    "filename": "usability-testing.md",
    "filepath": "src/ux-compass/data/research/articles/methods/usability-testing.md",
    "echelon": 1
  },
  {
    "id": "depth-interviews",
    "russianTitle": "Глубинные интервью",
    "title": "In-depth Interviews",
    "type": "QUALITATIVE",
    "stage": ["DISCOVERY", "VALIDATION"],
    "goal": ["EXPLORE"],
    "minDays": 5,
    "maxDays": 14,
    "access": ["OWN", "PANEL"],
    "budget": ["LOW", "MID"],
    "shortDescription": "Структурированная беседа с пользователем для понимания его мотивов, болей и контекста использования продукта",
    "complexity": "MEDIUM",
    "popularity": "OFTEN",
    "filename": "depth-interviews.md",
    "filepath": "src/ux-compass/data/research/articles/methods/depth-interviews.md",
    "echelon": 1
  },
  {
    "id": "survey",
    "russianTitle": "Опросы и анкетирование",
    "title": "Surveys",
    "type": "QUANTITATIVE",
    "stage": ["DISCOVERY", "VALIDATION", "POSTLAUNCH"],
    "goal": ["EXPLORE", "SEGMENT", "EVALUATE"],
    "minDays": 3,
    "maxDays": 10,
    "access": ["OWN", "PANEL", "HARD"],
    "budget": ["ZERO", "LOW"],
    "shortDescription": "Массовый сбор структурированных ответов для статистического анализа пользовательских предпочтений и поведения",
    "complexity": "LOW",
    "popularity": "OFTEN",
    "filename": "survey.md",
    "filepath": "src/ux-compass/data/research/articles/methods/survey.md",
    "echelon": 1
  },
  {
    "id": "analytics",
    "russianTitle": "Анализ продуктовой аналитики",
    "title": "Analytics / Clickstream",
    "type": "QUANTITATIVE",
    "stage": ["POSTLAUNCH", "DEBUG"],
    "goal": ["OBSERVE", "DEBUG"],
    "minDays": 1,
    "maxDays": 5,
    "access": ["INTERNAL"],
    "budget": ["ZERO", "LOW"],
    "shortDescription": "Изучение цифровых следов пользователей: пути, клики, отказы, воронки конверсии",
    "complexity": "LOW",
    "popularity": "OFTEN",
    "filename": "analytics.md",
    "filepath": "src/ux-compass/data/research/articles/methods/analytics.md",
    "echelon": 2
  },
  {
    "id": "ab-testing",
    "russianTitle": "A/B-тестирование",
    "title": "A/B Testing",
    "type": "QUANTITATIVE",
    "stage": ["POSTLAUNCH"],
    "goal": ["COMPARE"],
    "minDays": 7,
    "maxDays": 30,
    "access": ["OWN"],
    "budget": ["MID", "HIGH"],
    "shortDescription": "Сравнение двух версий интерфейса на живом трафике для выбора варианта с лучшей конверсией",
    "complexity": "HIGH",
    "popularity": "SOMETIMES",
    "filename": "ab-testing.md",
    "filepath": "src/ux-compass/data/research/articles/methods/ab-testing.md",
    "echelon": 2
  },
  {
    "id": "card-sorting",
    "russianTitle": "Карточная сортировка",
    "title": "Card Sorting",
    "type": "QUALITATIVE",
    "stage": ["DISCOVERY", "VALIDATION"],
    "goal": ["EXPLORE"],
    "minDays": 3,
    "maxDays": 7,
    "access": ["OWN", "PANEL"],
    "budget": ["LOW"],
    "shortDescription": "Метод для понимания ментальных моделей пользователей: как они группируют и категоризируют информацию",
    "complexity": "LOW",
    "popularity": "SOMETIMES",
    "filename": "card-sorting.md",
    "filepath": "src/ux-compass/data/research/articles/methods/card-sorting.md",
    "echelon": 1
  },
  {
    "id": "expert-review",
    "russianTitle": "Экспертная оценка",
    "title": "Heuristic Evaluation",
    "type": "QUALITATIVE",
    "stage": ["VALIDATION", "POSTLAUNCH"],
    "goal": ["EVALUATE"],
    "minDays": 2,
    "maxDays": 5,
    "access": ["INTERNAL"],
    "budget": ["ZERO", "LOW"],
    "shortDescription": "Аудит интерфейса экспертом по чек-листу юзабилити-эвристик без привлечения пользователей",
    "complexity": "LOW",
    "popularity": "OFTEN",
    "filename": "expert-review.md",
    "filepath": "src/ux-compass/data/research/articles/methods/expert-review.md",
    "echelon": 1
  },
  {
    "id": "cjm",
    "russianTitle": "CJM",
    "title": "Customer Journey Map",
    "type": "MIXED",
    "stage": ["DISCOVERY", "VALIDATION"],
    "goal": ["EXPLORE", "SEGMENT"],
    "minDays": 5,
    "maxDays": 14,
    "access": ["OWN", "INTERNAL"],
    "budget": ["LOW", "MID"],
    "shortDescription": "Визуализация пути пользователя от первого контакта до цели с фиксацией барьеров и эмоций",
    "complexity": "MEDIUM",
    "popularity": "OFTEN",
    "filename": "cjm.md",
    "filepath": "src/ux-compass/data/research/articles/methods/cjm.md",
    "echelon": 1
  },
  {
    "id": "field-studies",
    "russianTitle": "Контекстные исследования",
    "title": "Field Studies",
    "type": "QUALITATIVE",
    "stage": ["DISCOVERY"],
    "goal": ["EXPLORE", "OBSERVE"],
    "minDays": 7,
    "maxDays": 21,
    "access": ["OWN", "HARD"],
    "budget": ["MID", "HIGH"],
    "shortDescription": "Наблюдение за пользователями в их естественной среде для понимания реального контекста использования продукта",
    "complexity": "HIGH",
    "popularity": "SOMETIMES",
    "filename": "field-studies.md",
    "filepath": "src/ux-compass/data/research/articles/methods/field-studies.md",
    "echelon": 2
  },
  {
    "id": "guerrilla-testing",
    "russianTitle": "Партизанские исследования",
    "title": "Guerrilla Testing",
    "type": "QUALITATIVE",
    "stage": ["VALIDATION"],
    "goal": ["EVALUATE"],
    "minDays": 1,
    "maxDays": 3,
    "access": ["HARD"],
    "budget": ["ZERO"],
    "shortDescription": "Быстрое тестирование прототипа на случайных людях в публичных местах для поиска грубых ошибок",
    "complexity": "LOW",
    "popularity": "RARELY",
    "filename": "guerrilla-testing.md",
    "filepath": "src/ux-compass/data/research/articles/methods/guerrilla-testing.md",
    "echelon": 1
  }
]

export default methods;
