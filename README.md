# Oh loco, meu!

Exporte os arquivos de i18n  utilizando a api do [Loco](https://localise.biz).

## Instalação

```sh
$ npm i --save oh-loco-meu@git+ssh://git@github.com:thiagozanetti/oh-loco-meu.git#master
```

## Modo de uso

```js
const ohLocoMeu = require('oh-loco-meu');

// exporta todos os arquivos apartir dos locales e tipos pré-definidos na pasta atual.
ohLocoMeu.getAll();

// exporta todos os arquivos apartir dos locales e tipos pré-definidos na pasta diretorioLocalizacao.
ohLocoMeu.getAll('./diretorioLocalizacao')

// exporta os arquivos en_US.json e pt_BR.json na pasta diretorioLocalizacao.
ohLocoMeu.get(['en', 'pt'], ['json'], './diretorioLocalizacao')
```
