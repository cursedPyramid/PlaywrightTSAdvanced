$(function () {
  const portfolio = JSON.parse(sessionStorage.getItem('portfolio')) || {};
  const cash = sessionStorage.getItem('cash') || 10000;
  const tbody = $('#portfolio-table tbody');
  const message = $('#analytics-message');

  $('#cash').text(cash);

  let totalValue = 0;
  for (const ticker in portfolio) {
    totalValue += portfolio[ticker].totalValue;
  }

  if (totalValue === 0) {
    message.html(
      '<div class="alert alert-info">Your portfolio is currently empty.</div>'
    );
    return;
  }

  const overweightStocks = [];

  for (const ticker in portfolio) {
    const stock = portfolio[ticker];
    const weight = (stock.totalValue / totalValue) * 100;

    if (weight > 20) {
      overweightStocks.push({
        ticker,
        weight: weight.toFixed(2)
      });
    }

    tbody.append(`
      <tr>
        <td>${ticker}</td>
        <td>${stock.qty}</td>
        <td>$${stock.avgPrice.toFixed(2)}</td>
        <td>$${stock.totalValue.toFixed(2)}</td>
      </tr>
    `);
  }

  if (overweightStocks.length > 0) {
    const lines = overweightStocks
      .map(s => `${s.ticker}: ${s.weight}% weight`)
      .join('<br>');

    message.html(`
      <div class="alert alert-warning">
        <strong>Your portfolio may be poorly diversified.</strong><br>
        Some stocks exceed 20% of your portfolio weight.<br>
        ${lines}
      </div>
    `);
  } else {
    message.html(`
      <div class="alert alert-success">
        Your portfolio seems to be well diversified. Well done.
      </div>
    `);
  }
});