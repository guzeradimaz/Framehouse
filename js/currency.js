/**
 * Currency Module
 * Supports RUB, EUR, USD with live exchange rates
 */

class CurrencyConverter {
    constructor() {
        this.currentCurrency = localStorage.getItem('framehouse_currency') || 'RUB';
        this.rates = {
            RUB: 1,
            EUR: 0.0095,  // Default fallback rates
            USD: 0.0105
        };
        this.symbols = {
            RUB: '₽',
            EUR: '€',
            USD: '$'
        };
        this.listeners = [];

        this.fetchRates();
    }

    async fetchRates() {
        try {
            // Using free exchangerate API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
            if (response.ok) {
                const data = await response.json();
                this.rates = {
                    RUB: 1,
                    EUR: data.rates.EUR,
                    USD: data.rates.USD
                };
                console.log('Exchange rates updated:', this.rates);
                this.notifyListeners();
            }
        } catch (error) {
            console.warn('Failed to fetch exchange rates, using defaults:', error);
            // Try backup API
            this.fetchRatesBackup();
        }
    }

    async fetchRatesBackup() {
        try {
            // Backup: using CBR (Central Bank of Russia) approximate rates
            // These are fallback values that are reasonably current
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            if (response.ok) {
                const data = await response.json();
                const eurRate = data.Valute?.EUR?.Value || 100;
                const usdRate = data.Valute?.USD?.Value || 92;

                this.rates = {
                    RUB: 1,
                    EUR: 1 / eurRate,
                    USD: 1 / usdRate
                };
                console.log('Exchange rates updated from CBR:', this.rates);
                this.notifyListeners();
            }
        } catch (error) {
            console.warn('Backup API also failed, using hardcoded rates');
            // Use hardcoded approximate rates as last resort
            this.rates = {
                RUB: 1,
                EUR: 0.0098,   // ~102 RUB per EUR
                USD: 0.0108    // ~92 RUB per USD
            };
        }
    }

    convert(amountInRub, toCurrency = null) {
        const currency = toCurrency || this.currentCurrency;
        const rate = this.rates[currency] || 1;
        return amountInRub * rate;
    }

    convertBack(amount, fromCurrency = null) {
        const currency = fromCurrency || this.currentCurrency;
        const rate = this.rates[currency] || 1;
        return amount / rate;
    }

    /**
     * Convert between any two currencies
     * @param {number} amount - Amount to convert
     * @param {string} fromCurrency - Source currency (EUR, USD, RUB)
     * @param {string} toCurrency - Target currency (EUR, USD, RUB)
     * @returns {number} - Converted amount
     */
    convertBetween(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) return amount;

        // Convert to RUB first, then to target currency
        const fromRate = this.rates[fromCurrency] || 1;
        const toRate = this.rates[toCurrency] || 1;

        // amount in fromCurrency -> RUB -> toCurrency
        const inRub = amount / fromRate;
        return inRub * toRate;
    }

    format(amountInRub, options = {}) {
        const currency = options.currency || this.currentCurrency;
        const converted = this.convert(amountInRub, currency);

        const formatOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: currency === 'RUB' ? 0 : 2
        };

        const formatted = new Intl.NumberFormat(
            currency === 'RUB' ? 'ru-RU' : 'en-US',
            formatOptions
        ).format(converted);

        return `${formatted} ${this.symbols[currency]}`;
    }

    formatShort(amountInRub, options = {}) {
        const currency = options.currency || this.currentCurrency;
        const converted = this.convert(amountInRub, currency);

        let value, suffix;
        if (currency === 'RUB') {
            if (converted >= 1000000) {
                value = (converted / 1000000).toFixed(1);
                suffix = i18n?.currentLang === 'en' ? 'M' : ' млн';
            } else if (converted >= 1000) {
                value = (converted / 1000).toFixed(0);
                suffix = i18n?.currentLang === 'en' ? 'K' : ' тыс';
            } else {
                value = converted.toFixed(0);
                suffix = '';
            }
        } else {
            if (converted >= 1000000) {
                value = (converted / 1000000).toFixed(2);
                suffix = 'M';
            } else if (converted >= 1000) {
                value = (converted / 1000).toFixed(1);
                suffix = 'K';
            } else {
                value = converted.toFixed(0);
                suffix = '';
            }
        }

        return `${value}${suffix} ${this.symbols[currency]}`;
    }

    setCurrency(currency) {
        if (this.rates[currency] !== undefined) {
            this.currentCurrency = currency;
            localStorage.setItem('framehouse_currency', currency);
            this.notifyListeners();
        }
    }

    getCurrency() {
        return this.currentCurrency;
    }

    getSymbol(currency = null) {
        return this.symbols[currency || this.currentCurrency];
    }

    getRate(currency = null) {
        return this.rates[currency || this.currentCurrency];
    }

    onCurrencyChange(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.currentCurrency, this.rates));
    }

    // Get approximate RUB value for input placeholder
    getPlaceholder(rubValue) {
        if (this.currentCurrency === 'RUB') {
            return new Intl.NumberFormat('ru-RU').format(rubValue);
        }
        const converted = this.convert(rubValue);
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(converted);
    }
}

// Global instance
window.currency = new CurrencyConverter();
