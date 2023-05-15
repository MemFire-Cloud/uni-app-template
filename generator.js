
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    // # 扩展pkg#scripts
    scripts: {
    }, 
    // # 扩展pkg#dependencies
    dependencies: {
    "@dcloudio/uni-ui": "^1.4.27",
    "supabase-wechat-stable-v2": "^2.0.3"
    }, 
    // # 扩展pkg#devDependencies
    devDependencies: {
    }
  });
//   # 复制template模版
  api.render('./template');
};
