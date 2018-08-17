import { injectGlobal } from 'styled-components'

injectGlobal`
    
  @font-face {font-family: "iconfont";
    src: url('./iconfont.eot?t=1534420735820'); /* IE9*/
    src: url('./iconfont.eot?t=1534420735820#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
    url('./iconfont.ttf?t=1534420735820') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('./iconfont.svg?t=1534420735820#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-spin:before { content: "\e851"; }

  .icon-fangdajing:before { content: "\e633"; }

  .icon-Aa:before { content: "\e636"; }

  .icon-pan_icon:before { content: "\e678"; }

`
