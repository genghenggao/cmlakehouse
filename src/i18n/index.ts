/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 14:35:11
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 15:57:16
 */
import { createI18n } from 'vue-i18n'
import CN from './zh_cn'
import EN from './en_us'

const message = {
  cn: {
    ...CN,
  },
  en: {
    ...EN,
  },
}

// 默认语言
const langDefault = 'cn'

const i18n = createI18n({
  locale: langDefault, // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: message,
})

export default i18n