import AddNewPage from './src/index';

// 为组件提供 install 安装方法，供按需引入
AddNewPage.install = function(Vue) {
  Vue.component(AddNewPage.name, AddNewPage);
};

export default AddNewPage;
