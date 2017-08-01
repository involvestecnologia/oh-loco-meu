const axios = require('axios');
const path = require('path');
const fs = require('fs');

const SERVICE_PREFIX = 'https://localise.biz/api/export/locale';
const TYPES = ['json', 'properties'];
const LOCALES = ['en', 'pt', 'es'];
const KEY = process.env.LOCO_KEY;
const FORMAT='script';

const writeFile = result => {
  const fileContent = typeof(result.data) === 'object' ?
    JSON.stringify(result.data) :
    result.data;

  fs.writeFile(result.filePath, fileContent, (error) => {
    if (error) {
      throw error;
    }

    console.log(`File ${filePath} was successfully created.`)
  })
};

const _get = (options, cb) => {
  let url = `${SERVICE_PREFIX}/${options.locale}.${options.type}?key=${options.key}`;

  if (!!options['format']) {
    url = url.concat(`&format=${options.format}`);
  }

  console.log(`Getting i18n info for ${options.locale}.${options.type}`);

  axios.get(url).then(response => {
    const result = {
      options,
      data: response.data,
    }
    cb && cb(result);
  });
};

const get = (locales, types, filePath) => {
  locales.forEach(locale => {
    types.forEach(type => {
      const format = type === 'json' ? FORMAT : null;
      const filePath = path.join(filePath ,`${locale}.${type}`);
      const options = {
        locale,
        type,
        format,
        filePath,
        key: KEY,
      };

      _get(options, writeFile);
    });
  });
};

const getAll = (filePath) => {
  filePath = filePath || '.';

  get(LOCALES, TYPES, filePath);
};

module.exports = {
  LOCALES,
  TYPES,
  get,
  getAll,
};
