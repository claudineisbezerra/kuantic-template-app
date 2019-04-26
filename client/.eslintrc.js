module.exports = {
    root: true,
    env: {
        node: true,
        jest: true
    },
    extends: ['plugin:vue/recommended', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': 'off',
        'vue/script-indent': 'off',
        'vue/max-attributes-per-line': [  {
            'singleline': 4,
            'multiline': {
            'max': 4,
            'allowFirstLine': true
            }
        }],
        'vue/require-prop-types': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/order-in-components': 'off',
        'no-unused-vars': 0,
        'semi': ['error','always'],
        'css.lint.emptyRules': 'ignore',
        'sass.lint.emptyRules': 'ignore',
        'less.lint.emptyRules': 'ignore',
        'scss.lint.emptyRules': 'ignore'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
