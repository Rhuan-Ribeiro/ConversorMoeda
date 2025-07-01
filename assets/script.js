// Valor de fallback para a cotação do dólar
let EXCHANGE_RATE = 5.40;

// Seletores dos campos de entrada
const usdInput = document.querySelector('#usd');
const brlInput = document.querySelector('#brl');

/**
 * Converte uma string de moeda para número decimal.
 * Aceita vírgula como separador decimal.
 */
function parseCurrency(value) {
  const normalized = parseFloat(value.replace(',', '.'));
  return isNaN(normalized) ? 0 : normalized;
}

/**
 * Formata um número no padrão monetário brasileiro (R$).
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

/**
 * Converte valores entre moedas com base na taxa.
 * @param {HTMLInputElement} fromInput - campo de origem
 * @param {HTMLInputElement} toInput - campo de destino
 * @param {number} rate - taxa de câmbio
 * @param {boolean} isMultiplying - define se multiplica ou divide
 */
function convertCurrency(fromInput, toInput, rate, isMultiplying) {
  const value = parseCurrency(fromInput.value);
  const result = isMultiplying ? value * rate : value / rate;
  toInput.value = formatCurrency(result);
}

/**
 * Aplica formatação ao valor do campo ao perder o foco.
 */
function handleBlurFormat(input) {
  input.value = formatCurrency(parseCurrency(input.value));
}

/**
 * Busca a cotação atual do dólar na AwesomeAPI.
 * Se conseguir, atualiza a variável EXCHANGE_RATE.
 * Se falhar, mantém o valor padrão definido em EXCHANGE_RATE.
 */
async function fetchExchangeRate() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const data = await res.json();
    const rate = parseFloat(data?.USDBRL?.bid);

    if (!isNaN(rate)) {
      EXCHANGE_RATE = rate;
      console.log(`Cotação atual do dólar (AwesomeAPI): R$ ${EXCHANGE_RATE.toFixed(2)}`);
    } else {
      console.warn('Valor de cotação inválido. Usando valor padrão.');
    }
  } catch (error) {
    console.error('Erro ao buscar cotação da AwesomeAPI. Usando valor padrão.', error);
  }

  convertCurrency(usdInput, brlInput, EXCHANGE_RATE, true);
}

// Eventos de conversão baseado na digitação dos inputs
usdInput.addEventListener('input', () =>
  convertCurrency(usdInput, brlInput, EXCHANGE_RATE, true)
);

brlInput.addEventListener('input', () =>
  convertCurrency(brlInput, usdInput, EXCHANGE_RATE, false)
);

// Eventos de formatação baseado na perda de foco dos inputs
usdInput.addEventListener('blur', () => handleBlurFormat(usdInput));
brlInput.addEventListener('blur', () => handleBlurFormat(brlInput));

// Inicialização
usdInput.value = '100,00';
fetchExchangeRate();
