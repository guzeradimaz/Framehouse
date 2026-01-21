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
