const axios = require('axios');
const fs = require('fs');

const SERVICE_PREFIX = 'https://localise.biz/api/export/locale';
const TYPES = ['json', 'properties'];
const LOCALES = ['en', 'pt', 'es'];
const KEY = 'HKrE53dEv_zJsKML9kT9fMqAYn3CfkuJ';
const FORMAT='script';

const writeFile = fileName => {
  return data => {
    const fileContent = typeof(data) === 'object' ? JSON.stringify(data) : data;

    fs.writeFile(fileName, fileContent, (error) => {
      if (error) {
        throw error;
      }

      console.log(`File ${fileName} was successfully created.`)
    })
  }
};

const _get = (options, cb) => {
  let url = `${SERVICE_PREFIX}/${options.locale}.${options.type}?key=${options.key}`;

  if (!!options['format']) {
    url = url.concat(`&format=${options.format}`);
  }

  console.log(`Getting i18n info for ${options.locale}.${options.type}`);

  axios.get(url).then(response => {
    cb && cb(response.data);
  });
};

const get = (locales, types) => {
  locales.forEach(locale => {
    types.forEach(type => {
      const format = type === 'json' ? FORMAT : null;
      const fileName = `${locale}.${type}`;
      const options = {
        locale,
        type,
        format,
        key: KEY,
      };

      _get(options, writeFile(fileName));
    });
  });
};

const getAll = () => {
  get(LOCALES, TYPES);
}

const ownModule = {
  LOCALES,
  TYPES,
  get,
  getAll,
};

module.exports = ownModule;
