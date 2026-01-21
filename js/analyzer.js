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

    init() {
        this.bindEvents();

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

        // Number inputs - convert currency for display
        const input_price = form.querySelector(`[name="${prefix}price"]`);
        const input_delivery = form.querySelector(`[name="${prefix}delivery"]`);

        if (input_price && data.price) {
            const displayValue = curr && curr.currentCurrency !== 'RUB'
                ? Math.round(curr.convert(data.price))
                : data.price;
            input_price.value = displayValue;
        }

        if (input_delivery && data.delivery) {
            const displayValue = curr && curr.currentCurrency !== 'RUB'
                ? Math.round(curr.convert(data.delivery))
                : data.delivery;
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
            'complexity': 'complexity'
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
            'fire_protection': 'fireProtection'
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

        // Get price values and convert to RUB if needed
        let priceValue = parseFloat(form.querySelector(`[name="${prefix}price"]`)?.value) || 0;
        let deliveryValue = parseFloat(form.querySelector(`[name="${prefix}delivery"]`)?.value) || 0;

        // Convert back to RUB for internal calculations
        if (curr && curr.currentCurrency !== 'RUB') {
            priceValue = curr.convertBack(priceValue);
            deliveryValue = curr.convertBack(deliveryValue);
        }

        data.price = priceValue;
        data.delivery = deliveryValue;

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

    runAnalysis() {
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

            this.showNotification(i18n.t('notif_analyzing'), 'info');

            setTimeout(() => {
                this.loadDemoData();
                setTimeout(() => {
                    this.performComparison();
                }, 500);
            }, 1000);

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

    fillComparisonTable() {
        const tbody = document.querySelector('#comparisonTable tbody');
        if (!tbody) return;

        const curr = window.currency;

        const rows = [
            {
                name: i18n.t('row_price'),
                competitor: curr ? curr.format(this.competitorData.price) : this.formatCurrency(this.competitorData.price),
                our: curr ? curr.format(this.ourData.price) : this.formatCurrency(this.ourData.price),
                diff: this.formatDiff(this.competitorData.price - this.ourData.price, 'currency', true),
                winner: this.competitorData.price > this.ourData.price ? 'our' : (this.competitorData.price < this.ourData.price ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_delivery'),
                competitor: curr ? curr.format(this.competitorData.delivery || 0) : this.formatCurrency(this.competitorData.delivery || 0),
                our: curr ? curr.format(this.ourData.delivery || 0) : this.formatCurrency(this.ourData.delivery || 0),
                diff: this.formatDiff((this.competitorData.delivery || 0) - (this.ourData.delivery || 0), 'currency', true),
                winner: (this.competitorData.delivery || 0) > (this.ourData.delivery || 0) ? 'our' : ((this.competitorData.delivery || 0) < (this.ourData.delivery || 0) ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_structure'),
                competitor: this.getStructureName(this.competitorData.structureType),
                our: this.getStructureName(this.ourData.structureType),
                diff: '—',
                winner: (this.structureScores[this.ourData.structureType] || 0) > (this.structureScores[this.competitorData.structureType] || 0) ? 'our' :
                    (this.structureScores[this.ourData.structureType] || 0) < (this.structureScores[this.competitorData.structureType] || 0) ? 'competitor' : 'tie'
            },
            {
                name: i18n.t('row_weight'),
                competitor: this.formatNumber(this.competitorData.weight) + ' ' + i18n.t('unit_kg'),
                our: this.formatNumber(this.ourData.weight) + ' ' + i18n.t('unit_kg'),
                diff: this.formatDiff(this.competitorData.weight - this.ourData.weight, i18n.t('unit_kg'), true),
                winner: this.competitorData.weight > this.ourData.weight ? 'our' : (this.competitorData.weight < this.ourData.weight ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_thickness'),
                competitor: this.competitorData.thickness + ' ' + i18n.t('unit_mm'),
                our: this.ourData.thickness + ' ' + i18n.t('unit_mm'),
                diff: this.formatDiff(this.ourData.thickness - this.competitorData.thickness, i18n.t('unit_mm'), false),
                winner: this.ourData.thickness > this.competitorData.thickness ? 'our' : (this.ourData.thickness < this.competitorData.thickness ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_insulation_thickness'),
                competitor: (this.competitorData.insulationThickness || 0) + ' ' + i18n.t('unit_mm'),
                our: (this.ourData.insulationThickness || 0) + ' ' + i18n.t('unit_mm'),
                diff: this.formatDiff((this.ourData.insulationThickness || 0) - (this.competitorData.insulationThickness || 0), i18n.t('unit_mm'), false),
                winner: (this.ourData.insulationThickness || 0) > (this.competitorData.insulationThickness || 0) ? 'our' :
                    (this.ourData.insulationThickness || 0) < (this.competitorData.insulationThickness || 0) ? 'competitor' : 'tie'
            },
            {
                name: i18n.t('row_energy'),
                competitor: this.competitorData.energy || '—',
                our: this.ourData.energy || '—',
                diff: this.formatEnergyDiff(),
                winner: (this.energyScores[this.ourData.energy] || 0) > (this.energyScores[this.competitorData.energy] || 0) ? 'our' :
                    (this.energyScores[this.ourData.energy] || 0) < (this.energyScores[this.competitorData.energy] || 0) ? 'competitor' : 'tie'
            },
            {
                name: i18n.t('row_foundation'),
                competitor: this.getFoundationName(this.competitorData.foundationType),
                our: this.getFoundationName(this.ourData.foundationType),
                diff: '—',
                winner: (this.foundationScores[this.ourData.foundationType] || 0) > (this.foundationScores[this.competitorData.foundationType] || 0) ? 'our' :
                    (this.foundationScores[this.ourData.foundationType] || 0) < (this.foundationScores[this.competitorData.foundationType] || 0) ? 'competitor' : 'tie'
            },
            {
                name: i18n.t('row_installation'),
                competitor: this.competitorData.installationTime + ' ' + i18n.t('unit_days'),
                our: this.ourData.installationTime + ' ' + i18n.t('unit_days'),
                diff: this.formatDiff(this.competitorData.installationTime - this.ourData.installationTime, i18n.currentLang === 'en' ? 'd.' : 'дн.', true),
                winner: this.competitorData.installationTime > this.ourData.installationTime ? 'our' :
                    (this.competitorData.installationTime < this.ourData.installationTime ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_complexity'),
                competitor: this.getComplexityName(this.competitorData.complexity),
                our: this.getComplexityName(this.ourData.complexity),
                diff: '—',
                winner: (this.complexityScores[this.ourData.complexity] || 0) > (this.complexityScores[this.competitorData.complexity] || 0) ? 'our' :
                    (this.complexityScores[this.ourData.complexity] || 0) < (this.complexityScores[this.competitorData.complexity] || 0) ? 'competitor' : 'tie'
            },
            {
                name: i18n.t('row_vapor_barrier'),
                competitor: this.competitorData.vaporBarrier ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.vaporBarrier ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.vaporBarrier && !this.competitorData.vaporBarrier ? 'our' :
                    (!this.ourData.vaporBarrier && this.competitorData.vaporBarrier ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_wind_barrier'),
                competitor: this.competitorData.windBarrier ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.windBarrier ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.windBarrier && !this.competitorData.windBarrier ? 'our' :
                    (!this.ourData.windBarrier && this.competitorData.windBarrier ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_full_insulation'),
                competitor: this.competitorData.fullInsulation ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.fullInsulation ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.fullInsulation && !this.competitorData.fullInsulation ? 'our' :
                    (!this.ourData.fullInsulation && this.competitorData.fullInsulation ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_factory_prep'),
                competitor: this.competitorData.factoryPrep ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.factoryPrep ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.factoryPrep && !this.competitorData.factoryPrep ? 'our' :
                    (!this.ourData.factoryPrep && this.competitorData.factoryPrep ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_foundation_insulation'),
                competitor: this.competitorData.foundationInsulation ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.foundationInsulation ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.foundationInsulation && !this.competitorData.foundationInsulation ? 'our' :
                    (!this.ourData.foundationInsulation && this.competitorData.foundationInsulation ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_waterproofing'),
                competitor: this.competitorData.waterproofing ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.waterproofing ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.waterproofing && !this.competitorData.waterproofing ? 'our' :
                    (!this.ourData.waterproofing && this.competitorData.waterproofing ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_impregnation'),
                competitor: this.competitorData.impregnation ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.impregnation ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.impregnation && !this.competitorData.impregnation ? 'our' :
                    (!this.ourData.impregnation && this.competitorData.impregnation ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_eco'),
                competitor: this.competitorData.eco ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.eco ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.eco && !this.competitorData.eco ? 'our' :
                    (!this.ourData.eco && this.competitorData.eco ? 'competitor' : 'tie')
            },
            {
                name: i18n.t('row_fire'),
                competitor: this.competitorData.fireProtection ? i18n.t('yes') : i18n.t('no'),
                our: this.ourData.fireProtection ? i18n.t('yes') : i18n.t('no'),
                diff: '—',
                winner: this.ourData.fireProtection && !this.competitorData.fireProtection ? 'our' :
                    (!this.ourData.fireProtection && this.competitorData.fireProtection ? 'competitor' : 'tie')
            }
        ];

        tbody.innerHTML = rows.map(row => `
            <tr>
                <td>${row.name}</td>
                <td>${row.competitor}</td>
                <td>${row.our}</td>
                <td>${row.diff}</td>
                <td class="winner-cell">
                    ${row.winner === 'our' ? `<span class="winner-badge winner-badge--our">${i18n.t('badge_our')}</span>` :
                row.winner === 'competitor' ? `<span class="winner-badge winner-badge--competitor">${i18n.t('badge_competitor')}</span>` :
                    `<span class="winner-badge winner-badge--tie">${i18n.t('badge_tie')}</span>`}
                </td>
            </tr>
        `).join('');
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
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
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
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    formatDiff(value, unit, lowerIsBetter) {
        if (value === 0) return '—';

        const curr = window.currency;
        const isPositive = lowerIsBetter ? value > 0 : value < 0;
        const absValue = Math.abs(value);

        let formatted;
        if (unit === 'currency') {
            formatted = curr ? curr.format(absValue) : this.formatCurrency(absValue);
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.analyzer = new EstimateAnalyzer();
});
