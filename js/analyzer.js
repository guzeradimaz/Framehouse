/**
 * Estimate Analyzer Engine
 * Comparison tool for timber frame house estimates
 */

class EstimateAnalyzer {
    constructor() {
        this.competitorData = null;
        this.ourData = null;
        this.radarChart = null;
        this.costChart = null;
        this._currentCurrency = 'EUR'; // Default currency
        this._currentCurrencySymbol = '€';

        // API Key management
        this.apiKeyStorageKey = 'framehouse_claude_api_key';

        // Criteria weights for final score calculation
        this.weights = {
            price: 0.20,
            delivery: 0.05,
            weight: 0.05,
            thickness: 0.08,
            insulationThickness: 0.07,
            energy: 0.15,
            installationTime: 0.10,
            complexity: 0.05,
            impregnation: 0.03,
            eco: 0.03,
            fireProtection: 0.03,
            vaporBarrier: 0.02,
            windBarrier: 0.02,
            fullInsulation: 0.03,
            factoryPrep: 0.03,
            foundationInsulation: 0.03,
            waterproofing: 0.03
        };

        // Energy class scores (higher is better)
        this.energyScores = {
            'A++': 10,
            'A+': 9,
            'A': 8,
            'B': 6,
            'C': 4,
            'D': 2,
            'E': 1
        };

        // Complexity scores (easier is better)
        this.complexityScores = {
            'easy': 10,
            'medium': 6,
            'hard': 3
        };

        // Structure type scores (prefab is best)
        this.structureScores = {
            'prefab': 10,
            'clt': 9,
            'frame': 8,
            'aerated': 6,
            'brick': 4,
            'concrete': 3
        };

        // Foundation type scores (higher = more reliable)
        this.foundationScores = {
            'slab': 10,
            'basement': 9,
            'strip': 7,
            'pile': 6,
            'screw': 5
        };

        // Insulation type scores
        this.insulationScores = {
            'pir': 10,
            'xps': 9,
            'basalt': 8,
            'mineral': 7,
            'eps': 6,
            'eco': 7
        };

        this.init();
    }

    // Get currency symbol from currency code
    getCurrencySymbol(currencyCode) {
        const symbols = {
            'EUR': '€', 'USD': '$', 'GBP': '£', 'RUB': '₽',
            'CHF': 'CHF', 'JPY': '¥', 'CNY': '¥', 'PLN': 'zł'
        };
        return symbols[currencyCode] || currencyCode || '€';
    }

    // Format price/number for display (always uses space as thousands separator)
    formatPrice(value) {
        if (value === null || value === undefined) return '0';

        // Convert to number if string
        let num = typeof value === 'string' ? parseFloat(value) : value;

        // Handle NaN or invalid numbers
        if (isNaN(num)) return '0';

        // Round to 2 decimal places
        num = Math.round(num * 100) / 100;

        // Format with space as thousands separator
        const parts = num.toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Remove .00 if whole number
        if (parts[1] === '00') {
            return parts[0];
        }

        return parts.join('.');
    }

    init() {
        this.bindEvents();
        this.createAPISettingsUI();
        this.bindAPIKeyEvents();
        this.updateAPIIndicator();

        // Listen for language changes
        if (window.i18n) {
            window.i18n.onLangChange(() => {
                if (this.competitorData && this.ourData) {
                    this.updateResultsLanguage();
                }
            });
        }

        // Listen for currency changes
        if (window.currency) {
            window.currency.onCurrencyChange(() => {
                this.updatePlaceholders();
                if (this.competitorData && this.ourData) {
                    this.updateResultsCurrency();
                }
            });
        }
    }

    // ============ API Key Management ============

    getApiKey() {
        return localStorage.getItem(this.apiKeyStorageKey);
    }

    setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem(this.apiKeyStorageKey, key.trim());
            return true;
        }
        return false;
    }

    removeApiKey() {
        localStorage.removeItem(this.apiKeyStorageKey);
    }

    hasApiKey() {
        return !!this.getApiKey();
    }

    createAPISettingsUI() {
        // Add AI settings button to header
        const navControls = document.querySelector('.nav__controls');
        if (navControls) {
            const aiBtn = document.createElement('button');
            aiBtn.className = 'ai-settings-btn';
            aiBtn.id = 'aiSettingsBtn';
            aiBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0 1 12 2z"/>
                    <path d="M12 12v10"/>
                    <path d="M8 22h8"/>
                    <circle cx="12" cy="6" r="1"/>
                </svg>
                <span class="ai-settings-btn__indicator" id="aiIndicator"></span>
            `;
            aiBtn.title = 'AI Settings';
            navControls.insertBefore(aiBtn, navControls.firstChild);
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'ai-modal';
        modal.id = 'aiModal';
        modal.innerHTML = `
            <div class="ai-modal__backdrop"></div>
            <div class="ai-modal__content">
                <button class="ai-modal__close" id="aiModalClose">&times;</button>
                <div class="ai-modal__header">
                    <div class="ai-modal__icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0 1 12 2z"/>
                            <path d="M12 12v10"/>
                            <path d="M8 22h8"/>
                            <circle cx="12" cy="6" r="1"/>
                        </svg>
                    </div>
                    <h3 data-i18n="ai_modal_title">Claude AI Settings</h3>
                </div>
                <div class="ai-modal__body">
                    <p class="ai-modal__desc" data-i18n="ai_modal_desc">
                        Введите ваш API ключ Claude для автоматического анализа PDF-документов.
                        Ключ хранится только в вашем браузере.
                    </p>
                    <div class="ai-modal__form">
                        <label class="ai-modal__label" data-i18n="ai_modal_api_key">API Key</label>
                        <div class="ai-modal__input-wrapper">
                            <input type="password"
                                   class="ai-modal__input"
                                   id="aiApiKeyInput"
                                   placeholder="sk-ant-api03-..."
                                   autocomplete="off">
                            <button class="ai-modal__toggle-visibility" id="toggleApiKeyVisibility" type="button">
                                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ai-modal__status" id="aiKeyStatus"></div>
                    </div>
                    <div class="ai-modal__info">
                        <h4 data-i18n="ai_modal_how_to_get">Как получить API ключ:</h4>
                        <ol>
                            <li data-i18n="ai_modal_step1">Зарегистрируйтесь на <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a></li>
                            <li data-i18n="ai_modal_step2">Перейдите в раздел API Keys</li>
                            <li data-i18n="ai_modal_step3">Создайте новый ключ и скопируйте его сюда</li>
                        </ol>
                    </div>
                </div>
                <div class="ai-modal__footer">
                    <button class="btn btn--outline" id="aiRemoveKey" data-i18n="ai_modal_remove">Удалить ключ</button>
                    <button class="btn btn--primary" id="aiSaveKey" data-i18n="ai_modal_save">Сохранить</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    updateAPIIndicator() {
        const indicator = document.getElementById('aiIndicator');
        if (indicator) {
            if (this.hasApiKey()) {
                indicator.classList.add('is-active');
                indicator.title = 'AI enabled';
            } else {
                indicator.classList.remove('is-active');
                indicator.title = 'AI not configured';
            }
        }
    }

    bindAPIKeyEvents() {
        // Open modal
        const settingsBtn = document.getElementById('aiSettingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openAPIModal());
        }

        // Close modal
        const closeBtn = document.getElementById('aiModalClose');
        const backdrop = document.querySelector('.ai-modal__backdrop');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeAPIModal());
        }
        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeAPIModal());
        }

        // Toggle password visibility
        const toggleBtn = document.getElementById('toggleApiKeyVisibility');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const input = document.getElementById('aiApiKeyInput');
                const eyeIcon = toggleBtn.querySelector('.eye-icon');
                const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');

                if (input.type === 'password') {
                    input.type = 'text';
                    eyeIcon.style.display = 'none';
                    eyeOffIcon.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeIcon.style.display = 'block';
                    eyeOffIcon.style.display = 'none';
                }
            });
        }

        // Save key
        const saveBtn = document.getElementById('aiSaveKey');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveAPIKey());
        }

        // Remove key
        const removeBtn = document.getElementById('aiRemoveKey');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeAPIKeyUI());
        }

        // Enter key to save
        const input = document.getElementById('aiApiKeyInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveAPIKey();
                }
            });
        }
    }

    openAPIModal() {
        const modal = document.getElementById('aiModal');
        const input = document.getElementById('aiApiKeyInput');
        const status = document.getElementById('aiKeyStatus');

        if (modal) {
            modal.classList.add('is-open');

            // Show current key status
            if (this.hasApiKey()) {
                const key = this.getApiKey();
                input.value = key;
                input.placeholder = 'sk-ant-***' + key.slice(-4);
                status.innerHTML = `<span class="status-success" data-i18n="ai_status_configured">API ключ настроен</span>`;
            } else {
                input.value = '';
                status.innerHTML = `<span class="status-warning" data-i18n="ai_status_not_configured">API ключ не настроен</span>`;
            }
        }
    }

    closeAPIModal() {
        const modal = document.getElementById('aiModal');
        if (modal) {
            modal.classList.remove('is-open');
        }
    }

    async saveAPIKey() {
        const input = document.getElementById('aiApiKeyInput');
        const status = document.getElementById('aiKeyStatus');
        const key = input.value.trim();

        if (!key) {
            status.innerHTML = `<span class="status-error">Введите API ключ</span>`;
            return;
        }

        if (!key.startsWith('sk-ant-')) {
            status.innerHTML = `<span class="status-error">Неверный формат ключа (должен начинаться с sk-ant-)</span>`;
            return;
        }

        // Save key directly (CORS prevents browser-side testing)
        this.setApiKey(key);
        this.updateAPIIndicator();
        status.innerHTML = `<span class="status-success">Ключ сохранён!</span>`;

        this.showNotification(
            window.i18n ? i18n.t('ai_notif_enabled') : 'AI анализ включён!',
            'success'
        );

        setTimeout(() => this.closeAPIModal(), 1500);
    }

    removeAPIKeyUI() {
        this.removeApiKey();
        this.updateAPIIndicator();

        const input = document.getElementById('aiApiKeyInput');
        const status = document.getElementById('aiKeyStatus');

        input.value = '';
        status.innerHTML = `<span class="status-warning" data-i18n="ai_status_removed">Ключ удалён</span>`;

        this.showNotification(
            window.i18n ? i18n.t('ai_notif_disabled') : 'AI анализ отключён',
            'info'
        );
    }

    // ============ End API Key Management ============

    bindEvents() {
        // Tab switching
        const tabs = document.querySelectorAll('.analyzer__tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });

        // File upload zones
        this.setupUploadZone('competitorZone', 'competitorFile', 'competitorPreview');
        this.setupUploadZone('ourZone', 'ourFile', 'ourPreview');

        // Analyze button
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.runAnalysis());
        }

        // Load demo data button
        const loadDemoBtn = document.getElementById('loadDemoBtn');
        if (loadDemoBtn) {
            loadDemoBtn.addEventListener('click', () => this.loadDemoData());
        }

        // New analysis button
        const newAnalysisBtn = document.getElementById('newAnalysisBtn');
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', () => this.resetAnalysis());
        }

        // Download PDF button
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => this.downloadPDF());
        }
    }

    switchTab(activeTab) {
        const tabs = document.querySelectorAll('.analyzer__tab');
        const uploadPanel = document.getElementById('uploadPanel');
        const manualPanel = document.getElementById('manualPanel');

        tabs.forEach(tab => tab.classList.remove('is-active'));
        activeTab.classList.add('is-active');

        const tabType = activeTab.dataset.tab;

        if (tabType === 'upload') {
            uploadPanel.classList.remove('is-hidden');
            manualPanel.classList.add('is-hidden');
        } else {
            uploadPanel.classList.add('is-hidden');
            manualPanel.classList.remove('is-hidden');
        }
    }

    setupUploadZone(zoneId, inputId, previewId) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        if (!zone || !input) return;

        // Click to upload
        zone.addEventListener('click', (e) => {
            if (!e.target.closest('.upload-zone__preview')) {
                input.click();
            }
        });

        // Drag and drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('is-dragover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('is-dragover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('is-dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0], zone, preview);
            }
        });

        // File input change
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileSelect(e.target.files[0], zone, preview);
            }
        });

        // Remove file button
        const removeBtn = preview?.querySelector('.upload-zone__remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFile(zone, preview, input);
            });
        }
    }

    handleFileSelect(file, zone, preview) {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ];

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|xlsx|xls|csv)$/i)) {
            this.showNotification(i18n.t('notif_unsupported_format'), 'error');
            return;
        }

        if (file.size > maxSize) {
            this.showNotification(i18n.t('notif_file_too_large'), 'error');
            return;
        }

        // Show preview
        zone.classList.add('has-file');
        const filenameEl = preview.querySelector('.upload-zone__filename');
        if (filenameEl) {
            filenameEl.textContent = file.name;
        }

        // Store file reference
        zone.dataset.filename = file.name;
        zone.file = file;

        this.showNotification(`${i18n.t('notif_file_uploaded')}: "${file.name}"`, 'success');
    }

    removeFile(zone, preview, input) {
        zone.classList.remove('has-file');
        zone.file = null;
        delete zone.dataset.filename;
        input.value = '';
    }

    updatePlaceholders() {
        const curr = window.currency;
        if (!curr) return;

        // Update price placeholders based on currency
        const pricePlaceholders = {
            'competitor_price': 2450000,
            'competitor_delivery': 150000,
            'our_price': 2180000,
            'our_delivery': 95000
        };

        Object.entries(pricePlaceholders).forEach(([name, rubValue]) => {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {
                input.placeholder = curr.getPlaceholder(rubValue);
            }
        });
    }

    loadDemoData() {
        // Switch to manual tab
        const manualTab = document.querySelector('[data-tab="manual"]');
        if (manualTab) {
            this.switchTab(manualTab);
        }

        // Demo data for competitor (values always in RUB internally)
        const competitorData = {
            price: 2450000,
            area: 120,
            floors: '2',
            roofType: 'gable',
            structureType: 'frame',
            delivery: 150000,
            deliveryMethod: 'truck',
            weight: 12000,
            thickness: 150,
            insulationType: 'mineral',
            insulationThickness: 150,
            energy: 'C',
            vaporBarrier: false,
            windBarrier: true,
            fullInsulation: false,
            factoryPrep: false,
            foundationType: 'strip',
            foundationInsulation: false,
            waterproofing: true,
            installationTime: 14,
            region: 'central',
            complexity: 'medium',
            weatherDependent: true,
            craneNeeded: false,
            impregnation: false,
            eco: false,
            fireProtection: false
        };

        // Demo data for our offer
        const ourData = {
            price: 2180000,
            area: 120,
            floors: '2',
            roofType: 'gable',
            structureType: 'prefab',
            delivery: 95000,
            deliveryMethod: 'truck',
            weight: 10500,
            thickness: 200,
            insulationType: 'basalt',
            insulationThickness: 200,
            energy: 'A+',
            vaporBarrier: true,
            windBarrier: true,
            fullInsulation: true,
            factoryPrep: true,
            foundationType: 'slab',
            foundationInsulation: true,
            waterproofing: true,
            installationTime: 10,
            region: 'central',
            complexity: 'easy',
            weatherDependent: false,
            craneNeeded: false,
            impregnation: true,
            eco: true,
            fireProtection: true
        };

        // Fill competitor form
        this.fillForm('competitorForm', competitorData, 'competitor_');

        // Fill our form
        this.fillForm('ourForm', ourData, 'our_');

        this.showNotification(i18n.t('notif_demo_loaded'), 'success');
    }

    fillForm(formId, data, prefix) {
        const form = document.getElementById(formId);
        if (!form) return;

        const curr = window.currency;

        // Get source currency from data (PDF prices are already in document's currency)
        const sourceCurrency = data.currency || 'RUB';
        const targetCurrency = curr ? curr.currentCurrency : 'RUB';

        // Number inputs - convert currency for display only if needed
        const input_price = form.querySelector(`[name="${prefix}price"]`);
        const input_delivery = form.querySelector(`[name="${prefix}delivery"]`);

        if (input_price && data.price) {
            let displayValue = data.price;
            // Only convert if source and target currencies differ
            if (sourceCurrency !== targetCurrency && curr) {
                displayValue = Math.round(curr.convertBetween(data.price, sourceCurrency, targetCurrency));
            }
            input_price.value = displayValue;
        }

        if (input_delivery && data.delivery) {
            let displayValue = data.delivery;
            // Only convert if source and target currencies differ
            if (sourceCurrency !== targetCurrency && curr) {
                displayValue = Math.round(curr.convertBetween(data.delivery, sourceCurrency, targetCurrency));
            }
            input_delivery.value = displayValue;
        }

        // Other number inputs (not currency)
        const numberFields = {
            'area': 'area',
            'weight': 'weight',
            'thickness': 'thickness',
            'insulation_thickness': 'insulationThickness',
            'installation_time': 'installationTime'
        };

        Object.entries(numberFields).forEach(([inputName, dataKey]) => {
            const input = form.querySelector(`[name="${prefix}${inputName}"]`);
            if (input && data[dataKey]) input.value = data[dataKey];
        });

        // Selects
        const selectFields = {
            'floors': 'floors',
            'roof_type': 'roofType',
            'structure_type': 'structureType',
            'insulation_type': 'insulationType',
            'foundation_type': 'foundationType',
            'delivery_method': 'deliveryMethod',
            'energy': 'energy',
            'region': 'region',
            'complexity': 'complexity',
            'box_completeness': 'boxCompleteness',
            'readiness_stage': 'readinessStage'
        };

        Object.entries(selectFields).forEach(([inputName, dataKey]) => {
            const select = form.querySelector(`[name="${prefix}${inputName}"]`);
            if (select && data[dataKey]) {
                select.value = data[dataKey];
            }
        });

        // Checkboxes
        const checkboxFields = {
            'vapor_barrier': 'vaporBarrier',
            'wind_barrier': 'windBarrier',
            'full_insulation': 'fullInsulation',
            'factory_prep': 'factoryPrep',
            'foundation_insulation': 'foundationInsulation',
            'waterproofing': 'waterproofing',
            'weather_dependent': 'weatherDependent',
            'crane_needed': 'craneNeeded',
            'impregnation': 'impregnation',
            'eco': 'eco',
            'fire_protection': 'fireProtection',
            'assembly_included': 'assemblyIncluded'
        };

        Object.entries(checkboxFields).forEach(([inputName, dataKey]) => {
            const checkbox = form.querySelector(`[name="${prefix}${inputName}"]`);
            if (checkbox) {
                checkbox.checked = data[dataKey] || false;
            }
        });
    }

    getFormData(formId, prefix) {
        const form = document.getElementById(formId);
        if (!form) return null;

        const curr = window.currency;
        const data = {};

        // Get price values - keep them as entered (in user's display currency)
        const priceValue = parseFloat(form.querySelector(`[name="${prefix}price"]`)?.value) || 0;
        const deliveryValue = parseFloat(form.querySelector(`[name="${prefix}delivery"]`)?.value) || 0;

        data.price = priceValue;
        data.delivery = deliveryValue;
        // Store the currency these values are in (user's current display currency)
        data.currency = curr ? curr.currentCurrency : 'RUB';

        // Other number inputs
        data.area = parseFloat(form.querySelector(`[name="${prefix}area"]`)?.value) || 0;
        data.weight = parseFloat(form.querySelector(`[name="${prefix}weight"]`)?.value) || 0;
        data.thickness = parseFloat(form.querySelector(`[name="${prefix}thickness"]`)?.value) || 0;
        data.insulationThickness = parseFloat(form.querySelector(`[name="${prefix}insulation_thickness"]`)?.value) || 0;
        data.installationTime = parseFloat(form.querySelector(`[name="${prefix}installation_time"]`)?.value) || 0;

        // Selects
        data.floors = form.querySelector(`[name="${prefix}floors"]`)?.value || '1';
        data.roofType = form.querySelector(`[name="${prefix}roof_type"]`)?.value || '';
        data.structureType = form.querySelector(`[name="${prefix}structure_type"]`)?.value || '';
        data.insulationType = form.querySelector(`[name="${prefix}insulation_type"]`)?.value || '';
        data.foundationType = form.querySelector(`[name="${prefix}foundation_type"]`)?.value || '';
        data.deliveryMethod = form.querySelector(`[name="${prefix}delivery_method"]`)?.value || '';
        data.energy = form.querySelector(`[name="${prefix}energy"]`)?.value || '';
        data.region = form.querySelector(`[name="${prefix}region"]`)?.value || '';
        data.complexity = form.querySelector(`[name="${prefix}complexity"]`)?.value || '';

        // Checkboxes
        data.vaporBarrier = form.querySelector(`[name="${prefix}vapor_barrier"]`)?.checked || false;
        data.windBarrier = form.querySelector(`[name="${prefix}wind_barrier"]`)?.checked || false;
        data.fullInsulation = form.querySelector(`[name="${prefix}full_insulation"]`)?.checked || false;
        data.factoryPrep = form.querySelector(`[name="${prefix}factory_prep"]`)?.checked || false;
        data.foundationInsulation = form.querySelector(`[name="${prefix}foundation_insulation"]`)?.checked || false;
        data.waterproofing = form.querySelector(`[name="${prefix}waterproofing"]`)?.checked || false;
        data.weatherDependent = form.querySelector(`[name="${prefix}weather_dependent"]`)?.checked || false;
        data.craneNeeded = form.querySelector(`[name="${prefix}crane_needed"]`)?.checked || false;
        data.impregnation = form.querySelector(`[name="${prefix}impregnation"]`)?.checked || false;
        data.eco = form.querySelector(`[name="${prefix}eco"]`)?.checked || false;
        data.fireProtection = form.querySelector(`[name="${prefix}fire_protection"]`)?.checked || false;

        return data;
    }

    validateData(data, name) {
        const errors = [];

        if (!data.price || data.price <= 0) {
            errors.push(`${name}: ${i18n.t('form_price')}`);
        }
        if (!data.energy) {
            errors.push(`${name}: ${i18n.t('form_energy')}`);
        }
        if (!data.installationTime || data.installationTime <= 0) {
            errors.push(`${name}: ${i18n.t('form_installation_time')}`);
        }

        return errors;
    }

    async runAnalysis() {
        // Check which mode is active
        const uploadPanel = document.getElementById('uploadPanel');
        const isUploadMode = !uploadPanel.classList.contains('is-hidden');

        if (isUploadMode) {
            const competitorZone = document.getElementById('competitorZone');
            const ourZone = document.getElementById('ourZone');

            if (!competitorZone.file && !ourZone.file) {
                this.showNotification(i18n.t('notif_upload_or_manual'), 'error');
                return;
            }

            // Check if API key is configured
            if (this.hasApiKey()) {
                await this.runAIAnalysis(competitorZone.file, ourZone.file);
            } else {
                // Show prompt to configure AI or use demo data
                this.showNotification(i18n.t('notif_configure_ai') || 'Настройте AI API ключ для анализа PDF или используйте ручной ввод', 'warning');

                // Open AI settings modal
                setTimeout(() => this.openAPIModal(), 1000);
            }

            return;
        }

        // Manual input mode
        this.competitorData = this.getFormData('competitorForm', 'competitor_');
        this.ourData = this.getFormData('ourForm', 'our_');

        // Validate
        const errors = [
            ...this.validateData(this.competitorData, i18n.t('upload_competitor_title')),
            ...this.validateData(this.ourData, i18n.t('upload_our_title'))
        ];

        if (errors.length > 0) {
            this.showNotification(errors[0], 'error');
            return;
        }

        this.performComparison();
    }

    /**
     * Конвертация данных из PDFAnalyzer в формат формы
     * @param {object} extractedData - данные из PDFAnalyzer
     * @returns {object} - данные в формате формы
     */
    convertPDFAnalyzerData(extractedData) {
        const packages = extractedData.packages || [];
        const project = extractedData.project || {};
        const assembly = extractedData.assembly || {};
        const transport = extractedData.transport || [];
        const document = extractedData.document || {};
        const options = extractedData.options || {};
        const foundation = extractedData.foundation || {};
        const client = extractedData.client || {};

        // Получить цену из пакета с максимальной ценой (основной пакет)
        let price = 0;
        let thickness = 0;
        let insulationThickness = 0;
        let energy = '';
        let rawInsulationType = '';
        let selectedPackage = null;
        let specs = {};

        if (packages.length > 0) {
            // Находим пакет с максимальной ценой (обычно это основной пакет дома)
            selectedPackage = packages.reduce((max, pkg) => {
                return (pkg.price || 0) > (max.price || 0) ? pkg : max;
            }, packages[0]);

            price = selectedPackage.price || 0;
            specs = selectedPackage.specifications || {};

            thickness = specs.wall_thickness_mm || 0;
            insulationThickness = specs.insulation_thickness_mm || 0;
            energy = specs.energy_class || '';
            rawInsulationType = specs.insulation_type || '';
        }

        // Маппинг типа утеплителя на наши значения формы
        const insulationTypeMap = {
            // Italian
            'fibra di legno': 'eco', 'lana di legno': 'eco', 'fibra legno': 'eco',
            'lana di roccia': 'basalt', 'lana roccia': 'basalt', 'roccia': 'basalt',
            'lana minerale': 'mineral', 'lana di vetro': 'mineral',
            'polistirene': 'eps', 'polistirolo': 'eps', 'eps': 'eps',
            'xps': 'xps', 'polistirene estruso': 'xps',
            'poliuretano': 'pir', 'pur': 'pir', 'pir': 'pir',
            'cellulosa': 'eco', 'canapa': 'eco',
            // English
            'wood fiber': 'eco', 'wood fibre': 'eco', 'cellulose': 'eco', 'wood_fiber': 'eco',
            'rock wool': 'basalt', 'stone wool': 'basalt', 'basalt': 'basalt', 'stone_wool': 'basalt',
            'mineral wool': 'mineral', 'glass wool': 'mineral', 'mineral_wool': 'mineral',
            'polystyrene': 'eps', 'styrofoam': 'eps',
            'extruded polystyrene': 'xps',
            'polyurethane': 'pir', 'spray foam': 'pir', 'puf': 'pir',
            'eco_wool': 'eco',
            // Russian
            'минеральная вата': 'mineral', 'минвата': 'mineral',
            'базальтовая вата': 'basalt', 'базальт': 'basalt', 'каменная вата': 'basalt',
            'пенополистирол': 'eps', 'пенопласт': 'eps',
            'экструдированный': 'xps', 'эппс': 'xps',
            'пенополиуретан': 'pir', 'ппу': 'pir',
            'эковата': 'eco', 'целлюлоза': 'eco', 'древесное волокно': 'eco'
        };
        const insulationType = insulationTypeMap[(rawInsulationType || '').toLowerCase()] || '';

        // Получить цену доставки
        let delivery = 0;
        if (transport.length > 0) {
            delivery = transport[0].price || 0;
        }

        // Получить время монтажа (из assembly или project)
        let installationTime = 0;
        if (project.construction_time_days) {
            installationTime = project.construction_time_days;
        } else if (assembly.duration) {
            installationTime = assembly.duration.min_days || assembly.duration.max_days || 0;
        }

        // Маппинг типа конструкции
        const typeMap = {
            'prefab_house': 'prefab', 'prefab': 'prefab', 'prefabbricato': 'prefab',
            'frame': 'frame', 'telaio': 'frame', 'timber': 'frame', 'timber_frame': 'frame',
            'panel': 'prefab', 'panels': 'prefab',
            'brick': 'brick', 'mattone': 'brick', 'muratura': 'brick',
            'concrete': 'concrete', 'calcestruzzo': 'concrete', 'cemento': 'concrete',
            'clt': 'clt', 'xlam': 'clt', 'cross_laminated': 'clt',
            'aerated': 'aerated', 'gasbeton': 'aerated', 'газобетон': 'aerated', 'газоблок': 'aerated'
        };
        const rawType = (project.type || '').toLowerCase();
        const structureType = typeMap[rawType] || rawType || 'prefab';

        // Маппинг типа крыши
        let roofType = '';
        if (project.roof_type) {
            const roofTypeMap = {
                'gable': 'gable', 'двускатная': 'gable', 'a due acque': 'gable', 'capanna': 'gable',
                'hip': 'hip', 'вальмовая': 'hip', 'padiglione': 'hip', 'quattro falde': 'hip',
                'flat': 'flat', 'плоская': 'flat', 'piano': 'flat', 'piana': 'flat',
                'mansard': 'mansard', 'мансардная': 'mansard', 'soffitta': 'mansard', 'mansarda': 'mansard'
            };
            roofType = roofTypeMap[project.roof_type.toLowerCase()] || project.roof_type;
        }
        if (!roofType) {
            const roofStructure = options.roof_structure?.[0];
            if (roofStructure) {
                const roofDesc = (roofStructure.description || roofStructure.name?.original || '').toLowerCase();
                if (/mansard|мансард|soffitta/i.test(roofDesc)) roofType = 'mansard';
                else if (/flat|плоск|piano|piana/i.test(roofDesc)) roofType = 'flat';
                else if (/hip|вальм|padiglione|quattro falde/i.test(roofDesc)) roofType = 'hip';
                else if (/gable|двускат|due falde|a due acque|capanna/i.test(roofDesc)) roofType = 'gable';
            }
        }

        // Маппинг типа фундамента
        let foundationType = '';
        if (foundation.type) {
            const foundationTypeMap = {
                'slab': 'slab', 'плита': 'slab', 'platea': 'slab',
                'strip': 'strip', 'ленточный': 'strip', 'nastro': 'strip', 'continuo': 'strip',
                'pile': 'pile', 'свайный': 'pile', 'pali': 'pile',
                'screw_pile': 'screw', 'винтовые сваи': 'screw', 'pali a vite': 'screw',
                'raft': 'raft', 'плитный ростверк': 'raft',
                'none': '', 'нет': ''
            };
            foundationType = foundationTypeMap[(foundation.type || '').toLowerCase()] || foundation.type;
        }

        // Маппинг стадии готовности
        let readinessStage = '';
        if (project.readiness_stage) {
            const readinessMap = {
                'frame': 'frame', 'каркас': 'frame', 'telaio': 'frame',
                'box': 'box', 'коробка': 'box', 'scatola': 'box',
                'turnkey': 'turnkey', 'под ключ': 'turnkey', 'chiavi in mano': 'turnkey',
                'under_finishing': 'finishing', 'под отделку': 'finishing', 'grezzo': 'finishing'
            };
            readinessStage = readinessMap[(project.readiness_stage || '').toLowerCase()] || project.readiness_stage;
        }

        // Маппинг комплектности коробки
        let boxCompleteness = '';
        if (specs.box_completeness) {
            const boxMap = {
                'frame_only': 'frame', 'только каркас': 'frame',
                'walls_roof': 'walls', 'стены+крыша': 'walls',
                'full_box': 'full', 'полная коробка': 'full',
                'turnkey': 'turnkey', 'под ключ': 'turnkey'
            };
            boxCompleteness = boxMap[(specs.box_completeness || '').toLowerCase()] || specs.box_completeness;
        }

        // Маппинг заводской подготовки
        let factoryPrep = false;
        if (specs.factory_preparation) {
            const prepMap = {
                'raw': false, 'необработанный': false, 'grezzo': false,
                'planed': true, 'строганный': true, 'piallato': true,
                'calibrated': true, 'калиброванный': true, 'calibrato': true,
                'painted': true, 'окрашенный': true, 'verniciato': true
            };
            factoryPrep = prepMap[(specs.factory_preparation || '').toLowerCase()] ?? (structureType === 'prefab');
        } else {
            factoryPrep = structureType === 'prefab';
        }

        // Определить сложность на основе наличия крана
        let complexity = 'medium';
        if (assembly.equipment_required) {
            const needsCrane = assembly.equipment_required.some(e => /crane|кран|gru|autogru/i.test(e));
            complexity = needsCrane ? 'hard' : 'medium';
        }

        // === Определение пароизоляции, ветрозащиты, обработки ===

        // 1. Сначала из спецификаций пакета
        let vaporBarrier = specs.vapor_barrier === true;
        let windBarrier = specs.wind_barrier === true;
        let fireProtection = specs.fire_protection === true;
        let impregnation = specs.impregnation === true;
        let eco = specs.eco_materials === true;

        // 2. Из секции options.membranes (новый формат)
        const membranes = options.membranes || {};
        if (membranes.vapor_barrier?.included) vaporBarrier = true;
        if (membranes.wind_barrier?.included) windBarrier = true;
        if (membranes.waterproofing?.included) {
            // waterproofing теперь берём из мембран
        }

        // 3. Из секции options.treatment (новый формат)
        const treatment = options.treatment || {};
        if (treatment.impregnation?.included) impregnation = true;
        if (treatment.fire_protection?.included) fireProtection = true;
        if (treatment.eco_certified) eco = true;

        // 4. Из опций стен (старый формат массивов)
        const wallOptions = Array.isArray(options.external_walls) ? options.external_walls : [];
        wallOptions.forEach(opt => {
            const desc = (opt.description || '').toLowerCase();
            const name = (opt.name?.original || opt.name || '').toLowerCase();
            if (/vapor|vapore|пароизол|barriera.*vapore/i.test(desc + name)) vaporBarrier = true;
            if (/wind|vento|ветро|barriera.*vento/i.test(desc + name)) windBarrier = true;
            if (/fire|fuoco|огне|rei\s*\d+|antincendio/i.test(desc + name)) fireProtection = true;
            if (/impregnation|impregnazione|пропит|trattamento/i.test(desc + name)) impregnation = true;
        });

        // 5. Огнезащита в спецификациях стен
        if (wallOptions.some(w => w.specifications?.fire_class)) {
            fireProtection = true;
        }

        // 6. Экологичные материалы по типу утеплителя
        if (insulationType === 'eco' || /legno|wood|дерев|natural|ecolog/i.test(rawInsulationType)) {
            eco = true;
        }

        // Гидроизоляция фундамента
        let waterproofing = foundation.waterproofing === true || membranes.waterproofing?.included === true;

        // Утепление фундамента
        let foundationInsulation = foundation.insulated === true;

        // Способ доставки
        let deliveryMethod = 'truck';
        if (transport.length > 0) {
            const method = (transport[0].delivery_method || '').toLowerCase();
            if (/container|контейнер/i.test(method)) deliveryMethod = 'container';
            else if (/trawl|трал|pianale/i.test(method)) deliveryMethod = 'trawl';
        }

        // Регион строительства
        let region = project.region || client.construction_location || '';

        // Вес конструкции
        let weight = project.weight_tons ? project.weight_tons * 1000 : 0; // В кг

        // Монтаж включен
        let assemblyIncluded = assembly.included === true || assembly.available === true;

        return {
            price: price,
            currency: document.currency || 'EUR',
            area: project.total_area_m2 || 0,
            floors: String(project.floors || '1'),
            roofType: roofType,
            structureType: structureType,
            delivery: delivery,
            deliveryMethod: deliveryMethod,
            weight: weight,
            thickness: thickness,
            insulationType: insulationType,
            insulationThickness: insulationThickness,
            energy: energy || '',
            vaporBarrier: vaporBarrier,
            windBarrier: windBarrier,
            fullInsulation: thickness > 0 || insulationThickness > 0,
            factoryPrep: factoryPrep,
            boxCompleteness: boxCompleteness,
            readinessStage: readinessStage,
            foundationType: foundationType,
            foundationInsulation: foundationInsulation,
            waterproofing: waterproofing,
            installationTime: installationTime,
            assemblyIncluded: assemblyIncluded,
            region: region,
            complexity: complexity,
            weatherDependent: true,
            craneNeeded: complexity === 'hard',
            impregnation: impregnation,
            eco: eco,
            fireProtection: fireProtection,
            _extraction: extractedData
        };
    }

    async runAIAnalysis(competitorFile, ourFile) {
        // Проверяем наличие PDFAnalyzer
        if (typeof PDFAnalyzer === 'undefined') {
            this.showNotification('PDFAnalyzer не загружен', 'error');
            return;
        }

        // Получить API ключ
        const apiKey = this.getApiKey();
        if (!apiKey) {
            this.showNotification('API ключ не настроен', 'error');
            this.openAPIModal();
            return;
        }

        // Создать экземпляр PDFAnalyzer
        const pdfAnalyzer = new PDFAnalyzer(apiKey, { debug: true });

        // Check file sizes before starting (max 32MB for Claude API)
        const MAX_FILE_SIZE = 32 * 1024 * 1024;
        if (competitorFile && competitorFile.size > MAX_FILE_SIZE) {
            this.showNotification(`Файл конкурента слишком большой (${(competitorFile.size / 1024 / 1024).toFixed(1)}MB). Максимум: 32MB`, 'error');
            return;
        }
        if (ourFile && ourFile.size > MAX_FILE_SIZE) {
            this.showNotification(`Наш файл слишком большой (${(ourFile.size / 1024 / 1024).toFixed(1)}MB). Максимум: 32MB`, 'error');
            return;
        }

        // Проверяем, что файлы являются PDF
        const isPDFFile = (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

        if (competitorFile && !isPDFFile(competitorFile)) {
            this.showNotification('Файл конкурента должен быть в формате PDF', 'error');
            return;
        }
        if (ourFile && !isPDFFile(ourFile)) {
            this.showNotification('Наш файл должен быть в формате PDF', 'error');
            return;
        }

        // Create progress indicator
        const progressEl = this.createProgressIndicator();
        document.body.appendChild(progressEl);

        try {
            let competitorData = null;
            let ourData = null;

            // SEQUENTIAL PROCESSING - Document 1 (Competitor)
            if (competitorFile) {
                this.updateProgress(progressEl, 0, 'Анализ документа конкурента (1/2)...');

                try {
                    this.updateProgress(progressEl, 5, `Подготовка PDF (${(competitorFile.size / 1024).toFixed(0)} KB)...`);
                    this.updateProgress(progressEl, 10, 'Отправка в Claude API...');

                    const extracted = await pdfAnalyzer.analyzeFromFile(competitorFile);
                    console.log('✅ PDFAnalyzer успешно обработал документ');

                    // Store full extraction with all packages
                    this.competitorExtraction = extracted;

                    // Convert to form data format
                    competitorData = this.convertPDFAnalyzerData(extracted);
                    this.fillForm('competitorForm', competitorData, 'competitor_');

                    // Log extraction results
                    console.log('📋 Competitor extraction:', extracted);

                    this.updateProgress(progressEl, 40, '✓ Документ конкурента успешно проанализирован');

                } catch (error) {
                    console.error('Competitor analysis error:', error);
                    progressEl.remove();

                    // Parse error for better user feedback
                    let errorMessage = error.message;
                    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION')) {
                        errorMessage = 'Ошибка сети. Проверьте подключение к интернету и API ключ. Если проблема сохраняется, попробуйте позже.';
                    } else if (error.message.includes('too large') || error.message.includes('size')) {
                        errorMessage = 'Файл слишком большой. Максимальный размер: 32MB';
                    } else if (error.message.includes('API') || error.message.includes('401') || error.message.includes('403')) {
                        errorMessage = 'Ошибка API ключа. Проверьте правильность ключа в настройках AI.';
                    }

                    // Show retry button for competitor document
                    this.showRetryButton('competitor', competitorFile, ourFile, errorMessage);
                    return;
                }
            }

            // Wait 180 seconds (3 min) before analyzing second document (rate limit protection)
            // Large PDFs can use 20-30k tokens, API limit is 30k/min
            if (competitorFile && ourFile) {
                await this.waitWithCountdown(progressEl, 180);
            }

            // SEQUENTIAL PROCESSING - Document 2 (Our offer)
            if (ourFile) {
                this.updateProgress(progressEl, 50, 'Анализ нашего предложения (2/2)...');

                try {
                    this.updateProgress(progressEl, 55, 'Отправка в Claude API...');

                    const extracted = await pdfAnalyzer.analyzeFromFile(ourFile);
                    console.log('✅ PDFAnalyzer успешно обработал документ');

                    // Store full extraction with all packages
                    this.ourExtraction = extracted;

                    // Convert to form data format
                    ourData = this.convertPDFAnalyzerData(extracted);
                    this.fillForm('ourForm', ourData, 'our_');

                    // Log extraction results
                    console.log('📋 Our offer extraction:', extracted);

                    this.updateProgress(progressEl, 90, '✓ Наше предложение успешно проанализировано');

                } catch (error) {
                    console.error('Our offer analysis error:', error);
                    progressEl.remove();

                    // Parse error for better user feedback
                    let errorMessage = error.message;
                    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION')) {
                        errorMessage = 'Ошибка сети. Проверьте подключение к интернету и API ключ. Если проблема сохраняется, попробуйте позже.';
                    } else if (error.message.includes('too large') || error.message.includes('size')) {
                        errorMessage = 'Файл слишком большой. Максимальный размер: 32MB';
                    } else if (error.message.includes('API') || error.message.includes('401') || error.message.includes('403')) {
                        errorMessage = 'Ошибка API ключа. Проверьте правильность ключа в настройках AI.';
                    }

                    // Show retry button for our document (keep competitor data if it succeeded)
                    this.showRetryButton('our', competitorFile, ourFile, errorMessage);
                    return;
                }
            }

            // If only one file was provided, use demo data for the other
            if (!competitorFile && ourFile) {
                this.loadDemoDataForForm('competitorForm', 'competitor_');
                competitorData = this.getFormData('competitorForm', 'competitor_');
            }
            if (competitorFile && !ourFile) {
                this.loadDemoDataForForm('ourForm', 'our_');
                ourData = this.getFormData('ourForm', 'our_');
            }

            this.updateProgress(progressEl, 95, 'Сравнение данных...');

            // Switch to manual tab to show extracted data
            const manualTab = document.querySelector('[data-tab="manual"]');
            if (manualTab) {
                this.switchTab(manualTab);
            }

            // Store data and perform comparison
            this.competitorData = competitorData || this.getFormData('competitorForm', 'competitor_');
            this.ourData = ourData || this.getFormData('ourForm', 'our_');

            this.updateProgress(progressEl, 100, 'Готово!');

            setTimeout(() => {
                progressEl.remove();

                // Show package overview if multiple packages found
                this.showPackageOverview();

                // Show extraction details (options, transport, assembly, calculator)
                const mainExtraction = this.competitorExtraction || this.ourExtraction;
                if (mainExtraction) {
                    this.showExtractionDetails(mainExtraction);
                }

                this.performComparison();
                this.showNotification('AI анализ завершён!', 'success');
            }, 500);

        } catch (error) {
            console.error('AI Analysis error:', error);
            progressEl.remove();
            this.showNotification(
                'Ошибка AI анализа: ' + error.message,
                'error'
            );
        }
    }

    async waitWithCountdown(progressEl, seconds) {
        return new Promise(resolve => {
            let remaining = seconds;

            const updateCountdown = () => {
                if (remaining <= 0) {
                    resolve();
                    return;
                }

                const minutes = Math.floor(remaining / 60);
                const secs = remaining % 60;
                const timeStr = minutes > 0
                    ? `${minutes} мин ${secs} сек`
                    : `${secs} сек`;

                this.updateProgress(
                    progressEl,
                    45,
                    `Ожидание перед анализом второго документа: ${timeStr}...`
                );

                remaining--;
                setTimeout(updateCountdown, 1000);
            };

            updateCountdown();
        });
    }

    showRetryButton(documentType, competitorFile, ourFile, errorMessage) {
        // Remove any existing retry UI
        const existingRetry = document.querySelector('.ai-retry-container');
        if (existingRetry) existingRetry.remove();

        // Create retry UI
        const retryEl = document.createElement('div');
        retryEl.className = 'ai-retry-container';

        const docLabel = documentType === 'competitor'
            ? 'документа конкурента'
            : 'нашего предложения';

        // Simplify error message for rate limits
        let displayMessage = errorMessage;
        if (errorMessage.includes('лимит запросов') || errorMessage.includes('rate limit')) {
            displayMessage = 'Превышен лимит запросов API. Подождите 2 минуты перед повторной попыткой.';
        }

        retryEl.innerHTML = `
            <div class="ai-retry__content">
                <div class="ai-retry__icon">⚠️</div>
                <div class="ai-retry__message">
                    <strong>Ошибка при анализе ${docLabel}</strong>
                    <p>${displayMessage}</p>
                </div>
                <button class="btn btn--primary ai-retry__button">
                    Попробовать еще раз проанализировать
                </button>
            </div>
        `;

        // Insert after upload section
        const uploadSection = document.querySelector('.upload-section');
        if (uploadSection) {
            uploadSection.parentNode.insertBefore(retryEl, uploadSection.nextSibling);
        } else {
            document.body.appendChild(retryEl);
        }

        // Scroll to retry button
        setTimeout(() => {
            retryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

        // Add click handler
        const retryBtn = retryEl.querySelector('.ai-retry__button');
        retryBtn.addEventListener('click', () => {
            retryEl.remove();
            this.runAIAnalysis(competitorFile, ourFile);
        });
    }

    createProgressIndicator() {
        const el = document.createElement('div');
        el.className = 'ai-progress';
        el.innerHTML = `
            <div class="ai-progress__spinner"></div>
            <div class="ai-progress__content">
                <div class="ai-progress__text">Подготовка...</div>
                <div class="ai-progress__bar">
                    <div class="ai-progress__fill" style="width: 0%"></div>
                </div>
            </div>
        `;
        return el;
    }

    updateProgress(el, percent, text) {
        const textEl = el.querySelector('.ai-progress__text');
        const fillEl = el.querySelector('.ai-progress__fill');
        if (textEl) textEl.textContent = text;
        if (fillEl) fillEl.style.width = `${percent}%`;
    }

    loadDemoDataForForm(formId, prefix) {
        const demoData = prefix === 'competitor_' ? {
            price: 2450000,
            area: 120,
            floors: '2',
            roofType: 'gable',
            structureType: 'frame',
            delivery: 150000,
            deliveryMethod: 'truck',
            weight: 12000,
            thickness: 150,
            insulationType: 'mineral',
            insulationThickness: 150,
            energy: 'C',
            vaporBarrier: false,
            windBarrier: true,
            fullInsulation: false,
            factoryPrep: false,
            foundationType: 'strip',
            foundationInsulation: false,
            waterproofing: true,
            installationTime: 14,
            region: 'central',
            complexity: 'medium',
            weatherDependent: true,
            craneNeeded: false,
            impregnation: false,
            eco: false,
            fireProtection: false
        } : {
            price: 2180000,
            area: 120,
            floors: '2',
            roofType: 'gable',
            structureType: 'prefab',
            delivery: 95000,
            deliveryMethod: 'truck',
            weight: 10500,
            thickness: 200,
            insulationType: 'basalt',
            insulationThickness: 200,
            energy: 'A+',
            vaporBarrier: true,
            windBarrier: true,
            fullInsulation: true,
            factoryPrep: true,
            foundationType: 'slab',
            foundationInsulation: true,
            waterproofing: true,
            installationTime: 10,
            region: 'central',
            complexity: 'easy',
            weatherDependent: false,
            craneNeeded: false,
            impregnation: true,
            eco: true,
            fireProtection: true
        };
        this.fillForm(formId, demoData, prefix);
    }

    performComparison() {
        this.competitorData = this.competitorData || this.getFormData('competitorForm', 'competitor_');
        this.ourData = this.ourData || this.getFormData('ourForm', 'our_');

        // Calculate scores
        const competitorScore = this.calculateScore(this.competitorData);
        const ourScore = this.calculateScore(this.ourData);

        // Determine winner
        const winner = ourScore >= competitorScore ? 'our' : 'competitor';

        // Show results section
        const resultsSection = document.getElementById('results');
        resultsSection.classList.remove('is-hidden');

        // Update winner banner
        this.updateWinnerBanner(winner, winner === 'our' ? ourScore : competitorScore);

        // Update summary cards
        this.updateSummaryCards();

        // Create charts
        this.createRadarChart();
        this.createCostChart();

        // Fill comparison table
        this.fillComparisonTable();

        // Generate recommendations
        this.generateRecommendations();

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        this.showNotification(i18n.t('notif_analysis_complete'), 'success');
    }

    calculateScore(data) {
        let score = 0;

        // Price score (lower is better, normalized to 0-10)
        const maxPrice = Math.max(this.competitorData?.price || 0, this.ourData?.price || 0);
        const priceScore = maxPrice > 0 ? (1 - data.price / maxPrice) * 10 + 5 : 5;
        score += clamp(priceScore, 0, 10) * this.weights.price;

        // Delivery score (lower is better)
        const maxDelivery = Math.max(this.competitorData?.delivery || 1, this.ourData?.delivery || 1);
        const deliveryScore = maxDelivery > 0 ? (1 - data.delivery / maxDelivery) * 10 + 5 : 5;
        score += clamp(deliveryScore, 0, 10) * this.weights.delivery;

        // Weight score (lower is better for easier logistics)
        const maxWeight = Math.max(this.competitorData?.weight || 1, this.ourData?.weight || 1);
        const weightScore = maxWeight > 0 ? (1 - data.weight / maxWeight) * 10 + 5 : 5;
        score += clamp(weightScore, 0, 10) * this.weights.weight;

        // Thickness score (HIGHER is better for insulation)
        const maxThickness = Math.max(this.competitorData?.thickness || 1, this.ourData?.thickness || 1);
        const thicknessScore = maxThickness > 0 ? (data.thickness / maxThickness) * 10 : 5;
        score += clamp(thicknessScore, 0, 10) * this.weights.thickness;

        // Insulation thickness score (HIGHER is better)
        const maxInsThickness = Math.max(this.competitorData?.insulationThickness || 1, this.ourData?.insulationThickness || 1);
        const insThicknessScore = maxInsThickness > 0 ? (data.insulationThickness / maxInsThickness) * 10 : 5;
        score += clamp(insThicknessScore, 0, 10) * this.weights.insulationThickness;

        // Energy score
        const energyScore = this.energyScores[data.energy] || 5;
        score += energyScore * this.weights.energy;

        // Installation time score (lower is better)
        const maxTime = Math.max(this.competitorData?.installationTime || 1, this.ourData?.installationTime || 1);
        const timeScore = maxTime > 0 ? (1 - data.installationTime / maxTime) * 10 + 5 : 5;
        score += clamp(timeScore, 0, 10) * this.weights.installationTime;

        // Complexity score
        const complexityScore = this.complexityScores[data.complexity] || 5;
        score += complexityScore * this.weights.complexity;

        // Boolean features (presence is better)
        score += (data.impregnation ? 10 : 0) * this.weights.impregnation;
        score += (data.eco ? 10 : 0) * this.weights.eco;
        score += (data.fireProtection ? 10 : 0) * this.weights.fireProtection;
        score += (data.vaporBarrier ? 10 : 0) * this.weights.vaporBarrier;
        score += (data.windBarrier ? 10 : 0) * this.weights.windBarrier;
        score += (data.fullInsulation ? 10 : 0) * this.weights.fullInsulation;
        score += (data.factoryPrep ? 10 : 0) * this.weights.factoryPrep;
        score += (data.foundationInsulation ? 10 : 0) * this.weights.foundationInsulation;
        score += (data.waterproofing ? 10 : 0) * this.weights.waterproofing;

        // Weather dependent is negative (not weather dependent is better)
        score += (data.weatherDependent ? 0 : 10) * 0.02;
        // Crane needed is negative (no crane needed is better)
        score += (data.craneNeeded ? 0 : 10) * 0.02;

        return Math.round(score * 10) / 10;
    }

    updateWinnerBanner(winner, score) {
        const winnerName = document.getElementById('winnerName');
        const winnerScore = document.getElementById('winnerScore');
        const winnerBanner = document.getElementById('winnerBanner');

        if (winner === 'our') {
            winnerName.textContent = i18n.t('winner_our');
            winnerBanner.classList.remove('winner--competitor');
            winnerBanner.classList.add('winner--our');
        } else {
            winnerName.textContent = i18n.t('winner_competitor');
            winnerBanner.classList.remove('winner--our');
            winnerBanner.classList.add('winner--competitor');
        }

        winnerScore.textContent = score.toFixed(1);
    }

    updateSummaryCards() {
        const curr = window.currency;

        // Savings
        const savings = this.competitorData.price - this.ourData.price;
        const savingsEl = document.getElementById('savingsValue');
        if (savingsEl) {
            if (savings > 0) {
                savingsEl.textContent = curr ? curr.format(savings) : this.formatCurrency(savings);
                savingsEl.classList.remove('text-red');
                savingsEl.classList.add('text-green');
            } else if (savings < 0) {
                savingsEl.textContent = '+' + (curr ? curr.format(Math.abs(savings)) : this.formatCurrency(Math.abs(savings)));
                savingsEl.classList.remove('text-green');
                savingsEl.classList.add('text-red');
            } else {
                savingsEl.textContent = curr ? curr.format(0) : '0 ₽';
            }
        }

        // Time difference
        const timeDiff = this.competitorData.installationTime - this.ourData.installationTime;
        const timeEl = document.getElementById('timeValue');
        if (timeEl) {
            if (timeDiff > 0) {
                timeEl.textContent = `${timeDiff} ${i18n.pluralizeDays(timeDiff)}`;
            } else if (timeDiff < 0) {
                timeEl.textContent = `+${Math.abs(timeDiff)} ${i18n.pluralizeDays(Math.abs(timeDiff))}`;
            } else {
                timeEl.textContent = i18n.currentLang === 'en' ? 'Same' : 'Одинаково';
            }
        }

        // Energy difference
        const competitorEnergy = this.energyScores[this.competitorData.energy] || 0;
        const ourEnergy = this.energyScores[this.ourData.energy] || 0;
        const energyDiff = ourEnergy - competitorEnergy;
        const energyEl = document.getElementById('energyValue');
        if (energyEl) {
            if (energyDiff > 0) {
                energyEl.textContent = `+${energyDiff} ${i18n.pluralizeClasses(energyDiff)}`;
            } else if (energyDiff < 0) {
                energyEl.textContent = `${energyDiff} ${i18n.pluralizeClasses(Math.abs(energyDiff))}`;
            } else {
                energyEl.textContent = i18n.currentLang === 'en' ? 'Same' : 'Одинаково';
            }
        }
    }

    createRadarChart() {
        const ctx = document.getElementById('radarChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.radarChart) {
            this.radarChart.destroy();
        }

        const labels = [
            i18n.t('chart_price'),
            i18n.t('chart_delivery'),
            i18n.t('chart_weight'),
            i18n.t('chart_insulation'),
            i18n.t('chart_energy'),
            i18n.t('chart_speed'),
            i18n.t('chart_simplicity'),
            i18n.t('chart_protection')
        ];

        // Calculate normalized scores for radar
        const competitorScores = this.getRadarScores(this.competitorData);
        const ourScores = this.getRadarScores(this.ourData);

        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: i18n.t('chart_competitor'),
                        data: competitorScores,
                        fill: true,
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(239, 68, 68, 1)'
                    },
                    {
                        label: i18n.t('chart_our'),
                        data: ourScores,
                        fill: true,
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(34, 197, 94, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            display: false,
                            stepSize: 2
                        },
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    getRadarScores(data) {
        const maxPrice = Math.max(this.competitorData.price, this.ourData.price);
        const maxDelivery = Math.max(this.competitorData.delivery || 1, this.ourData.delivery || 1);
        const maxWeight = Math.max(this.competitorData.weight || 1, this.ourData.weight || 1);
        const maxThickness = Math.max(this.competitorData.thickness || 1, this.ourData.thickness || 1);
        const maxTime = Math.max(this.competitorData.installationTime, this.ourData.installationTime);

        return [
            // Price (lower is better, invert)
            10 - (data.price / maxPrice * 10),
            // Delivery (lower is better, invert)
            10 - ((data.delivery || 0) / maxDelivery * 10),
            // Weight (lower is better, invert)
            10 - ((data.weight || 0) / maxWeight * 10),
            // Thickness (HIGHER is better) - FIXED
            (data.thickness || 0) / maxThickness * 10,
            // Energy
            this.energyScores[data.energy] || 5,
            // Installation time (lower is better, invert)
            10 - (data.installationTime / maxTime * 10),
            // Complexity
            this.complexityScores[data.complexity] || 5,
            // Protection (average of 3 booleans)
            ((data.impregnation ? 10 : 0) + (data.eco ? 10 : 0) + (data.fireProtection ? 10 : 0)) / 3
        ];
    }

    createCostChart() {
        const ctx = document.getElementById('costChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.costChart) {
            this.costChart.destroy();
        }

        const curr = window.currency;

        this.costChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [i18n.t('chart_cost'), i18n.t('chart_delivery'), i18n.t('chart_total')],
                datasets: [
                    {
                        label: i18n.t('chart_competitor'),
                        data: [
                            curr ? curr.convert(this.competitorData.price) : this.competitorData.price,
                            curr ? curr.convert(this.competitorData.delivery || 0) : (this.competitorData.delivery || 0),
                            curr ? curr.convert(this.competitorData.price + (this.competitorData.delivery || 0)) : (this.competitorData.price + (this.competitorData.delivery || 0))
                        ],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1
                    },
                    {
                        label: i18n.t('chart_our'),
                        data: [
                            curr ? curr.convert(this.ourData.price) : this.ourData.price,
                            curr ? curr.convert(this.ourData.delivery || 0) : (this.ourData.delivery || 0),
                            curr ? curr.convert(this.ourData.price + (this.ourData.delivery || 0)) : (this.ourData.price + (this.ourData.delivery || 0))
                        ],
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: (value) => curr ? curr.formatShort(curr.convertBack(value)) : this.formatCurrencyShort(value)
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const rubValue = curr ? curr.convertBack(context.raw) : context.raw;
                                return context.dataset.label + ': ' + (curr ? curr.format(rubValue) : this.formatCurrency(rubValue));
                            }
                        }
                    }
                }
            }
        });
    }

    // Helper to format value or show "—" if empty
    formatValueOrEmpty(value, unit = '', formatFn = null) {
        if (value === null || value === undefined || value === '' || value === 0) {
            return '—';
        }
        if (formatFn) {
            return formatFn(value);
        }
        return unit ? `${value} ${unit}` : String(value);
    }

    // Check if a row has any meaningful data
    hasRowData(compValue, ourValue) {
        const isEmpty = (v) => v === null || v === undefined || v === '' || v === 0 || v === false;
        return !isEmpty(compValue) || !isEmpty(ourValue);
    }

    fillComparisonTable() {
        const tbody = document.querySelector('#comparisonTable tbody');
        if (!tbody) return;

        const curr = window.currency;
        const cd = this.competitorData;
        const od = this.ourData;

        // Get source currencies from PDF data (prices are already in document's currency)
        const cdCurrency = cd.currency || 'EUR';
        const odCurrency = od.currency || 'EUR';

        // Helper for currency formatting - displays in original currency without conversion
        const fmtCurrency = (v, sourceCurrency) => {
            if (!v) return '—';
            // Format price in its original currency (no conversion needed for PDF-extracted prices)
            const symbol = curr ? curr.getSymbol(sourceCurrency) : (sourceCurrency === 'RUB' ? '₽' : (sourceCurrency === 'USD' ? '$' : '€'));
            const formatted = new Intl.NumberFormat(sourceCurrency === 'RUB' ? 'ru-RU' : 'en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: sourceCurrency === 'RUB' ? 0 : 2
            }).format(v);
            return `${formatted} ${symbol}`;
        };

        // Check if currencies match for meaningful diff calculation
        const sameCurrency = cdCurrency === odCurrency;

        const rows = [
            {
                name: i18n.t('row_price'),
                competitor: fmtCurrency(cd.price, cdCurrency),
                our: fmtCurrency(od.price, odCurrency),
                diff: sameCurrency ? this.formatDiff(cd.price - od.price, 'currency', true, cdCurrency) : '—',
                winner: sameCurrency ? (cd.price > od.price ? 'our' : (cd.price < od.price ? 'competitor' : 'tie')) : 'tie',
                hasData: this.hasRowData(cd.price, od.price),
                priority: true
            },
            {
                name: i18n.t('row_delivery'),
                competitor: fmtCurrency(cd.delivery, cdCurrency),
                our: fmtCurrency(od.delivery, odCurrency),
                diff: sameCurrency ? this.formatDiff((cd.delivery || 0) - (od.delivery || 0), 'currency', true, cdCurrency) : '—',
                winner: sameCurrency ? ((cd.delivery || 0) > (od.delivery || 0) ? 'our' : ((cd.delivery || 0) < (od.delivery || 0) ? 'competitor' : 'tie')) : 'tie',
                hasData: this.hasRowData(cd.delivery, od.delivery)
            },
            {
                name: i18n.t('row_structure'),
                competitor: this.getStructureName(cd.structureType) || '—',
                our: this.getStructureName(od.structureType) || '—',
                diff: '—',
                winner: (this.structureScores[od.structureType] || 0) > (this.structureScores[cd.structureType] || 0) ? 'our' :
                    (this.structureScores[od.structureType] || 0) < (this.structureScores[cd.structureType] || 0) ? 'competitor' : 'tie',
                hasData: this.hasRowData(cd.structureType, od.structureType),
                priority: true
            },
            {
                name: i18n.t('row_weight'),
                competitor: this.formatValueOrEmpty(cd.weight, i18n.t('unit_kg'), this.formatNumber.bind(this)),
                our: this.formatValueOrEmpty(od.weight, i18n.t('unit_kg'), this.formatNumber.bind(this)),
                diff: this.hasRowData(cd.weight, od.weight) ? this.formatDiff(cd.weight - od.weight, i18n.t('unit_kg'), true) : '—',
                winner: cd.weight > od.weight ? 'our' : (cd.weight < od.weight ? 'competitor' : 'tie'),
                hasData: this.hasRowData(cd.weight, od.weight)
            },
            {
                name: i18n.t('row_thickness'),
                competitor: this.formatValueOrEmpty(cd.thickness, i18n.t('unit_mm')),
                our: this.formatValueOrEmpty(od.thickness, i18n.t('unit_mm')),
                diff: this.hasRowData(cd.thickness, od.thickness) ? this.formatDiff(od.thickness - cd.thickness, i18n.t('unit_mm'), false) : '—',
                winner: od.thickness > cd.thickness ? 'our' : (od.thickness < cd.thickness ? 'competitor' : 'tie'),
                hasData: this.hasRowData(cd.thickness, od.thickness),
                priority: true
            },
            {
                name: i18n.t('row_insulation_thickness'),
                competitor: this.formatValueOrEmpty(cd.insulationThickness, i18n.t('unit_mm')),
                our: this.formatValueOrEmpty(od.insulationThickness, i18n.t('unit_mm')),
                diff: this.hasRowData(cd.insulationThickness, od.insulationThickness) ?
                    this.formatDiff((od.insulationThickness || 0) - (cd.insulationThickness || 0), i18n.t('unit_mm'), false) : '—',
                winner: (od.insulationThickness || 0) > (cd.insulationThickness || 0) ? 'our' :
                    (od.insulationThickness || 0) < (cd.insulationThickness || 0) ? 'competitor' : 'tie',
                hasData: this.hasRowData(cd.insulationThickness, od.insulationThickness)
            },
            {
                name: i18n.t('row_energy'),
                competitor: cd.energy || '—',
                our: od.energy || '—',
                diff: this.formatEnergyDiff(),
                winner: (this.energyScores[od.energy] || 0) > (this.energyScores[cd.energy] || 0) ? 'our' :
                    (this.energyScores[od.energy] || 0) < (this.energyScores[cd.energy] || 0) ? 'competitor' : 'tie',
                hasData: this.hasRowData(cd.energy, od.energy)
            },
            {
                name: i18n.t('row_foundation'),
                competitor: this.getFoundationName(cd.foundationType) || '—',
                our: this.getFoundationName(od.foundationType) || '—',
                diff: '—',
                winner: (this.foundationScores[od.foundationType] || 0) > (this.foundationScores[cd.foundationType] || 0) ? 'our' :
                    (this.foundationScores[od.foundationType] || 0) < (this.foundationScores[cd.foundationType] || 0) ? 'competitor' : 'tie',
                hasData: this.hasRowData(cd.foundationType, od.foundationType)
            },
            {
                name: i18n.t('row_installation'),
                competitor: this.formatValueOrEmpty(cd.installationTime, i18n.t('unit_days')),
                our: this.formatValueOrEmpty(od.installationTime, i18n.t('unit_days')),
                diff: this.hasRowData(cd.installationTime, od.installationTime) ?
                    this.formatDiff(cd.installationTime - od.installationTime, i18n.currentLang === 'en' ? 'd.' : 'дн.', true) : '—',
                winner: cd.installationTime > od.installationTime ? 'our' :
                    (cd.installationTime < od.installationTime ? 'competitor' : 'tie'),
                hasData: this.hasRowData(cd.installationTime, od.installationTime)
            },
            {
                name: i18n.t('row_complexity'),
                competitor: this.getComplexityName(cd.complexity) || '—',
                our: this.getComplexityName(od.complexity) || '—',
                diff: '—',
                winner: (this.complexityScores[od.complexity] || 0) > (this.complexityScores[cd.complexity] || 0) ? 'our' :
                    (this.complexityScores[od.complexity] || 0) < (this.complexityScores[cd.complexity] || 0) ? 'competitor' : 'tie',
                hasData: this.hasRowData(cd.complexity, od.complexity)
            },
            // Boolean rows - only show if at least one side is true
            { name: i18n.t('row_vapor_barrier'), competitor: cd.vaporBarrier ? i18n.t('yes') : i18n.t('no'), our: od.vaporBarrier ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.vaporBarrier && !cd.vaporBarrier ? 'our' : (!od.vaporBarrier && cd.vaporBarrier ? 'competitor' : 'tie'), hasData: cd.vaporBarrier || od.vaporBarrier },
            { name: i18n.t('row_wind_barrier'), competitor: cd.windBarrier ? i18n.t('yes') : i18n.t('no'), our: od.windBarrier ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.windBarrier && !cd.windBarrier ? 'our' : (!od.windBarrier && cd.windBarrier ? 'competitor' : 'tie'), hasData: cd.windBarrier || od.windBarrier },
            { name: i18n.t('row_full_insulation'), competitor: cd.fullInsulation ? i18n.t('yes') : i18n.t('no'), our: od.fullInsulation ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.fullInsulation && !cd.fullInsulation ? 'our' : (!od.fullInsulation && cd.fullInsulation ? 'competitor' : 'tie'), hasData: cd.fullInsulation || od.fullInsulation },
            { name: i18n.t('row_factory_prep'), competitor: cd.factoryPrep ? i18n.t('yes') : i18n.t('no'), our: od.factoryPrep ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.factoryPrep && !cd.factoryPrep ? 'our' : (!od.factoryPrep && cd.factoryPrep ? 'competitor' : 'tie'), hasData: cd.factoryPrep || od.factoryPrep },
            { name: i18n.t('row_foundation_insulation'), competitor: cd.foundationInsulation ? i18n.t('yes') : i18n.t('no'), our: od.foundationInsulation ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.foundationInsulation && !cd.foundationInsulation ? 'our' : (!od.foundationInsulation && cd.foundationInsulation ? 'competitor' : 'tie'), hasData: cd.foundationInsulation || od.foundationInsulation },
            { name: i18n.t('row_waterproofing'), competitor: cd.waterproofing ? i18n.t('yes') : i18n.t('no'), our: od.waterproofing ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.waterproofing && !cd.waterproofing ? 'our' : (!od.waterproofing && cd.waterproofing ? 'competitor' : 'tie'), hasData: cd.waterproofing || od.waterproofing },
            { name: i18n.t('row_impregnation'), competitor: cd.impregnation ? i18n.t('yes') : i18n.t('no'), our: od.impregnation ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.impregnation && !cd.impregnation ? 'our' : (!od.impregnation && cd.impregnation ? 'competitor' : 'tie'), hasData: cd.impregnation || od.impregnation },
            { name: i18n.t('row_eco'), competitor: cd.eco ? i18n.t('yes') : i18n.t('no'), our: od.eco ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.eco && !cd.eco ? 'our' : (!od.eco && cd.eco ? 'competitor' : 'tie'), hasData: cd.eco || od.eco },
            { name: i18n.t('row_fire'), competitor: cd.fireProtection ? i18n.t('yes') : i18n.t('no'), our: od.fireProtection ? i18n.t('yes') : i18n.t('no'), diff: '—',
              winner: od.fireProtection && !cd.fireProtection ? 'our' : (!od.fireProtection && cd.fireProtection ? 'competitor' : 'tie'), hasData: cd.fireProtection || od.fireProtection }
        ];

        // Filter: show priority rows always, others only if data exists
        const visibleRows = rows.filter(row => row.priority || row.hasData);
        const hiddenCount = rows.length - visibleRows.length;

        tbody.innerHTML = visibleRows.map(row => `
            <tr class="${!row.hasData ? 'row-no-data' : ''}">
                <td>${row.name}</td>
                <td class="${row.competitor === '—' ? 'cell-empty' : ''}">${row.competitor}</td>
                <td class="${row.our === '—' ? 'cell-empty' : ''}">${row.our}</td>
                <td class="${row.diff === '—' ? 'cell-empty' : ''}">${row.diff}</td>
                <td class="winner-cell">
                    ${row.winner === 'our' ? `<span class="winner-badge winner-badge--our">${i18n.t('badge_our')}</span>` :
                row.winner === 'competitor' ? `<span class="winner-badge winner-badge--competitor">${i18n.t('badge_competitor')}</span>` :
                    `<span class="winner-badge winner-badge--tie">${i18n.t('badge_tie')}</span>`}
                </td>
            </tr>
        `).join('');

        // Show info about hidden rows
        if (hiddenCount > 0) {
            tbody.innerHTML += `
                <tr class="row-hidden-info">
                    <td colspan="5" style="text-align:center; color: var(--color-text-muted); font-size: var(--font-size-xs); padding: var(--space-md);">
                        + ${hiddenCount} параметров скрыто (нет данных)
                    </td>
                </tr>
            `;
        }
    }

    generateRecommendations() {
        const list = document.getElementById('recommendationsList');
        if (!list) return;

        const curr = window.currency;
        const recommendations = [];

        // Price recommendation
        if (this.ourData.price < this.competitorData.price) {
            const savings = this.competitorData.price - this.ourData.price;
            const percent = Math.round(savings / this.competitorData.price * 100);
            const amountFormatted = curr ? curr.format(savings) : this.formatCurrency(savings);
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_cheaper', { amount: amountFormatted, percent: percent })
            });
        } else if (this.ourData.price > this.competitorData.price) {
            recommendations.push({
                type: 'warning',
                text: i18n.t('rec_more_expensive')
            });
        }

        // Energy efficiency
        const ourEnergy = this.energyScores[this.ourData.energy] || 0;
        const compEnergy = this.energyScores[this.competitorData.energy] || 0;
        if (ourEnergy > compEnergy) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_energy_better', { class: this.ourData.energy })
            });
        }

        // Installation time
        if (this.ourData.installationTime < this.competitorData.installationTime) {
            const diff = this.competitorData.installationTime - this.ourData.installationTime;
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_faster', { days: `${diff} ${i18n.pluralizeDays(diff)}` })
            });
        }

        // Wood protection
        if (this.ourData.impregnation && !this.competitorData.impregnation) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_impregnation')
            });
        }

        // Fire protection
        if (this.ourData.fireProtection && !this.competitorData.fireProtection) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_fire')
            });
        }

        // Eco materials
        if (this.ourData.eco && !this.competitorData.eco) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_eco')
            });
        }

        // Thickness - FIXED: thicker is better
        if (this.ourData.thickness > this.competitorData.thickness) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_thickness', { mm: this.ourData.thickness })
            });
        }

        // Complexity
        if ((this.complexityScores[this.ourData.complexity] || 0) > (this.complexityScores[this.competitorData.complexity] || 0)) {
            recommendations.push({
                type: 'positive',
                text: i18n.t('rec_simpler')
            });
        }

        // Default recommendation if nothing special
        if (recommendations.length === 0) {
            recommendations.push({
                type: 'info',
                text: i18n.t('rec_default')
            });
        }

        list.innerHTML = recommendations.map(rec => `
            <li class="recommendation recommendation--${rec.type}">
                <span class="recommendation__icon">
                    ${rec.type === 'positive' ? '✓' : rec.type === 'warning' ? '!' : 'i'}
                </span>
                <span class="recommendation__text">${rec.text}</span>
            </li>
        `).join('');
    }

    updateResultsLanguage() {
        // Rebuild results with new language
        this.updateWinnerBanner(
            this.calculateScore(this.ourData) >= this.calculateScore(this.competitorData) ? 'our' : 'competitor',
            Math.max(this.calculateScore(this.ourData), this.calculateScore(this.competitorData))
        );
        this.updateSummaryCards();
        this.createRadarChart();
        this.createCostChart();
        this.fillComparisonTable();
        this.generateRecommendations();

        // Update static text
        document.getElementById('winnerScoreLabel')?.textContent;
    }

    updateResultsCurrency() {
        // Update only currency-related displays
        this.updateSummaryCards();
        this.createCostChart();
        this.fillComparisonTable();
        this.generateRecommendations();
    }

    resetAnalysis() {
        // Hide results
        const resultsSection = document.getElementById('results');
        resultsSection.classList.add('is-hidden');

        // Clear data
        this.competitorData = null;
        this.ourData = null;

        // Reset forms
        const forms = document.querySelectorAll('#competitorForm input, #competitorForm select, #ourForm input, #ourForm select');
        forms.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = input.name.startsWith('our_');
            } else {
                input.value = '';
            }
        });

        // Reset file uploads
        ['competitorZone', 'ourZone'].forEach(zoneId => {
            const zone = document.getElementById(zoneId);
            if (zone) {
                zone.classList.remove('has-file');
                zone.file = null;
            }
        });

        // Destroy charts
        if (this.radarChart) {
            this.radarChart.destroy();
            this.radarChart = null;
        }
        if (this.costChart) {
            this.costChart.destroy();
            this.costChart = null;
        }

        // Scroll to analyzer
        document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });

        this.showNotification(i18n.t('notif_ready_new'), 'info');
    }

    downloadPDF() {
        this.showNotification(i18n.t('notif_pdf_soon'), 'info');
        window.print();
    }

    // Utility methods
    formatCurrency(value) {
        const formatted = this.formatPrice(value);
        return `${formatted} ${this._currentCurrencySymbol || '€'}`;
    }

    formatCurrencyShort(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + ' млн';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + ' тыс';
        }
        return value.toString();
    }

    formatNumber(value) {
        return this.formatPrice(value);
    }

    formatDiff(value, unit, lowerIsBetter, sourceCurrency = null) {
        if (value === 0) return '—';

        const curr = window.currency;
        const isPositive = lowerIsBetter ? value > 0 : value < 0;
        const absValue = Math.abs(value);

        let formatted;
        if (unit === 'currency') {
            // For currency, use source currency if provided (no conversion)
            if (sourceCurrency && curr) {
                const symbol = curr.getSymbol(sourceCurrency);
                const fmtValue = new Intl.NumberFormat(sourceCurrency === 'RUB' ? 'ru-RU' : 'en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: sourceCurrency === 'RUB' ? 0 : 2
                }).format(absValue);
                formatted = `${fmtValue} ${symbol}`;
            } else {
                formatted = curr ? curr.format(absValue) : this.formatCurrency(absValue);
            }
        } else {
            formatted = this.formatNumber(absValue) + ' ' + unit;
        }

        if (isPositive) {
            return `<span class="text-green">-${formatted}</span>`;
        } else {
            return `<span class="text-red">+${formatted}</span>`;
        }
    }

    formatEnergyDiff() {
        const ourScore = this.energyScores[this.ourData.energy] || 0;
        const compScore = this.energyScores[this.competitorData.energy] || 0;
        const diff = ourScore - compScore;

        if (diff === 0) return '—';
        if (diff > 0) {
            return `<span class="text-green">+${diff} ${i18n.pluralizeClasses(diff)}</span>`;
        }
        return `<span class="text-red">${diff} ${i18n.pluralizeClasses(Math.abs(diff))}</span>`;
    }

    getComplexityName(complexity) {
        const names = {
            'easy': i18n.t('complexity_easy_short'),
            'medium': i18n.t('complexity_medium_short'),
            'hard': i18n.t('complexity_hard_short')
        };
        return names[complexity] || '—';
    }

    getStructureName(structureType) {
        const names = {
            'prefab': i18n.t('structure_prefab'),
            'frame': i18n.t('structure_frame'),
            'brick': i18n.t('structure_brick'),
            'aerated': i18n.t('structure_aerated'),
            'concrete': i18n.t('structure_concrete'),
            'clt': i18n.t('structure_clt')
        };
        return names[structureType] || '—';
    }

    getFoundationName(foundationType) {
        const names = {
            'slab': i18n.t('foundation_slab'),
            'strip': i18n.t('foundation_strip'),
            'pile': i18n.t('foundation_pile'),
            'screw': i18n.t('foundation_screw'),
            'basement': i18n.t('foundation_basement')
        };
        return names[foundationType] || '—';
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span class="notification__icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '!' : 'i'}
            </span>
            <span class="notification__message">${message}</span>
        `;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('is-visible'), 10);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('is-visible');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Show package overview section with all found packages
    showPackageOverview() {
        const overview = document.getElementById('packageOverview');
        const competitorList = document.getElementById('competitorPackages');
        const ourList = document.getElementById('ourPackages');
        const competitorCompany = document.getElementById('competitorCompany');
        const ourCompany = document.getElementById('ourCompany');

        if (!overview) return;

        const compExtraction = this.competitorExtraction || {};
        const ourExtraction = this.ourExtraction || {};

        // Support both new format (packages) and old format (pricing.packages)
        const compPackages = compExtraction.packages || compExtraction.pricing?.packages || [];
        const ourPackages = ourExtraction.packages || ourExtraction.pricing?.packages || [];

        // Only show if at least one side has packages
        const hasPackages = compPackages.length > 0 || ourPackages.length > 0;

        if (!hasPackages) {
            overview.classList.add('is-hidden');
            return;
        }

        overview.classList.remove('is-hidden');

        // Set company names (support both document_info and document)
        if (competitorCompany) {
            competitorCompany.textContent = compExtraction.document_info?.company || compExtraction.document?.company || '';
        }
        if (ourCompany) {
            ourCompany.textContent = ourExtraction.document_info?.company || ourExtraction.document?.company || '';
        }

        // Render competitor packages
        if (competitorList) {
            if (compPackages.length > 0) {
                competitorList.innerHTML = compPackages.map((pkg, i) => this.renderPackageCard(pkg, i, 'competitor')).join('');
                // Select first by default
                const firstCard = competitorList.querySelector('.package-card');
                if (firstCard) firstCard.classList.add('is-selected');
            } else {
                // Show single extracted data as a "package"
                const docInfo = compExtraction.document_info || compExtraction.document || {};
                const singlePkg = {
                    name: docInfo.project || 'Данные из документа',
                    price: compExtraction.pricing?.total,
                    includes: `Площадь: ${compExtraction.building?.area || '?'} м²`
                };
                competitorList.innerHTML = this.renderPackageCard(singlePkg, 0, 'competitor');
                competitorList.querySelector('.package-card')?.classList.add('is-selected');
            }
            this.bindPackageCardEvents(competitorList, 'competitor');
        }

        // Render our packages
        if (ourList) {
            if (ourPackages.length > 0) {
                ourList.innerHTML = ourPackages.map((pkg, i) => this.renderPackageCard(pkg, i, 'our')).join('');
                const firstCard = ourList.querySelector('.package-card');
                if (firstCard) firstCard.classList.add('is-selected');
            } else {
                const docInfo = ourExtraction.document_info || ourExtraction.document || {};
                const singlePkg = {
                    name: docInfo.project || 'Данные из документа',
                    price: ourExtraction.pricing?.total,
                    includes: `Площадь: ${ourExtraction.building?.area || '?'} м²`
                };
                ourList.innerHTML = this.renderPackageCard(singlePkg, 0, 'our');
                ourList.querySelector('.package-card')?.classList.add('is-selected');
            }
            this.bindPackageCardEvents(ourList, 'our');
        }

        // Bind compare button
        const compareBtn = document.getElementById('compareSelectedBtn');
        if (compareBtn) {
            compareBtn.onclick = () => this.compareSelectedPackages();
        }
    }

    renderPackageCard(pkg, index, type) {
        const currencySymbol = this.getCurrencySymbol(pkg.currency || 'EUR');
        const price = pkg.price ? this.formatPrice(pkg.price) + ' ' + currencySymbol : 'Цена не указана';
        const building = type === 'competitor' ? this.competitorExtraction?.building : this.ourExtraction?.building;

        let tags = [];
        // New format fields
        if (pkg.wall_thickness_mm) tags.push(`${pkg.wall_thickness_mm} мм`);
        if (pkg.u_value) tags.push(`U: ${pkg.u_value}`);
        // Building info
        if (building?.area) tags.push(`${building.area} м²`);
        if (building?.floors) tags.push(`${building.floors} эт.`);

        // Description from includes or included_items
        const desc = pkg.includes || (pkg.included_items ? pkg.included_items.slice(0, 2).join(', ') : '');

        return `
            <button class="package-card" data-index="${index}" data-type="${type}">
                <div class="package-card__name">${pkg.name || `Пакет ${index + 1}`}</div>
                <div class="package-card__price">${price}</div>
                ${desc ? `<div class="package-card__desc">${desc}</div>` : ''}
                ${tags.length > 0 ? `
                    <div class="package-card__details">
                        ${tags.map(t => `<span class="package-card__tag">${t}</span>`).join('')}
                    </div>
                ` : ''}
            </button>
        `;
    }

    bindPackageCardEvents(container, type) {
        const cards = container.querySelectorAll('.package-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Deselect all in this container
                cards.forEach(c => c.classList.remove('is-selected'));
                // Select clicked
                card.classList.add('is-selected');
            });
        });
    }

    compareSelectedPackages() {
        const compCard = document.querySelector('#competitorPackages .package-card.is-selected');
        const ourCard = document.querySelector('#ourPackages .package-card.is-selected');

        if (!compCard || !ourCard) {
            this.showNotification('Выберите пакеты для сравнения', 'warning');
            return;
        }

        const compIndex = parseInt(compCard.dataset.index);
        const ourIndex = parseInt(ourCard.dataset.index);

        const compExtraction = this.competitorExtraction || {};
        const ourExtraction = this.ourExtraction || {};

        // Support both new format (packages) and old format (pricing.packages)
        const compPackages = compExtraction.packages || compExtraction.pricing?.packages || [];
        const ourPackages = ourExtraction.packages || ourExtraction.pricing?.packages || [];

        // Update extraction with selected package data
        if (compPackages[compIndex]) {
            // Set selected package as the main one for form conversion
            compExtraction._selectedPackageIndex = compIndex;
            // Handle package name - can be string or object {original, translated}
            const compName = compPackages[compIndex].name;
            compExtraction._selectedPackage = typeof compName === 'object'
                ? (compName.translated || compName.original || '')
                : (compName || '');
            // For backwards compatibility, also update pricing
            if (!compExtraction.pricing) compExtraction.pricing = {};
            compExtraction.pricing.total = compPackages[compIndex].price;
        }
        if (ourPackages[ourIndex]) {
            ourExtraction._selectedPackageIndex = ourIndex;
            // Handle package name - can be string or object {original, translated}
            const ourName = ourPackages[ourIndex].name;
            ourExtraction._selectedPackage = typeof ourName === 'object'
                ? (ourName.translated || ourName.original || '')
                : (ourName || '');
            if (!ourExtraction.pricing) ourExtraction.pricing = {};
            ourExtraction.pricing.total = ourPackages[ourIndex].price;
        }

        // Convert to form data and update
        this.competitorData = this.convertPDFAnalyzerData(compExtraction);
        this.ourData = this.convertPDFAnalyzerData(ourExtraction);

        // Fill forms
        this.fillForm('competitorForm', this.competitorData, 'competitor_');
        this.fillForm('ourForm', this.ourData, 'our_');

        // Re-run comparison
        this.performComparison();

        // Update calculator if extraction details are currently shown
        if (this._currentExtraction) {
            // Update calculator if we're showing details for the changed extraction
            if (this._currentExtraction === compExtraction || this._currentExtraction === ourExtraction) {
                this.updateCalculator(this._currentExtraction);
            }
        }

        this.showNotification('Сравнение обновлено', 'success');

        // Scroll to results
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // ========== Extraction Details Display ==========

    // Show extraction details section (options, transport, assembly, calculator)
    showExtractionDetails(extraction) {
        const section = document.getElementById('extractionDetails');
        if (!section || !extraction) return;

        section.classList.remove('is-hidden');

        // Save current extraction for option/transport handlers
        this._currentExtraction = extraction;

        // Detect currency from document (returned by Claude API)
        const document = extraction.document || {};
        if (document.currency) {
            this._currentCurrency = document.currency.toUpperCase();
            this._currentCurrencySymbol = this.getCurrencySymbol(this._currentCurrency);
        } else {
            this._currentCurrency = 'EUR';
            this._currentCurrencySymbol = '€';
        }
        // Store source currency for proper conversion
        extraction._sourceCurrency = this._currentCurrency;

        this.displayDocumentInfo(extraction);
        this.displayOptions(extraction);
        this.displayTransport(extraction);
        this.displayAssembly(extraction);
        this.bindOptionsTabs();
        this.updateCalculator(extraction);
    }

    // Display document info
    displayDocumentInfo(extraction) {
        const container = document.getElementById('documentInfo');
        if (!container) return;

        const doc = extraction.document_info || extraction.document || {};

        container.innerHTML = `
            <div class="doc-info-grid">
                ${doc.number ? `<div class="doc-info__item"><span class="doc-info__label">Номер:</span><span class="doc-info__value">${doc.number}</span></div>` : ''}
                ${doc.date ? `<div class="doc-info__item"><span class="doc-info__label">Дата:</span><span class="doc-info__value">${doc.date}</span></div>` : ''}
                ${doc.company ? `<div class="doc-info__item"><span class="doc-info__label">Компания:</span><span class="doc-info__value">${doc.company}</span></div>` : ''}
                ${doc.client ? `<div class="doc-info__item"><span class="doc-info__label">Клиент:</span><span class="doc-info__value">${doc.client}</span></div>` : ''}
                ${doc.location ? `<div class="doc-info__item"><span class="doc-info__label">Место строительства:</span><span class="doc-info__value">${doc.location}</span></div>` : ''}
            </div>
        `;
    }

    // Display options by category
    displayOptions(extraction) {
        const container = document.getElementById('optionsList');
        const section = document.getElementById('optionsSection');
        if (!container) return;

        const options = extraction.options || {};
        const categories = {
            'external_walls': 'Наружные стены',
            'internal_walls': 'Внутренние стены',
            'roof': 'Крыша',
            'floor': 'Пол/Перекрытия',
            'treatment': 'Обработка древесины'
        };

        // Check if any options exist
        const hasOptions = Object.values(options).some(cat => cat && cat.length > 0);
        if (!hasOptions) {
            section?.classList.add('is-hidden');
            return;
        }
        section?.classList.remove('is-hidden');

        // Store options data for calculator
        this._currentOptions = options;
        this._selectedOptions = new Set();

        // Display first category with options
        const firstCategory = Object.keys(categories).find(cat => options[cat]?.length > 0) || 'external_walls';
        this.displayOptionsCategory(firstCategory);

        // Update tab active state
        document.querySelectorAll('.options-tab').forEach(tab => {
            const cat = tab.dataset.category;
            const hasItems = options[cat]?.length > 0;
            tab.classList.toggle('is-disabled', !hasItems);
            tab.classList.toggle('is-active', cat === firstCategory);
        });
    }

    // Display options for a specific category
    displayOptionsCategory(category) {
        const container = document.getElementById('optionsList');
        if (!container || !this._currentOptions) return;

        const items = this._currentOptions[category] || [];

        if (items.length === 0) {
            container.innerHTML = '<div class="options-empty">Нет опций в этой категории</div>';
            return;
        }

        container.innerHTML = items.map((opt, idx) => {
            const price = opt.price ? `${this.formatPrice(opt.price)} ${this._currentCurrencySymbol}` : 'N/A';
            const isSelected = this._selectedOptions.has(`${category}_${idx}`);
            const isAvailable = opt.price !== null && opt.price !== undefined;

            return `
                <label class="option-item ${!isAvailable ? 'is-unavailable' : ''}" data-category="${category}" data-index="${idx}">
                    <input type="checkbox"
                           class="option-checkbox"
                           ${isSelected ? 'checked' : ''}
                           ${!isAvailable ? 'disabled' : ''}
                           data-price="${opt.price || 0}">
                    <div class="option-item__content">
                        <div class="option-item__header">
                            ${opt.code ? `<span class="option-item__code">${opt.code}</span>` : ''}
                            <span class="option-item__name">${opt.name}</span>
                        </div>
                        ${opt.note ? `<div class="option-item__note">${opt.note}</div>` : ''}
                    </div>
                    <span class="option-item__price ${!isAvailable ? 'is-na' : ''}">${price}</span>
                </label>
            `;
        }).join('');

        // Bind checkbox events
        container.querySelectorAll('.option-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const item = e.target.closest('.option-item');
                const key = `${item.dataset.category}_${item.dataset.index}`;
                if (e.target.checked) {
                    this._selectedOptions.add(key);
                } else {
                    this._selectedOptions.delete(key);
                }
                this.updateCalculator(this._currentExtraction);
            });
        });
    }

    // Display transport options
    displayTransport(extraction) {
        const container = document.getElementById('transportList');
        const section = document.getElementById('transportSection');
        if (!container) return;

        const transport = extraction.transport || [];

        if (transport.length === 0) {
            section?.classList.add('is-hidden');
            return;
        }
        section?.classList.remove('is-hidden');

        this._currentTransport = transport;
        this._selectedTransportIndex = 0;

        container.innerHTML = transport.map((t, idx) => {
            const price = t.price ? `${this.formatPrice(t.price)} ${this._currentCurrencySymbol}` : 'N/A';
            return `
                <label class="transport-item ${idx === 0 ? 'is-selected' : ''}" data-index="${idx}">
                    <input type="radio" name="transport" class="transport-radio" ${idx === 0 ? 'checked' : ''} data-price="${t.price || 0}">
                    <div class="transport-item__content">
                        <span class="transport-item__package">${t.package || `Вариант ${idx + 1}`}</span>
                        ${t.trucks ? `<span class="transport-item__trucks">${t.trucks} фур${t.trucks > 1 ? 'ы' : 'а'}</span>` : ''}
                    </div>
                    <span class="transport-item__price">${price}</span>
                </label>
            `;
        }).join('');

        // Bind radio events
        container.querySelectorAll('.transport-radio').forEach(radio => {
            radio.addEventListener('change', (e) => {
                container.querySelectorAll('.transport-item').forEach(item => item.classList.remove('is-selected'));
                e.target.closest('.transport-item').classList.add('is-selected');
                this._selectedTransportIndex = parseInt(e.target.closest('.transport-item').dataset.index);
                this.updateCalculator(this._currentExtraction);
            });
        });
    }

    // Display assembly info
    displayAssembly(extraction) {
        const container = document.getElementById('assemblyInfo');
        const section = document.getElementById('assemblySection');
        if (!container) return;

        const assembly = extraction.assembly || {};

        if (!assembly.duration_days && !assembly.team_size && !assembly.equipment) {
            section?.classList.add('is-hidden');
            return;
        }
        section?.classList.remove('is-hidden');

        container.innerHTML = `
            <div class="assembly-grid">
                ${assembly.duration_days ? `
                    <div class="assembly-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        <span class="assembly-item__label">Срок:</span>
                        <span class="assembly-item__value">${assembly.duration_days} дней</span>
                    </div>
                ` : ''}
                ${assembly.team_size ? `
                    <div class="assembly-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span class="assembly-item__label">Бригада:</span>
                        <span class="assembly-item__value">${assembly.team_size} человек</span>
                    </div>
                ` : ''}
                ${assembly.equipment && assembly.equipment.length > 0 ? `
                    <div class="assembly-item assembly-item--full">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                        <span class="assembly-item__label">Оборудование:</span>
                        <span class="assembly-item__value">${assembly.equipment.join(', ')}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Bind options tabs events
    bindOptionsTabs() {
        document.querySelectorAll('.options-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.classList.contains('is-disabled')) return;

                document.querySelectorAll('.options-tab').forEach(t => t.classList.remove('is-active'));
                tab.classList.add('is-active');
                this.displayOptionsCategory(tab.dataset.category);
            });
        });
    }

    // Update calculator totals
    updateCalculator(extraction) {
        if (!extraction) return;

        const packages = extraction.packages || [];
        const selectedPkgIndex = extraction._selectedPackageIndex || 0;
        const selectedPkg = packages[selectedPkgIndex] || packages[0] || {};

        // Package price
        const packagePrice = selectedPkg.price || 0;
        const currencySymbol = this._currentCurrencySymbol || '€';

        // Handle package name - can be string or object {original, translated}
        let pkgName = 'Не выбран';
        if (selectedPkg.name) {
            if (typeof selectedPkg.name === 'object') {
                pkgName = selectedPkg.name.translated || selectedPkg.name.original || 'Не выбран';
            } else {
                pkgName = selectedPkg.name;
            }
        }
        document.getElementById('calcPackageName').textContent = pkgName;
        document.getElementById('calcPackagePrice').textContent = `${this.formatPrice(packagePrice)} ${currencySymbol}`;

        // Options price
        let optionsPrice = 0;
        if (this._selectedOptions && this._currentOptions) {
            this._selectedOptions.forEach(key => {
                const [cat, idx] = key.split('_');
                const opt = this._currentOptions[cat]?.[parseInt(idx)];
                if (opt?.price) optionsPrice += opt.price;
            });
        }
        document.getElementById('calcOptionsPrice').textContent = `${this.formatPrice(optionsPrice)} ${currencySymbol}`;

        // Transport price
        let transportPrice = 0;
        if (this._currentTransport && this._selectedTransportIndex !== undefined) {
            transportPrice = this._currentTransport[this._selectedTransportIndex]?.price || 0;
        }
        document.getElementById('calcTransportPrice').textContent = `${this.formatPrice(transportPrice)} ${currencySymbol}`;

        // Total
        const total = packagePrice + optionsPrice + transportPrice;
        document.getElementById('calcTotal').textContent = `${this.formatPrice(total)} ${currencySymbol}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.analyzer = new EstimateAnalyzer();
});
