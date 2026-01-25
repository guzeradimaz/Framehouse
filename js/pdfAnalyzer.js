/**
 * ============================================================================
 * PDF ANALYZER - Анализатор строительных смет через Claude API
 * ============================================================================
 * 
 * Этот модуль позволяет:
 * 1. Загружать PDF файлы и конвертировать в base64
 * 2. Отправлять в Claude API для анализа
 * 3. Получать структурированные данные в JSON формате
 * 
 * Использование:
 * 
 *   const analyzer = new PDFAnalyzer('your-api-key');
 *   const result = await analyzer.analyzeFromFile(fileInput.files[0]);
 *   console.log(result);
 * 
 */

// ============================================================================
// КОНФИГУРАЦИЯ
// ============================================================================

const CONFIG = {
  // Использовать локальный прокси-сервер (запустите: node server.js)
  USE_PROXY: false,

  // URL прокси-сервера (локальный)
  PROXY_URL: 'http://localhost:3001/api/analyze',

  // Claude API endpoint (прямой - может не работать из браузера)
  API_URL: 'https://api.anthropic.com/v1/messages',

  // Версия API
  API_VERSION: '2023-06-01',

  // Модель (можно менять на claude-opus-4-20250514 для лучшего качества)
  MODEL: 'claude-sonnet-4-20250514',

  // Максимум токенов в ответе
  MAX_TOKENS: 16000,

  // Максимальный размер файла (32MB - лимит Claude)
  MAX_FILE_SIZE: 32 * 1024 * 1024,

  // Поддерживаемые типы файлов
  SUPPORTED_TYPES: ['application/pdf']
};

// ============================================================================
// СИСТЕМНЫЙ ПРОМПТ ДЛЯ АНАЛИЗА СТРОИТЕЛЬНЫХ СМЕТ
// ============================================================================

const SYSTEM_PROMPT = `Ты - экспертный анализатор строительных смет и коммерческих предложений.

ТВОЯ ЗАДАЧА:
Извлечь ВСЮ информацию из документа и вернуть её в структурированном JSON формате.

ВАЖНЫЕ ПРАВИЛА:
1. Документ может быть на ЛЮБОМ языке (итальянский, русский, английский, немецкий и др.)
2. Может содержать 1, 2, 3 или более вариантов комплектации
3. Все цены извлекай как ЧИСЛА (без валюты, без пробелов)
4. Если информация отсутствует — ставь null
5. Если опция недоступна (N/A, не применимо) — price: null, available: false
6. Сохраняй оригинальные названия на языке документа + добавляй перевод

ВЕРНИ ТОЛЬКО ВАЛИДНЫЙ JSON БЕЗ MARKDOWN-РАЗМЕТКИ (без \`\`\`json и \`\`\`)`;

// ============================================================================
// JSON СХЕМА ДЛЯ СТРУКТУРИРОВАННОГО ОТВЕТА
// ============================================================================

const EXTRACTION_PROMPT = `
Извлеки данные в следующей JSON структуре:

{
  "document": {
    "type": "quotation | invoice | estimate | contract",
    "number": "номер документа",
    "date": "дата в формате YYYY-MM-DD",
    "valid_until": "срок действия если есть",
    "currency": "EUR | USD | RUB | etc",
    "language": "it | en | ru | de | etc",
    "notes": "важные примечания из документа"
  },
  
  "company": {
    "name": "название компании-продавца",
    "legal_name": "юридическое название",
    "vat_number": "номер VAT/ИНН",
    "address": "полный адрес",
    "country": "страна",
    "phone": "телефон",
    "email": "email",
    "website": "сайт",
    "bank_details": {
      "bank_name": "название банка",
      "iban": "IBAN",
      "swift": "SWIFT/BIC"
    }
  },
  
  "client": {
    "name": "имя клиента",
    "company": "компания клиента если есть",
    "address": "адрес",
    "construction_location": "место строительства"
  },
  
  "project": {
    "name": "название проекта",
    "type": "prefab_house | renovation | extension | etc",
    "description": "описание проекта",
    "total_area_m2": число или null,
    "floors": число этажей,
    "roof_type": "gable | hip | flat | mansard (двускатная | вальмовая | плоская | мансардная)",
    "construction_time_days": число (срок строительства в днях),
    "readiness_stage": "frame | box | turnkey | under_finishing (каркас | коробка | под ключ | под отделку)",
    "weight_tons": число (вес конструкции в тоннах),
    "region": "название региона строительства"
  },
  
  "packages": [
    {
      "id": "уникальный ID пакета (base, standard, premium, passive, etc)",
      "name": {
        "original": "название на языке документа",
        "translated": "перевод на русский"
      },
      "price": число,
      "is_recommended": true/false,
      "description": "описание пакета",
      "specifications": {
        "wall_thickness_mm": число,
        "wall_u_value": число (теплопроводность),
        "roof_u_value": число,
        "insulation_type": "mineral_wool | stone_wool | eps | xps | pir | puf | eco_wool | wood_fiber (минвата | каменная вата | пенополистирол | экструзия | PIR | ППУ | эковата | древесное волокно)",
        "insulation_thickness_mm": число,
        "energy_class": "класс энергоэффективности A++/A+/A/B/C",
        "vapor_barrier": true/false (есть ли пароизоляция),
        "wind_barrier": true/false (есть ли ветрозащита),
        "fire_protection": true/false (огнезащитная обработка),
        "impregnation": true/false (пропитка древесины),
        "eco_materials": true/false (экологичные материалы),
        "box_completeness": "frame_only | walls_roof | full_box | turnkey (только каркас | стены+крыша | полная коробка | под ключ)",
        "factory_preparation": "raw | planed | calibrated | painted (необработанный | строганный | калиброванный | окрашенный)"
      },
      "included_items": [
        {
          "category": "structure | insulation | finishing | engineering",
          "name": "название",
          "description": "описание"
        }
      ]
    }
  ],
  
  "options": {
    "external_walls": [
      {
        "code": "код опции (например 2.1.1)",
        "name": {
          "original": "название на языке документа",
          "translated": "перевод"
        },
        "description": "подробное описание",
        "price": число или null,
        "price_per_unit": число или null,
        "unit": "m2 | m | pcs | set",
        "available": true/false,
        "included_in_packages": ["id пакетов где включено"],
        "requires": ["коды опций которые требуются"],
        "specifications": {
          "thickness_mm": число,
          "thermal_conductivity": число,
          "fire_class": "класс огнестойкости",
          "material": "материал"
        },
        "note": "примечания"
      }
    ],
    "internal_walls": [...],
    "roof_structure": [...],
    "roof_covering": [...],
    "floor_structure": [...],
    "insulation": [...],
    "membranes": {
      "vapor_barrier": {
        "included": true/false,
        "type": "пленка | мембрана",
        "brand": "производитель",
        "price": число или null
      },
      "wind_barrier": {
        "included": true/false,
        "type": "мембрана | плита",
        "brand": "производитель",
        "price": число или null
      },
      "waterproofing": {
        "included": true/false,
        "type": "тип гидроизоляции",
        "price": число или null
      }
    },
    "finishing_exterior": [...],
    "finishing_interior": [...],
    "windows_doors": [...],
    "engineering": [...],
    "treatment": {
      "impregnation": {
        "included": true/false,
        "type": "антисептик | масло | лазурь",
        "brand": "производитель",
        "price": число или null
      },
      "fire_protection": {
        "included": true/false,
        "class": "Г1 | Г2",
        "type": "состав | пропитка",
        "price": число или null
      },
      "eco_certified": true/false
    }
  },
  
  "foundation": {
    "type": "slab | strip | pile | screw_pile | raft | none (плита | ленточный | свайный | винтовые сваи | плитный ростверк | нет)",
    "included": true/false,
    "price": число или null,
    "insulated": true/false (утепление фундамента),
    "waterproofing": true/false (гидроизоляция),
    "depth_m": число (глубина заложения),
    "material": "concrete | reinforced_concrete | block (бетон | железобетон | блоки)",
    "note": "примечания"
  },

  "transport": [
    {
      "for_package": "id пакета",
      "price": число,
      "trucks_count": число,
      "truck_dimensions": {
        "length_m": число,
        "width_m": число,
        "height_m": число
      },
      "delivery_method": "описание метода доставки",
      "note": "примечания"
    }
  ],
  
  "assembly": {
    "available": true/false,
    "included": true/false (включен ли монтаж в цену пакета),
    "price": число или null,
    "duration": {
      "min_days": число,
      "max_days": число
    },
    "team": {
      "workers": число,
      "supervisor": true/false
    },
    "equipment_required": ["список оборудования"],
    "client_responsibilities": ["что должен обеспечить клиент"],
    "supervision_available": true/false (технадзор),
    "supervision_price": число или null,
    "note": "примечания"
  },
  
  "payment_terms": {
    "deposit_percent": число,
    "deposit_note": "условия депозита",
    "stages": [
      {
        "stage": "название этапа",
        "percent": число,
        "condition": "условие оплаты"
      }
    ]
  },
  
  "warranties": [
    {
      "item": "на что гарантия",
      "duration_years": число,
      "conditions": "условия"
    }
  ],
  
  "certifications": [
    {
      "name": "название сертификата",
      "number": "номер",
      "issuer": "кто выдал",
      "valid_until": "срок действия"
    }
  ],
  
  "summary": {
    "cheapest_option": {
      "package_id": "id",
      "total_price": число
    },
    "most_expensive_option": {
      "package_id": "id", 
      "total_price": число
    },
    "recommended_option": {
      "package_id": "id",
      "reason": "почему рекомендуется"
    },
    "price_includes_vat": true/false,
    "vat_percent": число или null
  },
  
  "raw_prices": {
    "description": "Все цены найденные в документе для проверки",
    "items": [
      {
        "description": "описание",
        "price": число,
        "page": номер страницы
      }
    ]
  }
}

ПОМНИ: Верни ТОЛЬКО JSON, без дополнительного текста!`;

// ============================================================================
// КЛАСС АНАЛИЗАТОРА PDF
// ============================================================================

class PDFAnalyzer {
  
  /**
   * Конструктор
   * @param {string} apiKey - API ключ Claude
   * @param {object} options - дополнительные опции
   */
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.model = options.model || CONFIG.MODEL;
    this.customPrompt = options.customPrompt || null;
    this.debug = options.debug || false;
  }
  
  /**
   * Логирование (если включен debug режим)
   */
  log(...args) {
    if (this.debug) {
      console.log('[PDFAnalyzer]', ...args);
    }
  }
  
  /**
   * Конвертация File в base64
   * @param {File} file - файл PDF
   * @returns {Promise<string>} - base64 строка
   */
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      // Проверка типа файла
      if (!CONFIG.SUPPORTED_TYPES.includes(file.type)) {
        reject(new Error(`Неподдерживаемый тип файла: ${file.type}. Поддерживаются: ${CONFIG.SUPPORTED_TYPES.join(', ')}`));
        return;
      }
      
      // Проверка размера
      if (file.size > CONFIG.MAX_FILE_SIZE) {
        reject(new Error(`Файл слишком большой: ${(file.size / 1024 / 1024).toFixed(2)}MB. Максимум: ${CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = () => {
        // Убираем prefix "data:application/pdf;base64,"
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      
      reader.onerror = () => {
        reject(new Error('Ошибка чтения файла'));
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * Загрузка PDF по URL и конвертация в base64
   * @param {string} url - URL PDF файла
   * @returns {Promise<string>} - base64 строка
   */
  async urlToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  /**
   * Отправка запроса в Claude API
   * @param {string} base64PDF - PDF в формате base64
   * @param {string} additionalInstructions - дополнительные инструкции
   * @returns {Promise<object>} - распарсенный JSON ответ
   */
  async sendToAPI(base64PDF, additionalInstructions = '') {
    this.log('Отправка запроса в API...');
    
    const userPrompt = this.customPrompt 
      ? this.customPrompt 
      : `${EXTRACTION_PROMPT}\n\n${additionalInstructions}`;
    
    const requestBody = {
      model: this.model,
      max_tokens: CONFIG.MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64PDF
              }
            },
            {
              type: 'text',
              text: userPrompt
            }
          ]
        }
      ]
    };
    
    this.log('Request body:', JSON.stringify(requestBody, null, 2).substring(0, 500) + '...');

    // Выбираем URL и заголовки в зависимости от режима (прокси или прямой)
    const apiUrl = CONFIG.USE_PROXY ? CONFIG.PROXY_URL : CONFIG.API_URL;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
      'anthropic-version': CONFIG.API_VERSION
    };

    // Добавляем заголовок для прямого доступа только если не используем прокси
    if (!CONFIG.USE_PROXY) {
      headers['anthropic-dangerous-direct-browser-access'] = 'true';
    }

    this.log(`Using ${CONFIG.USE_PROXY ? 'PROXY' : 'DIRECT'} mode: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    this.log('API Response:', data);
    
    // Извлекаем текст ответа
    const responseText = data.content[0].text;
    
    // Парсим JSON (убираем возможные markdown-обёртки)
    return this.parseJSONResponse(responseText);
  }
  
  /**
   * Парсинг JSON из ответа (с обработкой markdown)
   * @param {string} text - текст ответа
   * @returns {object} - распарсенный объект
   */
  parseJSONResponse(text) {
    // Убираем markdown code blocks если есть
    let cleanText = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    
    try {
      return JSON.parse(cleanText);
    } catch (e) {
      // Пробуем найти JSON в тексте
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e2) {
          throw new Error(`Не удалось распарсить JSON: ${e2.message}\n\nОтвет API:\n${text.substring(0, 1000)}...`);
        }
      }
      throw new Error(`Ответ не содержит валидный JSON: ${e.message}`);
    }
  }
  
  /**
   * Анализ PDF из File объекта
   * @param {File} file - PDF файл
   * @param {string} additionalInstructions - дополнительные инструкции
   * @returns {Promise<object>} - результат анализа
   */
  async analyzeFromFile(file, additionalInstructions = '') {
    this.log(`Анализ файла: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    
    const base64 = await this.fileToBase64(file);
    this.log(`Конвертировано в base64: ${base64.length} символов`);
    
    return this.sendToAPI(base64, additionalInstructions);
  }
  
  /**
   * Анализ PDF из base64 строки
   * @param {string} base64 - PDF в формате base64
   * @param {string} additionalInstructions - дополнительные инструкции
   * @returns {Promise<object>} - результат анализа
   */
  async analyzeFromBase64(base64, additionalInstructions = '') {
    this.log(`Анализ base64: ${base64.length} символов`);
    return this.sendToAPI(base64, additionalInstructions);
  }
  
  /**
   * Анализ PDF по URL
   * @param {string} url - URL PDF файла
   * @param {string} additionalInstructions - дополнительные инструкции
   * @returns {Promise<object>} - результат анализа
   */
  async analyzeFromURL(url, additionalInstructions = '') {
    this.log(`Анализ URL: ${url}`);
    
    const base64 = await this.urlToBase64(url);
    return this.sendToAPI(base64, additionalInstructions);
  }
  
  /**
   * Установка кастомного промпта
   * @param {string} prompt - новый промпт
   */
  setCustomPrompt(prompt) {
    this.customPrompt = prompt;
  }
  
  /**
   * Сброс на стандартный промпт
   */
  resetPrompt() {
    this.customPrompt = null;
  }
}

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

/**
 * Расчёт итоговой стоимости
 * @param {object} data - данные анализа
 * @param {string} packageId - выбранный пакет
 * @param {array} selectedOptionCodes - коды выбранных опций
 * @param {boolean} includeTransport - включить доставку
 * @param {boolean} includeAssembly - включить монтаж
 * @returns {object} - детализация стоимости
 */
function calculateTotal(data, packageId, selectedOptionCodes = [], includeTransport = false, includeAssembly = false) {
  const result = {
    package: null,
    options: [],
    transport: null,
    assembly: null,
    subtotals: {
      package: 0,
      options: 0,
      transport: 0,
      assembly: 0
    },
    total: 0
  };
  
  // Находим выбранный пакет
  const pkg = data.packages?.find(p => p.id === packageId);
  if (pkg) {
    result.package = pkg;
    result.subtotals.package = pkg.price || 0;
  }
  
  // Собираем все опции из всех категорий
  const allOptions = [];
  if (data.options) {
    Object.values(data.options).forEach(categoryOptions => {
      if (Array.isArray(categoryOptions)) {
        allOptions.push(...categoryOptions);
      }
    });
  }
  
  // Добавляем выбранные опции
  selectedOptionCodes.forEach(code => {
    const option = allOptions.find(o => o.code === code);
    if (option && option.price && option.available !== false) {
      // Проверяем, не включена ли опция уже в пакет
      if (!option.included_in_packages?.includes(packageId)) {
        result.options.push(option);
        result.subtotals.options += option.price;
      }
    }
  });
  
  // Добавляем транспорт
  if (includeTransport && data.transport) {
    const transport = data.transport.find(t => t.for_package === packageId) || data.transport[0];
    if (transport) {
      result.transport = transport;
      result.subtotals.transport = transport.price || 0;
    }
  }
  
  // Добавляем монтаж
  if (includeAssembly && data.assembly?.available && data.assembly?.price) {
    result.assembly = data.assembly;
    result.subtotals.assembly = data.assembly.price;
  }
  
  // Итого
  result.total = 
    result.subtotals.package + 
    result.subtotals.options + 
    result.subtotals.transport + 
    result.subtotals.assembly;
  
  return result;
}

/**
 * Форматирование цены
 * @param {number} price - цена
 * @param {string} currency - валюта
 * @returns {string} - отформатированная цена
 */
function formatPrice(price, currency = 'EUR') {
  if (price === null || price === undefined) return 'N/A';
  
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(price);
}

/**
 * Сравнение пакетов
 * @param {object} data - данные анализа
 * @returns {object} - сравнительная таблица
 */
function comparePackages(data) {
  if (!data.packages || data.packages.length === 0) {
    return null;
  }
  
  const comparison = {
    packages: data.packages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      priceFormatted: formatPrice(pkg.price, data.document?.currency),
      specifications: pkg.specifications,
      includedCount: pkg.included_items?.length || 0
    })),
    cheapest: null,
    mostExpensive: null,
    bestValue: null
  };
  
  // Сортируем по цене
  const sorted = [...comparison.packages].sort((a, b) => (a.price || 0) - (b.price || 0));
  
  comparison.cheapest = sorted[0];
  comparison.mostExpensive = sorted[sorted.length - 1];
  
  // Лучшее соотношение цена/качество (по U-value если есть)
  const withUValue = comparison.packages.filter(p => p.specifications?.wall_u_value);
  if (withUValue.length > 0) {
    // Меньше U-value = лучше изоляция
    // Ищем лучшее соотношение цена / (1/u_value)
    comparison.bestValue = withUValue.reduce((best, pkg) => {
      const efficiency = (1 / pkg.specifications.wall_u_value) / pkg.price;
      const bestEfficiency = (1 / best.specifications.wall_u_value) / best.price;
      return efficiency > bestEfficiency ? pkg : best;
    });
  }
  
  return comparison;
}

// ============================================================================
// ЭКСПОРТ (для использования как ES модуль)
// ============================================================================

// Если используется в браузере без модулей, всё доступно глобально
if (typeof window !== 'undefined') {
  window.PDFAnalyzer = PDFAnalyzer;
  window.calculateTotal = calculateTotal;
  window.formatPrice = formatPrice;
  window.comparePackages = comparePackages;
  window.PDF_ANALYZER_CONFIG = CONFIG;
}

// Для ES модулей
// export { PDFAnalyzer, calculateTotal, formatPrice, comparePackages, CONFIG };