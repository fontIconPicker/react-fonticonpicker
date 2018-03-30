module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-tabs": 0,
        "indent": ["error", "tab"],
        "react/jsx-indent": ["error", "tab"],
        "quotes": ["error", "single"],
        "comma-dangle": ["error", "always-multiline"],
        "semi": ["error", "always"],
        "no-extra-semi": "error",
        "react/no-unused-prop-types": 1,
        "react/no-unused-state": 1,
        "no-unused-vars": 1
    }
};
