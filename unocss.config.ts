import { presetAttributify, presetUno } from 'unocss'

module.exports = {
  presets: [
    presetAttributify(), // for `class` attribute
    presetUno(), // for `:class` attribute
  ],
  rules: [
    [
      'fcc',
      {
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      },
    ],
    [
      'fbc',
      {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
      },
    ],
  ],
}
