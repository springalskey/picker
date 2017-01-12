## 移动端react选择器，支持拓展二级联动，三级联动


## How to use

```
$ npm install spring-picker -S

import 'spring-picker/lib/style.css';
import { Picker, Popup } from 'spring-picker';

<Popup
  onCancel={this.cancelUserPicker.bind(this)}
  onConfirm={this.closeUserPicker.bind(this)}
  visible={this.state.userPickerVisible}>
  <Picker
    onChange={this.handleChangeUser.bind(this)}
    data={this.userData}
  />
</Popup>

```

## How to run this project

```
# install dependencies
npm install

# run server
npm start

# build for production with minification
npm run build

```

## example1
![image](https://github.com/springalskey/picker/blob/master/src/assets/demo1.jpeg)

## example2
![image](https://github.com/springalskey/picker/blob/master/src/assets/demo2.jpeg)

