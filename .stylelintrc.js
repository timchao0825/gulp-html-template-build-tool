module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-prettier'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }], // 禁止使用未知的 at 規則
    'rule-empty-line-before': [
      // 要求或禁止在規則宣告之前有空行
      'always-multi-line',
    ],
    'block-closing-brace-empty-line-before': ['never'],
    'comment-empty-line-before': [
      // 要求或禁止在註釋之前有空行
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'block-no-empty': true, // 禁止出現空塊
    'declaration-empty-line-before': 'never', // 要求或禁止在宣告語句之前有空行。
    'declaration-block-no-duplicate-properties': true, // 在宣告的塊中中禁止出現重複的屬性
    'declaration-block-no-redundant-longhand-properties': true, // 禁止使用可以縮寫卻不縮寫的屬性。
    'shorthand-property-no-redundant-values': true, // 禁止在簡寫屬性中使用冗餘值。
    'function-url-quotes': 'always', // 要求或禁止 url 使用引號。
    'color-hex-length': 'short', // 指定十六進位制顏色是否使用縮寫
    'color-named': 'never', // 要求 (可能的情況下) 或 禁止使用命名的顏色
    'comment-no-empty': true, // 禁止空註釋
    'font-family-name-quotes': 'always-unless-keyword', // 指定字型名稱是否需要使用引號引起來 | 期待每一個不是關鍵字的字型名都使用引號引起來
    'font-weight-notation': 'numeric', // 要求使用數字或命名的 (可能的情況下) font-weight 值
    'property-no-vendor-prefix': true, // 禁止屬性使用瀏覽器引擎字首
    'value-no-vendor-prefix': true, // 禁止給值新增瀏覽器引擎字首
    'selector-no-vendor-prefix': true, // 禁止使用瀏覽器引擎字首
  },
};
