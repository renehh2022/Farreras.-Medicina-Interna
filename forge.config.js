module.exports = {
  packagerConfig: {
    asar: true,
    icon: './assets/icono.png',
    executableName: 'medicina-interna-farreras', // nombre del binario sin espacios
    name: 'medicina-interna-farreras' // también forzar el nombre interno
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'René Hernández Hernández <renediana2014@gmail.com>',
          homepage: 'https://github.com/renediana/medicina-interna-farreras',
          bin: 'medicina-interna-farreras', // nombre del binario en /usr/bin
          name: 'medicina-interna-farreras',
          productName: 'Medicina Interna Farreras', // nombre visible en el menú
          icon: './assets/icono.png',
          scripts: {
            postinst: './scripts/fix-permissions.sh'
          }
        }
      }
    },
  ],
};
