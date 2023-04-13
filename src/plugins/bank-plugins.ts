import axios from 'axios';
import _ from 'lodash';

async function comBankPlugin() {
  const res = await axios.get('https://www.combank.lk/rates-tariff');
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(res.data, 'text/html');
  const value = htmlDoc.querySelector(
    '#exchange-rates > div.table-container > table > tbody > tr:nth-child(1) > td:nth-child(2)'
  ).innerHTML;

  return (+value.trim()).toFixed(4);
}

async function selanBankPlugin() {
  const res = await axios.get('https://www.seylan.lk/exchange-rates');
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(res.data, 'text/html');
  const value = htmlDoc.querySelector(
    'body > div.container.margin-top-25 > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)'
  ).innerHTML;

  return (+value.trim()).toFixed(4);
}

async function sampathBankPlugin() {
  const res = await axios.get('https://www.sampath.lk/api/exchange-rates', {
    headers: {
      Host: 'www.sampath.lk',
    },
  });
  return (+_.get(
    _.find(_.get(res, 'data.data'), { CurrCode: 'USD' }),
    'ODBUY'
  )).toFixed(4);
}

async function cbslPlugin() {
  const res = await axios.get(
    'https://www.cbsl.gov.lk/cbsl_custom/charts/usd/oneweek.php'
  );
  return res.data.trim().split('\n').splice(-3).join('\n');
}

async function bloombergPlugin() {
  const res = await axios.get(
    'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=LKR'
  );
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(res.data, 'text/html');
  const value = htmlDoc.querySelector(
    '#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > div > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.iGrAod'
  ).innerHTML;
  return (+value.split('<span class="faded-digits">')[0]).toFixed(4);
}

export {
  comBankPlugin,
  selanBankPlugin,
  sampathBankPlugin,
  cbslPlugin,
  bloombergPlugin,
};
