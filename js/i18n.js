/**
 * Internationalization (i18n) Module
 * Supports Russian (ru) and English (en)
 */

const translations = {
    ru: {
        // Loader
        loader_text: 'Загрузка анализатора...',

        // Header
        nav_analyzer: 'Анализатор',
        nav_how_it_works: 'Как работает',
        nav_criteria: 'Критерии',
        nav_faq: 'FAQ',
        nav_cta: 'Начать анализ',

        // Hero
        hero_badge: 'Профессиональный инструмент анализа',
        hero_title_1: 'Сравните сметы',
        hero_title_2: 'каркасных домов',
        hero_title_3: 'за 2 минуты',
        hero_subtitle: 'Загрузите сметы от конкурента и наше предложение — получите детальный анализ по 10 критериям: от стоимости до энергоэффективности',
        hero_btn_upload: 'Загрузить сметы',
        hero_btn_how: 'Как это работает',
        hero_stat_criteria: 'Критериев сравнения',
        hero_stat_formats: 'Форматы файлов',
        hero_stat_free: 'Бесплатных анализов',

        // Hero cards
        hero_card_competitor: 'Смета конкурента',
        hero_card_our: 'Наше предложение',
        hero_card_cost: 'Стоимость',
        hero_card_energy: 'Энергоэффективность',

        // Analyzer
        analyzer_label: 'Инструмент',
        analyzer_title: 'Анализатор смет',
        analyzer_desc: 'Загрузите файлы или введите данные вручную для детального сравнения',
        tab_upload: 'Загрузить файлы',
        tab_manual: 'Ввести вручную',

        // Upload zone
        upload_competitor_title: 'Смета конкурента',
        upload_our_title: 'Наше предложение',
        upload_desc: 'Перетащите файл или нажмите для выбора',
        upload_formats: 'PDF, Excel, CSV до 10MB',

        // Form sections
        section_readiness: 'Стадия готовности',
        section_construction: 'Конструкция',
        section_thermal: 'Физика стены и тепло',
        section_completeness: 'Комплектность коробки',
        section_foundation: 'Фундамент',
        section_installation: 'Монтаж и сроки',
        section_logistics: 'Логистика',

        // Form labels
        form_price: 'Общая стоимость',
        form_area: 'Площадь (м²)',
        form_floors: 'Этажность',
        form_roof_type: 'Тип крыши',
        form_structure_type: 'Тип несущей системы',
        form_delivery: 'Стоимость доставки',
        form_delivery_method: 'Способ доставки',
        form_weight: 'Вес конструкции (кг)',
        form_thickness: 'Толщина стен (мм)',
        form_insulation_type: 'Тип утепления',
        form_insulation_thickness: 'Толщина утеплителя (мм)',
        form_energy: 'Класс энергоэффективности',
        form_vapor_barrier: 'Пароизоляция',
        form_wind_barrier: 'Ветрозащита',
        form_full_insulation: 'Утепление по всему контуру',
        form_factory_prep: 'Заводская подготовка элементов',
        form_foundation_type: 'Тип фундамента',
        form_foundation_insulation: 'Утепление фундамента',
        form_waterproofing: 'Гидроизоляция',
        form_installation_time: 'Срок монтажа (дней)',
        form_region: 'Регион строительства',
        form_complexity: 'Сложность монтажа',
        form_weather_dependent: 'Зависит от погоды',
        form_crane_needed: 'Требуется кран',
        form_impregnation: 'Пропитка древесины',
        form_eco: 'Экологичные материалы',
        form_fire_protection: 'Огнезащитная обработка',

        // Select placeholders
        select_placeholder: 'Выберите',

        // Roof types
        roof_gable: 'Двускатная',
        roof_hip: 'Вальмовая',
        roof_flat: 'Плоская',
        roof_mansard: 'Мансардная',

        // Structure types
        structure_prefab: 'Префаб (заводские панели)',
        structure_frame: 'Каркас',
        structure_brick: 'Кирпичная кладка',
        structure_aerated: 'Газоблок',
        structure_concrete: 'Железобетон (ЖБ)',
        structure_clt: 'CLT-панели',

        // Insulation types
        insulation_mineral: 'Минеральная вата',
        insulation_basalt: 'Базальтовая вата',
        insulation_eps: 'Пенополистирол (EPS)',
        insulation_xps: 'Экструдированный (XPS)',
        insulation_pir: 'PIR/PUR',
        insulation_eco: 'Эковата',

        // Foundation types
        foundation_slab: 'Монолитная плита',
        foundation_strip: 'Ленточный',
        foundation_pile: 'Свайный',
        foundation_screw: 'Винтовые сваи',
        foundation_basement: 'С подвалом',

        // Delivery methods
        delivery_truck: 'Фура',
        delivery_container: 'Контейнер',
        delivery_trawl: 'Трал',

        // Energy classes
        energy_select: 'Выберите класс',
        energy_max: 'максимальный',
        energy_min: 'минимальный',

        // Regions
        region_select: 'Выберите регион',
        region_central: 'Центральный',
        region_north: 'Северный',
        region_south: 'Южный',
        region_ural: 'Урал',
        region_siberia: 'Сибирь',
        region_far_east: 'Дальний Восток',

        // Complexity
        complexity_select: 'Выберите',
        complexity_easy: 'Лёгкий (своими руками)',
        complexity_medium: 'Средний (бригада 2-3 чел)',
        complexity_hard: 'Сложный (спецтехника)',

        // Buttons
        btn_analyze: 'Провести анализ',
        btn_demo: 'Загрузить демо-данные',
        btn_download_pdf: 'Скачать PDF отчёт',
        btn_new_analysis: 'Новый анализ',

        // Results
        results_label: 'Результаты',
        results_title: 'Сравнительный анализ',
        winner_title: 'Лучшее предложение:',
        winner_our: 'Наше предложение',
        winner_competitor: 'Предложение конкурента',
        winner_score_label: 'из 10',
        summary_savings: 'Экономия',
        summary_time: 'Быстрее монтаж',
        summary_energy: 'Энергоэффективность',
        chart_radar: 'Радар показателей',
        chart_cost: 'Сравнение стоимости',
        table_title: 'Детальное сравнение',
        table_criteria: 'Критерий',
        table_competitor: 'Конкурент',
        table_our: 'Наше предложение',
        table_diff: 'Разница',
        table_winner: 'Победитель',
        recommendations_title: 'Рекомендации',

        // Table rows
        row_price: 'Общая стоимость',
        row_delivery: 'Стоимость доставки',
        row_weight: 'Вес конструкции',
        row_thickness: 'Толщина стен',
        row_insulation_thickness: 'Толщина утеплителя',
        row_energy: 'Энергоэффективность',
        row_structure: 'Тип конструкции',
        row_foundation: 'Тип фундамента',
        row_installation: 'Срок монтажа',
        row_complexity: 'Сложность монтажа',
        row_vapor_barrier: 'Пароизоляция',
        row_wind_barrier: 'Ветрозащита',
        row_full_insulation: 'Полное утепление',
        row_factory_prep: 'Заводская готовность',
        row_foundation_insulation: 'Утепление фундамента',
        row_waterproofing: 'Гидроизоляция',
        row_impregnation: 'Пропитка древесины',
        row_eco: 'Экологичные материалы',
        row_fire: 'Огнезащитная обработка',

        // Winner badges
        badge_our: 'Мы',
        badge_competitor: 'Конкурент',
        badge_tie: 'Равно',

        // Units
        unit_kg: 'кг',
        unit_mm: 'мм',
        unit_days: 'дней',
        unit_day: 'день',
        unit_days_few: 'дня',

        // Complexity names
        complexity_easy_short: 'Лёгкий',
        complexity_medium_short: 'Средний',
        complexity_hard_short: 'Сложный',

        // Yes/No
        yes: 'Да',
        no: 'Нет',

        // How it works
        how_label: 'Процесс',
        how_title: 'Как работает анализатор',
        step1_title: 'Загрузите сметы',
        step1_desc: 'Перетащите файлы PDF или Excel со сметами от конкурента и с вашим предложением',
        step2_title: 'Автоанализ данных',
        step2_desc: 'Система извлекает ключевые параметры и проводит сравнение по 10+ критериям',
        step3_title: 'Получите отчёт',
        step3_desc: 'Интерактивные графики, таблица сравнения и рекомендации с возможностью скачать PDF',

        // Criteria section
        criteria_label: 'Критерии',
        criteria_title: 'Что мы сравниваем',
        criteria_desc: 'Комплексная оценка по всем важным параметрам каркасного дома',
        criteria_price: 'Стоимость',
        criteria_price_desc: 'Общая цена проекта, включая материалы и работу',
        criteria_delivery: 'Доставка',
        criteria_delivery_desc: 'Стоимость транспортировки материалов на объект',
        criteria_weight: 'Вес конструкции',
        criteria_weight_desc: 'Общая масса — влияет на фундамент и логистику',
        criteria_thickness: 'Толщина стен',
        criteria_thickness_desc: 'Влияет на теплоизоляцию и полезную площадь',
        criteria_energy: 'Энергоэффективность',
        criteria_energy_desc: 'Класс от A++ до E — экономия на отоплении',
        criteria_eco: 'Экологичность',
        criteria_eco_desc: 'Безопасность материалов для здоровья',
        criteria_impregnation: 'Пропитка дерева',
        criteria_impregnation_desc: 'Защита от гниения, плесени и насекомых',
        criteria_fire: 'Огнезащита',
        criteria_fire_desc: 'Обработка антипиренами для безопасности',
        criteria_complexity: 'Лёгкость монтажа',
        criteria_complexity_desc: 'Нужна ли спецтехника или достаточно бригады',
        criteria_time: 'Срок монтажа',
        criteria_time_desc: 'За сколько дней будет готов дом',
        criteria_region: 'Регион',
        criteria_region_desc: 'Подходит ли конструкция для вашего климата',
        criteria_rating: 'Итоговый рейтинг',
        criteria_rating_desc: 'Взвешенная оценка по всем критериям',

        // FAQ
        faq_label: 'FAQ',
        faq_title: 'Частые вопросы',
        faq1_q: 'Какие форматы файлов поддерживаются?',
        faq1_a: 'Анализатор принимает файлы в форматах PDF, Excel (.xlsx, .xls) и CSV. Максимальный размер файла — 10 МБ. Система автоматически распознаёт структуру сметы и извлекает ключевые параметры.',
        faq2_q: 'Как рассчитывается итоговый рейтинг?',
        faq2_a: 'Итоговый рейтинг — это взвешенная оценка от 1 до 10. Наибольший вес имеют: стоимость (25%), энергоэффективность (20%), срок монтажа (15%). Остальные критерии распределены равномерно.',
        faq3_q: 'Можно ли ввести данные вручную?',
        faq3_a: 'Да, переключитесь на вкладку «Ввести вручную» и заполните формы для обеих смет. Это удобно, если у вас нет файлов или вы хотите быстро сравнить конкретные параметры.',
        faq4_q: 'Данные передаются на сервер?',
        faq4_a: 'Нет, все расчёты выполняются локально в вашем браузере. Ваши сметы и данные никуда не отправляются и не сохраняются после закрытия страницы.',
        faq5_q: 'Сколько стоит использование?',
        faq5_a: 'Анализатор полностью бесплатный. Количество сравнений не ограничено. Вы можете скачивать PDF-отчёты без регистрации и подписки.',

        // CTA
        cta_title: 'Готовы сравнить сметы?',
        cta_desc: 'Загрузите файлы и получите объективный анализ за пару минут',
        cta_btn: 'Начать анализ бесплатно',

        // Footer
        footer_desc: 'Профессиональный анализатор смет для каркасных домов',
        footer_nav: 'Навигация',
        footer_contacts: 'Контакты',
        footer_copyright: '© 2024 Framehouse. Все права защищены.',

        // Notifications
        notif_demo_loaded: 'Демо-данные загружены',
        notif_analysis_complete: 'Анализ завершён',
        notif_ready_new: 'Готов к новому анализу',
        notif_file_uploaded: 'Файл загружен',
        notif_unsupported_format: 'Неподдерживаемый формат файла',
        notif_file_too_large: 'Файл слишком большой (макс. 10MB)',
        notif_upload_or_manual: 'Загрузите файлы или используйте ручной ввод',
        notif_analyzing: 'Анализ файлов...',
        notif_pdf_soon: 'Функция скачивания PDF будет доступна в следующей версии',

        // AI Analyzer
        ai_modal_title: 'Настройки Claude AI',
        ai_modal_desc: 'Введите ваш API ключ Claude для автоматического анализа PDF-документов. Ключ хранится только в вашем браузере.',
        ai_modal_api_key: 'API ключ',
        ai_modal_how_to_get: 'Как получить API ключ:',
        ai_modal_step1: 'Зарегистрируйтесь на console.anthropic.com',
        ai_modal_step2: 'Перейдите в раздел API Keys',
        ai_modal_step3: 'Создайте новый ключ и скопируйте его сюда',
        ai_modal_save: 'Сохранить',
        ai_modal_remove: 'Удалить ключ',
        ai_status_configured: 'API ключ настроен',
        ai_status_not_configured: 'API ключ не настроен',
        ai_status_enter_key: 'Введите API ключ',
        ai_status_invalid_format: 'Неверный формат ключа (должен начинаться с sk-ant-)',
        ai_status_checking: 'Проверка ключа...',
        ai_status_saved: 'Ключ сохранён и проверен!',
        ai_status_invalid: 'Недействительный ключ',
        ai_status_removed: 'Ключ удалён',
        ai_notif_enabled: 'AI анализ включён!',
        ai_notif_disabled: 'AI анализ отключён',
        ai_analyzing_competitor: 'Анализ сметы конкурента...',
        ai_analyzing_our: 'Анализ нашего предложения...',
        ai_comparing: 'Сравнение данных...',
        ai_complete: 'Готово!',
        notif_ai_analysis_complete: 'AI анализ завершён!',
        notif_ai_error: 'Ошибка AI анализа: ',
        notif_configure_ai: 'Настройте AI API ключ для анализа PDF или используйте ручной ввод',

        // Recommendations
        rec_cheaper: 'Наше предложение дешевле на {amount} ({percent}%). Это существенная экономия для клиента.',
        rec_more_expensive: 'Наша цена выше. Рекомендуем акцентировать внимание на дополнительных преимуществах: качество материалов, гарантия, сервис.',
        rec_energy_better: 'Класс энергоэффективности {class} значительно снизит расходы на отопление — экономия до 30% ежегодно.',
        rec_faster: 'Монтаж быстрее на {days}. Клиент раньше въедет в дом.',
        rec_impregnation: 'Наша древесина обработана защитной пропиткой — срок службы конструкции увеличивается на 15-20 лет.',
        rec_fire: 'Огнезащитная обработка повышает пожаробезопасность и может снизить стоимость страхования дома.',
        rec_eco: 'Используем экологически чистые материалы без формальдегидов — безопасно для здоровья семьи.',
        rec_thickness: 'Толщина стен {mm} мм обеспечивает лучшую теплоизоляцию и звукоизоляцию.',
        rec_simpler: 'Более простой монтаж снижает риск ошибок и позволяет сэкономить на рабочей силе.',
        rec_default: 'Оба предложения сопоставимы по характеристикам. Рекомендуем уточнить условия гарантии и сервисного обслуживания.',

        // Chart labels
        chart_price: 'Цена',
        chart_delivery: 'Доставка',
        chart_weight: 'Вес',
        chart_insulation: 'Теплоизоляция',
        chart_energy: 'Энергоэффективность',
        chart_speed: 'Скорость монтажа',
        chart_simplicity: 'Простота монтажа',
        chart_protection: 'Защита дерева',
        chart_cost: 'Стоимость',
        chart_total: 'Итого',
        chart_competitor: 'Конкурент',
        chart_our: 'Наше предложение',

        // Currency
        currency: 'Валюта',

        // Pluralization
        class_one: 'класс',
        class_few: 'класса',
        class_many: 'классов',

        // Tooltips
        tooltip_price_title: 'Общая стоимость',
        tooltip_price_text: 'Включает стоимость всех материалов, комплектующих и работ по сборке каркаса. Чем ниже цена при сопоставимом качестве — тем лучше.',

        tooltip_delivery_title: 'Стоимость доставки',
        tooltip_delivery_text: 'Зависит от удалённости объекта и объёма материалов. Учитывайте этот параметр при сравнении итоговой цены.',

        tooltip_weight_title: 'Вес конструкции',
        tooltip_weight_text: 'Лёгкий каркас (до 10 тонн) позволяет использовать облегчённый фундамент и упрощает доставку. Тяжёлые конструкции требуют усиленного основания.',

        tooltip_thickness_title: 'Толщина стен',
        tooltip_thickness_text: 'Чем толще стены — тем лучше теплоизоляция и звукоизоляция. Стандарт для средней полосы — 150-200 мм, для севера — от 200 мм.',

        tooltip_energy_title: 'Энергоэффективность',
        tooltip_energy_text: 'Класс A++ экономит до 50% на отоплении по сравнению с классом C. Высокий класс означает меньшие теплопотери и комфортный микроклимат.',

        tooltip_installation_time_title: 'Срок монтажа',
        tooltip_installation_time_text: 'Быстрый монтаж (7-14 дней) снижает накладные расходы и позволяет раньше заселиться. Но качество не должно страдать от спешки.',

        tooltip_region_title: 'Регион строительства',
        tooltip_region_text: 'Конструкция должна соответствовать климатическим нагрузкам: снеговая нагрузка, перепады температур, влажность. Северные регионы требуют усиленного утепления.',

        tooltip_complexity_title: 'Сложность монтажа',
        tooltip_complexity_text: 'Лёгкий монтаж (своими руками) экономит 200-400 тыс. ₽ на работах. Сложный требует спецтехники и профессиональной бригады.',

        tooltip_impregnation_title: 'Пропитка древесины',
        tooltip_impregnation_text: 'Антисептическая обработка защищает от гниения, плесени и насекомых. Увеличивает срок службы каркаса на 15-20 лет.',

        tooltip_eco_title: 'Экологичные материалы',
        tooltip_eco_text: 'Материалы без формальдегидов и токсичных соединений безопасны для здоровья. Особенно важно для семей с детьми и аллергиков.',

        tooltip_fire_title: 'Огнезащитная обработка',
        tooltip_fire_text: 'Антипирены повышают огнестойкость древесины с R15 до R45-R60. Это может снизить стоимость страхования дома на 20-30%.'
    },
    en: {
        // Loader
        loader_text: 'Loading analyzer...',

        // Header
        nav_analyzer: 'Analyzer',
        nav_how_it_works: 'How it works',
        nav_criteria: 'Criteria',
        nav_faq: 'FAQ',
        nav_cta: 'Start Analysis',

        // Hero
        hero_badge: 'Professional analysis tool',
        hero_title_1: 'Compare estimates',
        hero_title_2: 'for timber frame houses',
        hero_title_3: 'in 2 minutes',
        hero_subtitle: 'Upload competitor\'s estimate and your offer — get detailed analysis by 10 criteria: from cost to energy efficiency',
        hero_btn_upload: 'Upload estimates',
        hero_btn_how: 'How it works',
        hero_stat_criteria: 'Comparison criteria',
        hero_stat_formats: 'File formats',
        hero_stat_free: 'Free analyses',

        // Hero cards
        hero_card_competitor: 'Competitor\'s estimate',
        hero_card_our: 'Our offer',
        hero_card_cost: 'Cost',
        hero_card_energy: 'Energy efficiency',

        // Analyzer
        analyzer_label: 'Tool',
        analyzer_title: 'Estimate Analyzer',
        analyzer_desc: 'Upload files or enter data manually for detailed comparison',
        tab_upload: 'Upload files',
        tab_manual: 'Enter manually',

        // Upload zone
        upload_competitor_title: 'Competitor\'s estimate',
        upload_our_title: 'Our offer',
        upload_desc: 'Drag file or click to select',
        upload_formats: 'PDF, Excel, CSV up to 10MB',

        // Form sections
        section_readiness: 'Readiness Stage',
        section_construction: 'Construction',
        section_thermal: 'Wall Physics & Thermal',
        section_completeness: 'Box Completeness',
        section_foundation: 'Foundation',
        section_installation: 'Installation & Timing',
        section_logistics: 'Logistics',

        // Form labels
        form_price: 'Total cost',
        form_area: 'Area (m²)',
        form_floors: 'Floors',
        form_roof_type: 'Roof type',
        form_structure_type: 'Structural system type',
        form_delivery: 'Delivery cost',
        form_delivery_method: 'Delivery method',
        form_weight: 'Construction weight (kg)',
        form_thickness: 'Wall thickness (mm)',
        form_insulation_type: 'Insulation type',
        form_insulation_thickness: 'Insulation thickness (mm)',
        form_energy: 'Energy efficiency class',
        form_vapor_barrier: 'Vapor barrier',
        form_wind_barrier: 'Wind barrier',
        form_full_insulation: 'Full perimeter insulation',
        form_factory_prep: 'Factory-prepared elements',
        form_foundation_type: 'Foundation type',
        form_foundation_insulation: 'Foundation insulation',
        form_waterproofing: 'Waterproofing',
        form_installation_time: 'Installation time (days)',
        form_region: 'Construction region',
        form_complexity: 'Installation complexity',
        form_weather_dependent: 'Weather dependent',
        form_crane_needed: 'Crane required',
        form_impregnation: 'Wood impregnation',
        form_eco: 'Eco-friendly materials',
        form_fire_protection: 'Fire protection',

        // Select placeholders
        select_placeholder: 'Select',

        // Roof types
        roof_gable: 'Gable',
        roof_hip: 'Hip',
        roof_flat: 'Flat',
        roof_mansard: 'Mansard',

        // Structure types
        structure_prefab: 'Prefab (factory panels)',
        structure_frame: 'Frame',
        structure_brick: 'Brick masonry',
        structure_aerated: 'Aerated concrete',
        structure_concrete: 'Reinforced concrete',
        structure_clt: 'CLT panels',

        // Insulation types
        insulation_mineral: 'Mineral wool',
        insulation_basalt: 'Basalt wool',
        insulation_eps: 'Polystyrene (EPS)',
        insulation_xps: 'Extruded (XPS)',
        insulation_pir: 'PIR/PUR',
        insulation_eco: 'Cellulose',

        // Foundation types
        foundation_slab: 'Monolithic slab',
        foundation_strip: 'Strip',
        foundation_pile: 'Pile',
        foundation_screw: 'Screw piles',
        foundation_basement: 'With basement',

        // Delivery methods
        delivery_truck: 'Truck',
        delivery_container: 'Container',
        delivery_trawl: 'Flatbed trailer',

        // Energy classes
        energy_select: 'Select class',
        energy_max: 'maximum',
        energy_min: 'minimum',

        // Regions
        region_select: 'Select region',
        region_central: 'Central',
        region_north: 'Northern',
        region_south: 'Southern',
        region_ural: 'Ural',
        region_siberia: 'Siberia',
        region_far_east: 'Far East',

        // Complexity
        complexity_select: 'Select',
        complexity_easy: 'Easy (DIY)',
        complexity_medium: 'Medium (2-3 person crew)',
        complexity_hard: 'Hard (special equipment)',

        // Buttons
        btn_analyze: 'Run Analysis',
        btn_demo: 'Load demo data',
        btn_download_pdf: 'Download PDF report',
        btn_new_analysis: 'New analysis',

        // Results
        results_label: 'Results',
        results_title: 'Comparative Analysis',
        winner_title: 'Best offer:',
        winner_our: 'Our offer',
        winner_competitor: 'Competitor\'s offer',
        winner_score_label: 'out of 10',
        summary_savings: 'Savings',
        summary_time: 'Faster installation',
        summary_energy: 'Energy efficiency',
        chart_radar: 'Performance radar',
        chart_cost: 'Cost comparison',
        table_title: 'Detailed comparison',
        table_criteria: 'Criteria',
        table_competitor: 'Competitor',
        table_our: 'Our offer',
        table_diff: 'Difference',
        table_winner: 'Winner',
        recommendations_title: 'Recommendations',

        // Table rows
        row_price: 'Total cost',
        row_delivery: 'Delivery cost',
        row_weight: 'Construction weight',
        row_thickness: 'Wall thickness',
        row_insulation_thickness: 'Insulation thickness',
        row_energy: 'Energy efficiency',
        row_structure: 'Structure type',
        row_foundation: 'Foundation type',
        row_installation: 'Installation time',
        row_complexity: 'Installation complexity',
        row_vapor_barrier: 'Vapor barrier',
        row_wind_barrier: 'Wind barrier',
        row_full_insulation: 'Full insulation',
        row_factory_prep: 'Factory-ready',
        row_foundation_insulation: 'Foundation insulation',
        row_waterproofing: 'Waterproofing',
        row_impregnation: 'Wood impregnation',
        row_eco: 'Eco-friendly materials',
        row_fire: 'Fire protection',

        // Winner badges
        badge_our: 'Us',
        badge_competitor: 'Competitor',
        badge_tie: 'Tie',

        // Units
        unit_kg: 'kg',
        unit_mm: 'mm',
        unit_days: 'days',
        unit_day: 'day',
        unit_days_few: 'days',

        // Complexity names
        complexity_easy_short: 'Easy',
        complexity_medium_short: 'Medium',
        complexity_hard_short: 'Hard',

        // Yes/No
        yes: 'Yes',
        no: 'No',

        // How it works
        how_label: 'Process',
        how_title: 'How the analyzer works',
        step1_title: 'Upload estimates',
        step1_desc: 'Drag PDF or Excel files with competitor\'s estimate and your offer',
        step2_title: 'Auto-analysis',
        step2_desc: 'System extracts key parameters and compares by 10+ criteria',
        step3_title: 'Get report',
        step3_desc: 'Interactive charts, comparison table and recommendations with PDF download option',

        // Criteria section
        criteria_label: 'Criteria',
        criteria_title: 'What we compare',
        criteria_desc: 'Comprehensive assessment of all important timber frame house parameters',
        criteria_price: 'Cost',
        criteria_price_desc: 'Total project price including materials and labor',
        criteria_delivery: 'Delivery',
        criteria_delivery_desc: 'Cost of transporting materials to the site',
        criteria_weight: 'Construction weight',
        criteria_weight_desc: 'Total mass — affects foundation and logistics',
        criteria_thickness: 'Wall thickness',
        criteria_thickness_desc: 'Affects thermal insulation and usable area',
        criteria_energy: 'Energy efficiency',
        criteria_energy_desc: 'Class from A++ to E — savings on heating',
        criteria_eco: 'Eco-friendliness',
        criteria_eco_desc: 'Material safety for health',
        criteria_impregnation: 'Wood treatment',
        criteria_impregnation_desc: 'Protection against rot, mold and insects',
        criteria_fire: 'Fire protection',
        criteria_fire_desc: 'Fire retardant treatment for safety',
        criteria_complexity: 'Ease of installation',
        criteria_complexity_desc: 'Whether special equipment is needed or a crew is enough',
        criteria_time: 'Installation time',
        criteria_time_desc: 'How many days until the house is ready',
        criteria_region: 'Region',
        criteria_region_desc: 'Whether the construction suits your climate',
        criteria_rating: 'Final rating',
        criteria_rating_desc: 'Weighted score across all criteria',

        // FAQ
        faq_label: 'FAQ',
        faq_title: 'Frequently Asked Questions',
        faq1_q: 'What file formats are supported?',
        faq1_a: 'The analyzer accepts PDF, Excel (.xlsx, .xls) and CSV files. Maximum file size is 10 MB. The system automatically recognizes the estimate structure and extracts key parameters.',
        faq2_q: 'How is the final rating calculated?',
        faq2_a: 'The final rating is a weighted score from 1 to 10. The highest weights are: cost (25%), energy efficiency (20%), installation time (15%). Other criteria are distributed evenly.',
        faq3_q: 'Can I enter data manually?',
        faq3_a: 'Yes, switch to the "Enter manually" tab and fill in the forms for both estimates. This is convenient if you don\'t have files or want to quickly compare specific parameters.',
        faq4_q: 'Is data sent to a server?',
        faq4_a: 'No, all calculations are performed locally in your browser. Your estimates and data are not sent anywhere and are not saved after closing the page.',
        faq5_q: 'How much does it cost?',
        faq5_a: 'The analyzer is completely free. The number of comparisons is unlimited. You can download PDF reports without registration or subscription.',

        // CTA
        cta_title: 'Ready to compare estimates?',
        cta_desc: 'Upload files and get an objective analysis in a couple of minutes',
        cta_btn: 'Start free analysis',

        // Footer
        footer_desc: 'Professional estimate analyzer for timber frame houses',
        footer_nav: 'Navigation',
        footer_contacts: 'Contacts',
        footer_copyright: '© 2024 Framehouse. All rights reserved.',

        // Notifications
        notif_demo_loaded: 'Demo data loaded',
        notif_analysis_complete: 'Analysis complete',
        notif_ready_new: 'Ready for new analysis',
        notif_file_uploaded: 'File uploaded',
        notif_unsupported_format: 'Unsupported file format',
        notif_file_too_large: 'File too large (max 10MB)',
        notif_upload_or_manual: 'Upload files or use manual input',
        notif_analyzing: 'Analyzing files...',
        notif_pdf_soon: 'PDF download will be available in the next version',

        // AI Analyzer
        ai_modal_title: 'Claude AI Settings',
        ai_modal_desc: 'Enter your Claude API key for automatic PDF document analysis. The key is stored only in your browser.',
        ai_modal_api_key: 'API Key',
        ai_modal_how_to_get: 'How to get an API key:',
        ai_modal_step1: 'Register at console.anthropic.com',
        ai_modal_step2: 'Go to API Keys section',
        ai_modal_step3: 'Create a new key and paste it here',
        ai_modal_save: 'Save',
        ai_modal_remove: 'Remove key',
        ai_status_configured: 'API key configured',
        ai_status_not_configured: 'API key not configured',
        ai_status_enter_key: 'Enter API key',
        ai_status_invalid_format: 'Invalid key format (must start with sk-ant-)',
        ai_status_checking: 'Checking key...',
        ai_status_saved: 'Key saved and verified!',
        ai_status_invalid: 'Invalid key',
        ai_status_removed: 'Key removed',
        ai_notif_enabled: 'AI analysis enabled!',
        ai_notif_disabled: 'AI analysis disabled',
        ai_analyzing_competitor: 'Analyzing competitor estimate...',
        ai_analyzing_our: 'Analyzing our proposal...',
        ai_comparing: 'Comparing data...',
        ai_complete: 'Done!',
        notif_ai_analysis_complete: 'AI analysis complete!',
        notif_ai_error: 'AI analysis error: ',
        notif_configure_ai: 'Configure AI API key for PDF analysis or use manual input',

        // Recommendations
        rec_cheaper: 'Our offer is cheaper by {amount} ({percent}%). This is significant savings for the client.',
        rec_more_expensive: 'Our price is higher. We recommend emphasizing additional benefits: material quality, warranty, service.',
        rec_energy_better: 'Energy efficiency class {class} will significantly reduce heating costs — savings up to 30% annually.',
        rec_faster: 'Installation is faster by {days}. The client will move in sooner.',
        rec_impregnation: 'Our wood is treated with protective impregnation — structure lifespan increases by 15-20 years.',
        rec_fire: 'Fire protection treatment improves fire safety and may reduce home insurance costs.',
        rec_eco: 'We use eco-friendly materials without formaldehyde — safe for family health.',
        rec_thickness: 'Wall thickness of {mm} mm provides better thermal and sound insulation.',
        rec_simpler: 'Simpler installation reduces error risk and allows savings on labor.',
        rec_default: 'Both offers are comparable in characteristics. We recommend clarifying warranty and service terms.',

        // Chart labels
        chart_price: 'Price',
        chart_delivery: 'Delivery',
        chart_weight: 'Weight',
        chart_insulation: 'Insulation',
        chart_energy: 'Energy efficiency',
        chart_speed: 'Installation speed',
        chart_simplicity: 'Installation ease',
        chart_protection: 'Wood protection',
        chart_cost: 'Cost',
        chart_total: 'Total',
        chart_competitor: 'Competitor',
        chart_our: 'Our offer',

        // Currency
        currency: 'Currency',

        // Pluralization
        class_one: 'class',
        class_few: 'classes',
        class_many: 'classes',

        // Tooltips
        tooltip_price_title: 'Total Cost',
        tooltip_price_text: 'Includes cost of all materials, components, and frame assembly. Lower price with comparable quality is always better.',

        tooltip_delivery_title: 'Delivery Cost',
        tooltip_delivery_text: 'Depends on distance to the site and volume of materials. Consider this when comparing final prices.',

        tooltip_weight_title: 'Construction Weight',
        tooltip_weight_text: 'Lightweight frame (under 10 tons) allows for a simpler foundation and easier delivery. Heavy constructions require reinforced foundations.',

        tooltip_thickness_title: 'Wall Thickness',
        tooltip_thickness_text: 'Thicker walls mean better thermal and sound insulation. Standard for moderate climate is 150-200mm, for cold regions — 200mm+.',

        tooltip_energy_title: 'Energy Efficiency',
        tooltip_energy_text: 'Class A++ saves up to 50% on heating compared to class C. Higher class means less heat loss and better indoor comfort.',

        tooltip_installation_time_title: 'Installation Time',
        tooltip_installation_time_text: 'Fast installation (7-14 days) reduces overhead costs and allows earlier move-in. But quality should not suffer from rushing.',

        tooltip_region_title: 'Construction Region',
        tooltip_region_text: 'Construction must match climate loads: snow load, temperature swings, humidity. Northern regions require enhanced insulation.',

        tooltip_complexity_title: 'Installation Complexity',
        tooltip_complexity_text: 'Easy installation (DIY) saves $2,000-4,000 on labor. Complex requires special equipment and professional crew.',

        tooltip_impregnation_title: 'Wood Impregnation',
        tooltip_impregnation_text: 'Antiseptic treatment protects against rot, mold, and insects. Extends frame lifespan by 15-20 years.',

        tooltip_eco_title: 'Eco-friendly Materials',
        tooltip_eco_text: 'Materials without formaldehyde and toxic compounds are safe for health. Especially important for families with children.',

        tooltip_fire_title: 'Fire Protection',
        tooltip_fire_text: 'Fire retardants increase wood fire resistance from R15 to R45-R60. This can reduce home insurance costs by 20-30%.'
    },
    it: {
        // Loader
        loader_text: 'Caricamento analizzatore...',

        // Header
        nav_analyzer: 'Analizzatore',
        nav_how_it_works: 'Come funziona',
        nav_criteria: 'Criteri',
        nav_faq: 'FAQ',
        nav_cta: 'Inizia analisi',

        // Hero
        hero_badge: 'Strumento di analisi professionale',
        hero_title_1: 'Confronta preventivi',
        hero_title_2: 'per case in legno',
        hero_title_3: 'in 2 minuti',
        hero_subtitle: 'Carica il preventivo del concorrente e la nostra offerta — ottieni un\'analisi dettagliata su 10 criteri: dal costo all\'efficienza energetica',
        hero_btn_upload: 'Carica preventivi',
        hero_btn_how: 'Come funziona',
        hero_stat_criteria: 'Criteri di confronto',
        hero_stat_formats: 'Formati file',
        hero_stat_free: 'Analisi gratuite',

        // Hero cards
        hero_card_competitor: 'Preventivo concorrente',
        hero_card_our: 'La nostra offerta',
        hero_card_cost: 'Costo',
        hero_card_energy: 'Efficienza energetica',

        // Analyzer
        analyzer_label: 'Strumento',
        analyzer_title: 'Analizzatore Preventivi',
        analyzer_desc: 'Carica file o inserisci dati manualmente per un confronto dettagliato',
        tab_upload: 'Carica file',
        tab_manual: 'Inserisci manualmente',

        // Upload zone
        upload_competitor_title: 'Preventivo concorrente',
        upload_our_title: 'La nostra offerta',
        upload_desc: 'Trascina file o clicca per selezionare',
        upload_formats: 'PDF, Excel, CSV fino a 10MB',

        // Form sections
        section_readiness: 'Stato di avanzamento',
        section_construction: 'Costruzione',
        section_thermal: 'Fisica della parete e termico',
        section_completeness: 'Completezza struttura',
        section_foundation: 'Fondazione',
        section_installation: 'Installazione e tempi',
        section_logistics: 'Logistica',

        // Form labels
        form_price: 'Costo totale',
        form_area: 'Superficie (m²)',
        form_floors: 'Piani',
        form_roof_type: 'Tipo di tetto',
        form_structure_type: 'Sistema strutturale',
        form_delivery: 'Costo consegna',
        form_delivery_method: 'Metodo di consegna',
        form_weight: 'Peso costruzione (kg)',
        form_thickness: 'Spessore pareti (mm)',
        form_insulation_type: 'Tipo isolamento',
        form_insulation_thickness: 'Spessore isolamento (mm)',
        form_energy: 'Classe energetica',
        form_vapor_barrier: 'Barriera vapore',
        form_wind_barrier: 'Barriera vento',
        form_full_insulation: 'Isolamento completo',
        form_factory_prep: 'Elementi prefabbricati',
        form_foundation_type: 'Tipo fondazione',
        form_foundation_insulation: 'Isolamento fondazione',
        form_waterproofing: 'Impermeabilizzazione',
        form_installation_time: 'Tempo installazione (giorni)',
        form_region: 'Regione costruzione',
        form_complexity: 'Complessità installazione',
        form_weather_dependent: 'Dipende dal meteo',
        form_crane_needed: 'Richiesta gru',
        form_impregnation: 'Impregnazione legno',
        form_eco: 'Materiali ecologici',
        form_fire_protection: 'Protezione antincendio',

        // Select placeholders
        select_placeholder: 'Seleziona',

        // Roof types
        roof_gable: 'A due falde',
        roof_hip: 'A padiglione',
        roof_flat: 'Piano',
        roof_mansard: 'Mansarda',

        // Structure types
        structure_prefab: 'Prefabbricato (pannelli)',
        structure_frame: 'Telaio',
        structure_brick: 'Muratura',
        structure_aerated: 'Calcestruzzo aerato',
        structure_concrete: 'Cemento armato',
        structure_clt: 'Pannelli CLT',

        // Insulation types
        insulation_mineral: 'Lana minerale',
        insulation_basalt: 'Lana di basalto',
        insulation_eps: 'Polistirolo (EPS)',
        insulation_xps: 'Estruso (XPS)',
        insulation_pir: 'PIR/PUR',
        insulation_eco: 'Cellulosa',

        // Foundation types
        foundation_slab: 'Platea',
        foundation_strip: 'A nastro',
        foundation_pile: 'Su pali',
        foundation_screw: 'Pali a vite',
        foundation_basement: 'Con seminterrato',

        // Delivery methods
        delivery_truck: 'Camion',
        delivery_container: 'Container',
        delivery_trawl: 'Rimorchio pianale',

        // Energy classes
        energy_select: 'Seleziona classe',
        energy_max: 'massimo',
        energy_min: 'minimo',

        // Regions
        region_select: 'Seleziona regione',
        region_central: 'Centrale',
        region_north: 'Nord',
        region_south: 'Sud',
        region_ural: 'Urali',
        region_siberia: 'Siberia',
        region_far_east: 'Estremo Oriente',

        // Complexity
        complexity_select: 'Seleziona',
        complexity_easy: 'Facile (fai-da-te)',
        complexity_medium: 'Medio (squadra 2-3 persone)',
        complexity_hard: 'Difficile (attrezzatura speciale)',

        // Buttons
        btn_analyze: 'Avvia Analisi',
        btn_demo: 'Carica dati demo',
        btn_download_pdf: 'Scarica report PDF',
        btn_new_analysis: 'Nuova analisi',

        // Results
        results_label: 'Risultati',
        results_title: 'Analisi Comparativa',
        winner_title: 'Offerta migliore:',
        winner_our: 'La nostra offerta',
        winner_competitor: 'Offerta concorrente',
        winner_score_label: 'su 10',
        summary_savings: 'Risparmio',
        summary_time: 'Installazione più veloce',
        summary_energy: 'Efficienza energetica',
        chart_radar: 'Radar prestazioni',
        chart_cost: 'Confronto costi',
        table_title: 'Confronto dettagliato',
        table_criteria: 'Criterio',
        table_competitor: 'Concorrente',
        table_our: 'La nostra offerta',
        table_diff: 'Differenza',
        table_winner: 'Vincitore',
        recommendations_title: 'Raccomandazioni',

        // Table rows
        row_price: 'Costo totale',
        row_delivery: 'Costo consegna',
        row_weight: 'Peso costruzione',
        row_thickness: 'Spessore pareti',
        row_insulation_thickness: 'Spessore isolamento',
        row_energy: 'Efficienza energetica',
        row_structure: 'Tipo struttura',
        row_foundation: 'Tipo fondazione',
        row_installation: 'Tempo installazione',
        row_complexity: 'Complessità installazione',
        row_vapor_barrier: 'Barriera vapore',
        row_wind_barrier: 'Barriera vento',
        row_full_insulation: 'Isolamento completo',
        row_factory_prep: 'Pronto in fabbrica',
        row_foundation_insulation: 'Isolamento fondazione',
        row_waterproofing: 'Impermeabilizzazione',
        row_impregnation: 'Impregnazione legno',
        row_eco: 'Materiali ecologici',
        row_fire: 'Protezione antincendio',

        // Winner badges
        badge_our: 'Noi',
        badge_competitor: 'Concorrente',
        badge_tie: 'Pari',

        // Units
        unit_kg: 'kg',
        unit_mm: 'mm',
        unit_days: 'giorni',
        unit_day: 'giorno',
        unit_days_few: 'giorni',

        // Complexity names
        complexity_easy_short: 'Facile',
        complexity_medium_short: 'Medio',
        complexity_hard_short: 'Difficile',

        // Yes/No
        yes: 'Sì',
        no: 'No',

        // How it works
        how_label: 'Processo',
        how_title: 'Come funziona l\'analizzatore',
        step1_title: 'Carica preventivi',
        step1_desc: 'Trascina file PDF o Excel con preventivo concorrente e la tua offerta',
        step2_title: 'Auto-analisi',
        step2_desc: 'Il sistema estrae i parametri chiave e confronta su 10+ criteri',
        step3_title: 'Ottieni report',
        step3_desc: 'Grafici interattivi, tabella comparativa e raccomandazioni con download PDF',

        // Criteria section
        criteria_label: 'Criteri',
        criteria_title: 'Cosa confrontiamo',
        criteria_desc: 'Valutazione completa di tutti i parametri importanti delle case in legno',
        criteria_price: 'Costo',
        criteria_price_desc: 'Prezzo totale progetto inclusi materiali e lavoro',
        criteria_delivery: 'Consegna',
        criteria_delivery_desc: 'Costo trasporto materiali al cantiere',
        criteria_weight: 'Peso costruzione',
        criteria_weight_desc: 'Massa totale — influenza fondazione e logistica',
        criteria_thickness: 'Spessore pareti',
        criteria_thickness_desc: 'Influenza isolamento termico e superficie utile',
        criteria_energy: 'Efficienza energetica',
        criteria_energy_desc: 'Classe da A++ a E — risparmio sul riscaldamento',
        criteria_eco: 'Eco-compatibilità',
        criteria_eco_desc: 'Sicurezza materiali per la salute',
        criteria_impregnation: 'Trattamento legno',
        criteria_impregnation_desc: 'Protezione da marciume, muffa e insetti',
        criteria_fire: 'Protezione antincendio',
        criteria_fire_desc: 'Trattamento ignifugo per sicurezza',
        criteria_complexity: 'Facilità installazione',
        criteria_complexity_desc: 'Se serve attrezzatura speciale o basta una squadra',
        criteria_time: 'Tempo installazione',
        criteria_time_desc: 'Quanti giorni fino alla casa pronta',
        criteria_region: 'Regione',
        criteria_region_desc: 'Se la costruzione è adatta al tuo clima',
        criteria_rating: 'Punteggio finale',
        criteria_rating_desc: 'Punteggio pesato su tutti i criteri',

        // FAQ
        faq_label: 'FAQ',
        faq_title: 'Domande Frequenti',
        faq1_q: 'Quali formati file sono supportati?',
        faq1_a: 'L\'analizzatore accetta file PDF, Excel (.xlsx, .xls) e CSV. Dimensione massima 10 MB. Il sistema riconosce automaticamente la struttura del preventivo ed estrae i parametri chiave.',
        faq2_q: 'Come viene calcolato il punteggio finale?',
        faq2_a: 'Il punteggio finale è una valutazione pesata da 1 a 10. I pesi maggiori sono: costo (25%), efficienza energetica (20%), tempo installazione (15%). Gli altri criteri sono distribuiti uniformemente.',
        faq3_q: 'Posso inserire dati manualmente?',
        faq3_a: 'Sì, passa alla scheda "Inserisci manualmente" e compila i moduli per entrambi i preventivi. Comodo se non hai file o vuoi confrontare rapidamente parametri specifici.',
        faq4_q: 'I dati vengono inviati a un server?',
        faq4_a: 'No, tutti i calcoli vengono eseguiti localmente nel tuo browser. I tuoi preventivi e dati non vengono inviati da nessuna parte e non vengono salvati dopo la chiusura della pagina.',
        faq5_q: 'Quanto costa?',
        faq5_a: 'L\'analizzatore è completamente gratuito. Il numero di confronti è illimitato. Puoi scaricare report PDF senza registrazione o abbonamento.',

        // CTA
        cta_title: 'Pronto a confrontare preventivi?',
        cta_desc: 'Carica file e ottieni un\'analisi oggettiva in pochi minuti',
        cta_btn: 'Inizia analisi gratuita',

        // Footer
        footer_desc: 'Analizzatore professionale di preventivi per case in legno',
        footer_nav: 'Navigazione',
        footer_contacts: 'Contatti',
        footer_copyright: '© 2024 Framehouse. Tutti i diritti riservati.',

        // Notifications
        notif_demo_loaded: 'Dati demo caricati',
        notif_analysis_complete: 'Analisi completata',
        notif_ready_new: 'Pronto per nuova analisi',
        notif_file_uploaded: 'File caricato',
        notif_unsupported_format: 'Formato file non supportato',
        notif_file_too_large: 'File troppo grande (max 10MB)',
        notif_upload_or_manual: 'Carica file o usa inserimento manuale',
        notif_analyzing: 'Analisi file in corso...',
        notif_pdf_soon: 'Download PDF disponibile nella prossima versione',

        // AI Analyzer
        ai_modal_title: 'Impostazioni Claude AI',
        ai_modal_desc: 'Inserisci la tua chiave API Claude per l\'analisi automatica dei documenti PDF. La chiave viene memorizzata solo nel tuo browser.',
        ai_modal_api_key: 'Chiave API',
        ai_modal_how_to_get: 'Come ottenere una chiave API:',
        ai_modal_step1: 'Registrati su console.anthropic.com',
        ai_modal_step2: 'Vai alla sezione API Keys',
        ai_modal_step3: 'Crea una nuova chiave e incollala qui',
        ai_modal_save: 'Salva',
        ai_modal_remove: 'Rimuovi chiave',
        ai_status_configured: 'Chiave API configurata',
        ai_status_not_configured: 'Chiave API non configurata',
        ai_status_enter_key: 'Inserisci la chiave API',
        ai_status_invalid_format: 'Formato chiave non valido (deve iniziare con sk-ant-)',
        ai_status_checking: 'Verifica chiave...',
        ai_status_saved: 'Chiave salvata e verificata!',
        ai_status_invalid: 'Chiave non valida',
        ai_status_removed: 'Chiave rimossa',
        ai_notif_enabled: 'Analisi AI attivata!',
        ai_notif_disabled: 'Analisi AI disattivata',
        ai_analyzing_competitor: 'Analisi preventivo concorrente...',
        ai_analyzing_our: 'Analisi nostra proposta...',
        ai_comparing: 'Confronto dati...',
        ai_complete: 'Fatto!',
        notif_ai_analysis_complete: 'Analisi AI completata!',
        notif_ai_error: 'Errore analisi AI: ',
        notif_configure_ai: 'Configura chiave API AI per analisi PDF o usa inserimento manuale',

        // Recommendations
        rec_cheaper: 'La nostra offerta costa meno di {amount} ({percent}%). Risparmio significativo per il cliente.',
        rec_more_expensive: 'Il nostro prezzo è più alto. Consigliamo di evidenziare i vantaggi aggiuntivi: qualità materiali, garanzia, servizio.',
        rec_energy_better: 'Classe energetica {class} ridurrà significativamente i costi di riscaldamento — risparmio fino al 30% annuo.',
        rec_faster: 'Installazione più veloce di {days}. Il cliente potrà trasferirsi prima.',
        rec_impregnation: 'Il nostro legno è trattato con impregnazione protettiva — la durata della struttura aumenta di 15-20 anni.',
        rec_fire: 'Il trattamento ignifugo migliora la sicurezza antincendio e può ridurre i costi assicurativi.',
        rec_eco: 'Usiamo materiali ecologici senza formaldeide — sicuri per la salute della famiglia.',
        rec_thickness: 'Spessore pareti di {mm} mm garantisce migliore isolamento termico e acustico.',
        rec_simpler: 'Installazione più semplice riduce rischio errori e permette risparmio sulla manodopera.',
        rec_default: 'Entrambe le offerte sono comparabili nelle caratteristiche. Consigliamo di chiarire i termini di garanzia e assistenza.',

        // Chart labels
        chart_price: 'Prezzo',
        chart_delivery: 'Consegna',
        chart_weight: 'Peso',
        chart_insulation: 'Isolamento',
        chart_energy: 'Efficienza energetica',
        chart_speed: 'Velocità installazione',
        chart_simplicity: 'Facilità installazione',
        chart_protection: 'Protezione legno',
        chart_cost: 'Costo',
        chart_total: 'Totale',
        chart_competitor: 'Concorrente',
        chart_our: 'La nostra offerta',

        // Currency
        currency: 'Valuta',

        // Pluralization
        class_one: 'classe',
        class_few: 'classi',
        class_many: 'classi',

        // Tooltips
        tooltip_price_title: 'Costo Totale',
        tooltip_price_text: 'Include costo di tutti i materiali, componenti e assemblaggio telaio. Prezzo più basso a parità di qualità è sempre meglio.',

        tooltip_delivery_title: 'Costo Consegna',
        tooltip_delivery_text: 'Dipende dalla distanza dal cantiere e volume materiali. Considera questo nel confronto prezzi finali.',

        tooltip_weight_title: 'Peso Costruzione',
        tooltip_weight_text: 'Telaio leggero (sotto 10 tonnellate) permette fondazione più semplice e consegna più facile. Costruzioni pesanti richiedono fondazioni rinforzate.',

        tooltip_thickness_title: 'Spessore Pareti',
        tooltip_thickness_text: 'Pareti più spesse significano migliore isolamento termico e acustico. Standard per clima moderato 150-200mm, per regioni fredde 200mm+.',

        tooltip_energy_title: 'Efficienza Energetica',
        tooltip_energy_text: 'Classe A++ risparmia fino al 50% sul riscaldamento rispetto alla classe C. Classe più alta significa meno dispersione termica e maggior comfort.',

        tooltip_installation_time_title: 'Tempo Installazione',
        tooltip_installation_time_text: 'Installazione veloce (7-14 giorni) riduce costi generali e permette trasloco anticipato. Ma la qualità non deve soffrire per la fretta.',

        tooltip_region_title: 'Regione Costruzione',
        tooltip_region_text: 'La costruzione deve corrispondere ai carichi climatici: neve, sbalzi termici, umidità. Le regioni nordiche richiedono isolamento potenziato.',

        tooltip_complexity_title: 'Complessità Installazione',
        tooltip_complexity_text: 'Installazione facile (fai-da-te) fa risparmiare 2.000-4.000€ sulla manodopera. Complessa richiede attrezzatura speciale e squadra professionale.',

        tooltip_impregnation_title: 'Impregnazione Legno',
        tooltip_impregnation_text: 'Il trattamento antisettico protegge da marciume, muffa e insetti. Estende la vita del telaio di 15-20 anni.',

        tooltip_eco_title: 'Materiali Ecologici',
        tooltip_eco_text: 'Materiali senza formaldeide e composti tossici sono sicuri per la salute. Particolarmente importante per famiglie con bambini.',

        tooltip_fire_title: 'Protezione Antincendio',
        tooltip_fire_text: 'I ritardanti di fiamma aumentano la resistenza al fuoco del legno da R15 a R45-R60. Può ridurre i costi assicurativi del 20-30%.'
    },
    fr: {
        // Loader
        loader_text: 'Chargement de l\'analyseur...',

        // Header
        nav_analyzer: 'Analyseur',
        nav_how_it_works: 'Comment ça marche',
        nav_criteria: 'Critères',
        nav_faq: 'FAQ',
        nav_cta: 'Démarrer l\'analyse',

        // Hero
        hero_badge: 'Outil d\'analyse professionnel',
        hero_title_1: 'Comparez les devis',
        hero_title_2: 'pour maisons à ossature bois',
        hero_title_3: 'en 2 minutes',
        hero_subtitle: 'Téléchargez le devis du concurrent et notre offre — obtenez une analyse détaillée sur 10 critères : du coût à l\'efficacité énergétique',
        hero_btn_upload: 'Télécharger devis',
        hero_btn_how: 'Comment ça marche',
        hero_stat_criteria: 'Critères de comparaison',
        hero_stat_formats: 'Formats de fichiers',
        hero_stat_free: 'Analyses gratuites',

        // Hero cards
        hero_card_competitor: 'Devis concurrent',
        hero_card_our: 'Notre offre',
        hero_card_cost: 'Coût',
        hero_card_energy: 'Efficacité énergétique',

        // Analyzer
        analyzer_label: 'Outil',
        analyzer_title: 'Analyseur de Devis',
        analyzer_desc: 'Téléchargez des fichiers ou entrez les données manuellement pour une comparaison détaillée',
        tab_upload: 'Télécharger fichiers',
        tab_manual: 'Saisie manuelle',

        // Upload zone
        upload_competitor_title: 'Devis concurrent',
        upload_our_title: 'Notre offre',
        upload_desc: 'Glissez le fichier ou cliquez pour sélectionner',
        upload_formats: 'PDF, Excel, CSV jusqu\'à 10MB',

        // Form sections
        section_readiness: 'État d\'avancement',
        section_construction: 'Construction',
        section_thermal: 'Physique des murs et thermique',
        section_completeness: 'Complétude structure',
        section_foundation: 'Fondation',
        section_installation: 'Installation et délais',
        section_logistics: 'Logistique',

        // Form labels
        form_price: 'Coût total',
        form_area: 'Surface (m²)',
        form_floors: 'Étages',
        form_roof_type: 'Type de toit',
        form_structure_type: 'Système structurel',
        form_delivery: 'Coût livraison',
        form_delivery_method: 'Mode de livraison',
        form_weight: 'Poids construction (kg)',
        form_thickness: 'Épaisseur murs (mm)',
        form_insulation_type: 'Type isolation',
        form_insulation_thickness: 'Épaisseur isolation (mm)',
        form_energy: 'Classe énergétique',
        form_vapor_barrier: 'Pare-vapeur',
        form_wind_barrier: 'Pare-vent',
        form_full_insulation: 'Isolation complète',
        form_factory_prep: 'Éléments préfabriqués',
        form_foundation_type: 'Type fondation',
        form_foundation_insulation: 'Isolation fondation',
        form_waterproofing: 'Étanchéité',
        form_installation_time: 'Délai installation (jours)',
        form_region: 'Région construction',
        form_complexity: 'Complexité installation',
        form_weather_dependent: 'Dépend de la météo',
        form_crane_needed: 'Grue requise',
        form_impregnation: 'Imprégnation bois',
        form_eco: 'Matériaux écologiques',
        form_fire_protection: 'Protection incendie',

        // Select placeholders
        select_placeholder: 'Sélectionner',

        // Roof types
        roof_gable: 'À deux pentes',
        roof_hip: 'En croupe',
        roof_flat: 'Plat',
        roof_mansard: 'Mansarde',

        // Structure types
        structure_prefab: 'Préfabriqué (panneaux)',
        structure_frame: 'Ossature',
        structure_brick: 'Maçonnerie',
        structure_aerated: 'Béton cellulaire',
        structure_concrete: 'Béton armé',
        structure_clt: 'Panneaux CLT',

        // Insulation types
        insulation_mineral: 'Laine minérale',
        insulation_basalt: 'Laine de basalte',
        insulation_eps: 'Polystyrène (EPS)',
        insulation_xps: 'Extrudé (XPS)',
        insulation_pir: 'PIR/PUR',
        insulation_eco: 'Cellulose',

        // Foundation types
        foundation_slab: 'Dalle monolithique',
        foundation_strip: 'Semelle filante',
        foundation_pile: 'Sur pieux',
        foundation_screw: 'Pieux vissés',
        foundation_basement: 'Avec sous-sol',

        // Delivery methods
        delivery_truck: 'Camion',
        delivery_container: 'Conteneur',
        delivery_trawl: 'Remorque plateau',

        // Energy classes
        energy_select: 'Sélectionner classe',
        energy_max: 'maximum',
        energy_min: 'minimum',

        // Regions
        region_select: 'Sélectionner région',
        region_central: 'Central',
        region_north: 'Nord',
        region_south: 'Sud',
        region_ural: 'Oural',
        region_siberia: 'Sibérie',
        region_far_east: 'Extrême-Orient',

        // Complexity
        complexity_select: 'Sélectionner',
        complexity_easy: 'Facile (bricolage)',
        complexity_medium: 'Moyen (équipe 2-3 pers.)',
        complexity_hard: 'Difficile (équipement spécial)',

        // Buttons
        btn_analyze: 'Lancer l\'Analyse',
        btn_demo: 'Charger données démo',
        btn_download_pdf: 'Télécharger rapport PDF',
        btn_new_analysis: 'Nouvelle analyse',

        // Results
        results_label: 'Résultats',
        results_title: 'Analyse Comparative',
        winner_title: 'Meilleure offre :',
        winner_our: 'Notre offre',
        winner_competitor: 'Offre concurrent',
        winner_score_label: 'sur 10',
        summary_savings: 'Économies',
        summary_time: 'Installation plus rapide',
        summary_energy: 'Efficacité énergétique',
        chart_radar: 'Radar performances',
        chart_cost: 'Comparaison coûts',
        table_title: 'Comparaison détaillée',
        table_criteria: 'Critère',
        table_competitor: 'Concurrent',
        table_our: 'Notre offre',
        table_diff: 'Différence',
        table_winner: 'Gagnant',
        recommendations_title: 'Recommandations',

        // Table rows
        row_price: 'Coût total',
        row_delivery: 'Coût livraison',
        row_weight: 'Poids construction',
        row_thickness: 'Épaisseur murs',
        row_insulation_thickness: 'Épaisseur isolation',
        row_energy: 'Efficacité énergétique',
        row_structure: 'Type structure',
        row_foundation: 'Type fondation',
        row_installation: 'Délai installation',
        row_complexity: 'Complexité installation',
        row_vapor_barrier: 'Pare-vapeur',
        row_wind_barrier: 'Pare-vent',
        row_full_insulation: 'Isolation complète',
        row_factory_prep: 'Prêt usine',
        row_foundation_insulation: 'Isolation fondation',
        row_waterproofing: 'Étanchéité',
        row_impregnation: 'Imprégnation bois',
        row_eco: 'Matériaux écologiques',
        row_fire: 'Protection incendie',

        // Winner badges
        badge_our: 'Nous',
        badge_competitor: 'Concurrent',
        badge_tie: 'Égalité',

        // Units
        unit_kg: 'kg',
        unit_mm: 'mm',
        unit_days: 'jours',
        unit_day: 'jour',
        unit_days_few: 'jours',

        // Complexity names
        complexity_easy_short: 'Facile',
        complexity_medium_short: 'Moyen',
        complexity_hard_short: 'Difficile',

        // Yes/No
        yes: 'Oui',
        no: 'Non',

        // How it works
        how_label: 'Processus',
        how_title: 'Comment fonctionne l\'analyseur',
        step1_title: 'Téléchargez devis',
        step1_desc: 'Glissez fichiers PDF ou Excel avec devis concurrent et votre offre',
        step2_title: 'Auto-analyse',
        step2_desc: 'Le système extrait les paramètres clés et compare sur 10+ critères',
        step3_title: 'Obtenez rapport',
        step3_desc: 'Graphiques interactifs, tableau comparatif et recommandations avec téléchargement PDF',

        // Criteria section
        criteria_label: 'Critères',
        criteria_title: 'Ce que nous comparons',
        criteria_desc: 'Évaluation complète de tous les paramètres importants des maisons à ossature bois',
        criteria_price: 'Coût',
        criteria_price_desc: 'Prix total du projet incluant matériaux et main d\'œuvre',
        criteria_delivery: 'Livraison',
        criteria_delivery_desc: 'Coût du transport des matériaux sur site',
        criteria_weight: 'Poids construction',
        criteria_weight_desc: 'Masse totale — affecte fondation et logistique',
        criteria_thickness: 'Épaisseur murs',
        criteria_thickness_desc: 'Affecte isolation thermique et surface utile',
        criteria_energy: 'Efficacité énergétique',
        criteria_energy_desc: 'Classe de A++ à E — économies sur le chauffage',
        criteria_eco: 'Éco-compatibilité',
        criteria_eco_desc: 'Sécurité des matériaux pour la santé',
        criteria_impregnation: 'Traitement bois',
        criteria_impregnation_desc: 'Protection contre pourriture, moisissure et insectes',
        criteria_fire: 'Protection incendie',
        criteria_fire_desc: 'Traitement ignifuge pour la sécurité',
        criteria_complexity: 'Facilité installation',
        criteria_complexity_desc: 'Si équipement spécial requis ou équipe suffit',
        criteria_time: 'Délai installation',
        criteria_time_desc: 'Combien de jours jusqu\'à maison prête',
        criteria_region: 'Région',
        criteria_region_desc: 'Si la construction convient à votre climat',
        criteria_rating: 'Score final',
        criteria_rating_desc: 'Score pondéré sur tous les critères',

        // FAQ
        faq_label: 'FAQ',
        faq_title: 'Questions Fréquentes',
        faq1_q: 'Quels formats de fichiers sont supportés ?',
        faq1_a: 'L\'analyseur accepte les fichiers PDF, Excel (.xlsx, .xls) et CSV. Taille maximale 10 Mo. Le système reconnaît automatiquement la structure du devis et extrait les paramètres clés.',
        faq2_q: 'Comment le score final est-il calculé ?',
        faq2_a: 'Le score final est une évaluation pondérée de 1 à 10. Les poids les plus importants sont : coût (25%), efficacité énergétique (20%), délai installation (15%). Les autres critères sont répartis uniformément.',
        faq3_q: 'Puis-je entrer les données manuellement ?',
        faq3_a: 'Oui, passez à l\'onglet "Saisie manuelle" et remplissez les formulaires pour les deux devis. Pratique si vous n\'avez pas de fichiers ou voulez comparer rapidement des paramètres spécifiques.',
        faq4_q: 'Les données sont-elles envoyées à un serveur ?',
        faq4_a: 'Non, tous les calculs sont effectués localement dans votre navigateur. Vos devis et données ne sont envoyés nulle part et ne sont pas sauvegardés après fermeture de la page.',
        faq5_q: 'Combien ça coûte ?',
        faq5_a: 'L\'analyseur est entièrement gratuit. Le nombre de comparaisons est illimité. Vous pouvez télécharger des rapports PDF sans inscription ni abonnement.',

        // CTA
        cta_title: 'Prêt à comparer les devis ?',
        cta_desc: 'Téléchargez les fichiers et obtenez une analyse objective en quelques minutes',
        cta_btn: 'Démarrer analyse gratuite',

        // Footer
        footer_desc: 'Analyseur professionnel de devis pour maisons à ossature bois',
        footer_nav: 'Navigation',
        footer_contacts: 'Contacts',
        footer_copyright: '© 2024 Framehouse. Tous droits réservés.',

        // Notifications
        notif_demo_loaded: 'Données démo chargées',
        notif_analysis_complete: 'Analyse terminée',
        notif_ready_new: 'Prêt pour nouvelle analyse',
        notif_file_uploaded: 'Fichier téléchargé',
        notif_unsupported_format: 'Format de fichier non supporté',
        notif_file_too_large: 'Fichier trop volumineux (max 10Mo)',
        notif_upload_or_manual: 'Téléchargez fichiers ou utilisez saisie manuelle',
        notif_analyzing: 'Analyse des fichiers...',
        notif_pdf_soon: 'Téléchargement PDF disponible dans la prochaine version',

        // AI Analyzer
        ai_modal_title: 'Paramètres Claude AI',
        ai_modal_desc: 'Entrez votre clé API Claude pour l\'analyse automatique des documents PDF. La clé est stockée uniquement dans votre navigateur.',
        ai_modal_api_key: 'Clé API',
        ai_modal_how_to_get: 'Comment obtenir une clé API :',
        ai_modal_step1: 'Inscrivez-vous sur console.anthropic.com',
        ai_modal_step2: 'Allez dans la section API Keys',
        ai_modal_step3: 'Créez une nouvelle clé et collez-la ici',
        ai_modal_save: 'Enregistrer',
        ai_modal_remove: 'Supprimer la clé',
        ai_status_configured: 'Clé API configurée',
        ai_status_not_configured: 'Clé API non configurée',
        ai_status_enter_key: 'Entrez la clé API',
        ai_status_invalid_format: 'Format de clé invalide (doit commencer par sk-ant-)',
        ai_status_checking: 'Vérification de la clé...',
        ai_status_saved: 'Clé enregistrée et vérifiée !',
        ai_status_invalid: 'Clé invalide',
        ai_status_removed: 'Clé supprimée',
        ai_notif_enabled: 'Analyse AI activée !',
        ai_notif_disabled: 'Analyse AI désactivée',
        ai_analyzing_competitor: 'Analyse du devis concurrent...',
        ai_analyzing_our: 'Analyse de notre proposition...',
        ai_comparing: 'Comparaison des données...',
        ai_complete: 'Terminé !',
        notif_ai_analysis_complete: 'Analyse AI terminée !',
        notif_ai_error: 'Erreur d\'analyse AI : ',
        notif_configure_ai: 'Configurez la clé API AI pour l\'analyse PDF ou utilisez la saisie manuelle',

        // Recommendations
        rec_cheaper: 'Notre offre coûte moins cher de {amount} ({percent}%). Économie significative pour le client.',
        rec_more_expensive: 'Notre prix est plus élevé. Nous recommandons de souligner les avantages supplémentaires : qualité des matériaux, garantie, service.',
        rec_energy_better: 'La classe énergétique {class} réduira significativement les coûts de chauffage — économies jusqu\'à 30% par an.',
        rec_faster: 'Installation plus rapide de {days}. Le client pourra emménager plus tôt.',
        rec_impregnation: 'Notre bois est traité avec une imprégnation protectrice — la durée de vie de la structure augmente de 15-20 ans.',
        rec_fire: 'Le traitement ignifuge améliore la sécurité incendie et peut réduire les coûts d\'assurance.',
        rec_eco: 'Nous utilisons des matériaux écologiques sans formaldéhyde — sûrs pour la santé de la famille.',
        rec_thickness: 'L\'épaisseur des murs de {mm} mm garantit une meilleure isolation thermique et acoustique.',
        rec_simpler: 'Installation plus simple réduit le risque d\'erreurs et permet des économies sur la main d\'œuvre.',
        rec_default: 'Les deux offres sont comparables en caractéristiques. Nous recommandons de clarifier les conditions de garantie et de service.',

        // Chart labels
        chart_price: 'Prix',
        chart_delivery: 'Livraison',
        chart_weight: 'Poids',
        chart_insulation: 'Isolation',
        chart_energy: 'Efficacité énergétique',
        chart_speed: 'Vitesse installation',
        chart_simplicity: 'Facilité installation',
        chart_protection: 'Protection bois',
        chart_cost: 'Coût',
        chart_total: 'Total',
        chart_competitor: 'Concurrent',
        chart_our: 'Notre offre',

        // Currency
        currency: 'Devise',

        // Pluralization
        class_one: 'classe',
        class_few: 'classes',
        class_many: 'classes',

        // Tooltips
        tooltip_price_title: 'Coût Total',
        tooltip_price_text: 'Inclut le coût de tous les matériaux, composants et assemblage de l\'ossature. Prix plus bas à qualité comparable est toujours mieux.',

        tooltip_delivery_title: 'Coût Livraison',
        tooltip_delivery_text: 'Dépend de la distance au chantier et du volume des matériaux. Considérez ceci dans la comparaison des prix finaux.',

        tooltip_weight_title: 'Poids Construction',
        tooltip_weight_text: 'Ossature légère (moins de 10 tonnes) permet fondation plus simple et livraison plus facile. Constructions lourdes nécessitent fondations renforcées.',

        tooltip_thickness_title: 'Épaisseur Murs',
        tooltip_thickness_text: 'Murs plus épais signifient meilleure isolation thermique et acoustique. Standard pour climat modéré 150-200mm, pour régions froides 200mm+.',

        tooltip_energy_title: 'Efficacité Énergétique',
        tooltip_energy_text: 'Classe A++ économise jusqu\'à 50% sur le chauffage comparé à classe C. Classe plus élevée signifie moins de pertes de chaleur et meilleur confort.',

        tooltip_installation_time_title: 'Délai Installation',
        tooltip_installation_time_text: 'Installation rapide (7-14 jours) réduit les frais généraux et permet un emménagement anticipé. Mais la qualité ne doit pas souffrir de la précipitation.',

        tooltip_region_title: 'Région Construction',
        tooltip_region_text: 'La construction doit correspondre aux charges climatiques : neige, variations de température, humidité. Les régions nordiques nécessitent isolation renforcée.',

        tooltip_complexity_title: 'Complexité Installation',
        tooltip_complexity_text: 'Installation facile (bricolage) économise 2 000-4 000€ sur la main d\'œuvre. Complexe nécessite équipement spécial et équipe professionnelle.',

        tooltip_impregnation_title: 'Imprégnation Bois',
        tooltip_impregnation_text: 'Le traitement antiseptique protège contre pourriture, moisissure et insectes. Prolonge la durée de vie de l\'ossature de 15-20 ans.',

        tooltip_eco_title: 'Matériaux Écologiques',
        tooltip_eco_text: 'Matériaux sans formaldéhyde et composés toxiques sont sûrs pour la santé. Particulièrement important pour familles avec enfants.',

        tooltip_fire_title: 'Protection Incendie',
        tooltip_fire_text: 'Les retardateurs de flamme augmentent la résistance au feu du bois de R15 à R45-R60. Peut réduire les coûts d\'assurance de 20-30%.'
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('framehouse_lang') || 'ru';
        this.listeners = [];
    }

    t(key, params = {}) {
        let text = translations[this.currentLang]?.[key] || translations['ru'][key] || key;

        // Replace parameters
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });

        return text;
    }

    setLang(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('framehouse_lang', lang);
            this.updatePage();
            this.notifyListeners();
        }
    }

    getLang() {
        return this.currentLang;
    }

    onLangChange(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.currentLang));
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update html lang attribute
        document.documentElement.lang = this.currentLang;
    }

    // Pluralization for Russian
    pluralize(n, one, few, many) {
        if (this.currentLang === 'en') {
            return n === 1 ? one : many;
        }

        const mod10 = n % 10;
        const mod100 = n % 100;

        if (mod100 >= 11 && mod100 <= 14) {
            return many;
        }
        if (mod10 === 1) {
            return one;
        }
        if (mod10 >= 2 && mod10 <= 4) {
            return few;
        }
        return many;
    }

    pluralizeDays(n) {
        return this.pluralize(n, this.t('unit_day'), this.t('unit_days_few'), this.t('unit_days'));
    }

    pluralizeClasses(n) {
        return this.pluralize(n, this.t('class_one'), this.t('class_few'), this.t('class_many'));
    }
}

// Global instance
window.i18n = new I18n();

// Apply translations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.updatePage();
});
