module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "plugin:prettier/recommended",
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
        "react/no-unused-prop-types": 1,
        "react/no-unused-state": 1,
        "no-unused-vars": 1,
        "prettier/prettier": ["error"]
    }
};
