const axios = require('axios');
const path = require('path');
const fs = require('fs');

const SERVICE_PREFIX = 'https://localise.biz/api/export/locale';
const TYPES = ['json', 'properties'];
const LOCALES = [ { global: 'en', local:'en_US' }, { global: 'pt', local: 'pt_BR' }, { global: 'es', local: 'es_AR' }];
const KEY = process.env.LOCO_HTML_KEY;
const FORMAT='script';

const log = (message) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() !== 'production') {
    console.log(message);
  }
};

const writeFile = result => {
  const fileContent = typeof(result.data) === 'object' ?
    JSON.stringify(result.data) :
    result.data;

  fs.writeFile(result.props.filePath, fileContent, (error) => {
    if (error) {
      throw error;
    }

    log(`File ${result.props.filePath} was successfully created.`)
  })
};

const _get = (props, cb) => {
  let url = `${SERVICE_PREFIX}/${props.locale.global}.${props.type}?key=${props.key}`;

  if (!!props['format']) {
    url = url.concat(`&format=${props.format}`);
  }

  log(`Getting i18n info for ${props.locale.global}.${props.type}`);

  axios.get(url).then(response => {
    const result = {
      props,
      data: response.data,
    }
    cb && cb(result);
  });
};

const get = (locales, types, pathPrefix) => {
  locales.forEach(locale => {
    types.forEach(type => {
      const format = type === 'json' ? FORMAT : null;
      const filePath = path.join(pathPrefix ,`${locale.local}.${type}`);
      const props = {
        locale,
        type,
        format,
        pathPrefix,
        filePath,
        key: KEY,
      };

      _get(props, writeFile);
    });
  });
};

const getAll = (pathPrefix) => {
  pathPrefix = pathPrefix || '.';

  get(LOCALES, TYPES, pathPrefix);
};

module.exports = {
  LOCALES,
  TYPES,
  get,
  getAll,
};
