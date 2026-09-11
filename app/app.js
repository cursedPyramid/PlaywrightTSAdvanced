$(function () {
  let cash = parseFloat(sessionStorage.getItem('cash')) || 10000;
  if (!sessionStorage.getItem('cash')) {
  sessionStorage.setItem('cash', cash.toFixed(2));
 }
  let portfolio = JSON.parse(sessionStorage.getItem('portfolio')) || {};
  const stockPrices = {};
  let panelShown = false;
  let currentTicker = null;

  function generatePrice() {
    return Math.floor(Math.random() * 401) + 100;
  }

  $('.stock-item').each(function () {
    stockPrices[$(this).data('ticker')] = generatePrice();
  });

  function saveState() {
    sessionStorage.setItem('portfolio', JSON.stringify(portfolio));
    sessionStorage.setItem('cash', cash.toFixed(2));
  }

  function updatePortfolioTable() {
    const tbody = $('#portfolio-table tbody').empty();
    for (const t in portfolio) {
      const p = portfolio[t];
      tbody.append(`
        <tr>
          <td>${t}</td>
          <td>${p.qty}</td>
          <td>$${p.avgPrice.toFixed(2)}</td>
          <td>$${p.totalValue.toFixed(2)}</td>
        </tr>
      `);
    }
    $('#cash').text(cash.toFixed(2));
  }

  function isValidInteger(value) {
    return /^[1-9]\d*$/.test(value);
  }

  function validatePrice(limit, market) {
    return limit >= market * 0.9 && limit <= market * 1.1;
  }

  $('.stock-item').click(function () {
    currentTicker = $(this).data('ticker');
    $('#trade-title').text($(this).text());
    $('#stock-price').text(stockPrices[currentTicker]);
    $('#limit-price, #quantity, #value').val('');
    $('.error-message').text('');

    if (!panelShown) {
      $('#trade-panel').removeClass('d-none');
      panelShown = true;
    }
  });

  $('#quantity').on('blur', function () {
    if (!isValidInteger(this.value)) {
      $('#qty-error').text('Quantity must be a whole number');
    } else {
      $('#qty-error').text('');
    }
  });

  $('#limit-price, #quantity').on('input', function () {
    const price = parseFloat($('#limit-price').val());
    const qty = $('#quantity').val();
    if (!isNaN(price) && isValidInteger(qty)) {
      $('#value').val((price * qty).toFixed(2));
    } else {
      $('#value').val('');
    }
  });

  $('#limit-price').on('blur', function () {
    const limit = parseFloat(this.value);
    const market = stockPrices[currentTicker];
    if (!validatePrice(limit, market)) {
      $('#price-error').text('The price is too far away from the current market price');
    } else {
      $('#price-error').text('');
    }
  });

  function placeOrder(side) {
    $('.error-message').text('');

    const limit = parseFloat($('#limit-price').val());
    const qtyRaw = $('#quantity').val();
    const qty = parseInt(qtyRaw);
    const market = stockPrices[currentTicker];

    if (!isValidInteger(qtyRaw)) {
      $('#qty-error').text('Quantity must be a whole number');
      return;
    }

    if (!validatePrice(limit, market)) {
      $('#price-error').text('The price is too far away from the current market price');
      return;
    }

    const value = limit * qty;

    if (side === 'buy') {
      if (value > cash) {
        $('#action-error').text('Insufficient cash');
        return;
      }
      portfolio[currentTicker] ??= { qty: 0, avgPrice: 0, totalValue: 0 };
      const p = portfolio[currentTicker];
      p.qty += qty;
      p.totalValue += value;
      p.avgPrice = p.totalValue / p.qty;
      cash -= value;
    } else {
      if (!portfolio[currentTicker] || portfolio[currentTicker].qty < qty) {
        $('#action-error').text('Not enough stock in portfolio.');
        return;
      }
      portfolio[currentTicker].qty -= qty;
      portfolio[currentTicker].totalValue -= value;
      if (portfolio[currentTicker].qty === 0) delete portfolio[currentTicker];
      cash += value;
    }

    saveState();
    updatePortfolioTable();
  }

  $('#buy-btn').click(() => placeOrder('buy'));
  $('#sell-btn').click(() => placeOrder('sell'));

  updatePortfolioTable();
});