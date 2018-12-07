## 生成固定结构页面工具
### 功能介绍
通过命令行生成对应模板的配置文件`awpt -d [template file name]`,对生成的配置文件按需求编辑，执行生成命令`awpt -t [template file name]`,即在本目录下生成配置后的文件。

目前页面基于[antd](https://ant-design.gitee.io/index-cn)和[Hermes React](https://hermes.koubei.com/docs/react/introduce)开发，配置详情参考对应的文档。
####安装使用

```
npm i awpt -g

awpt -v
```

### 生成页面
#### 1.订单详情页面 orderDetail
页面配置项需参考[antd Table](https://ant-design.gitee.io/components/table-cn/#Column)组件配置和[HermesReact DetailTable](https://hermes.koubei.com/components/detail-table/#API)组件配置.

配置参数详情请移步至[orderDetail 配置文件参数说明](./)

orderDetail页面使用说明请移步至[orderDetail 页面使用说明](./)
```
/**
  * 配置文件格式正在测试，本示例中为js文件，配置项为两个表单的配置内容
  */
awpt -d orderDetail

awpt -t orderDetail
```

当前目录下会生成orderDetail.js文件
效果如下：
![](http://ww1.sinaimg.cn/large/0065uj2jly1fxxz2dxgq7j30gx06st92.jpg)
