# AwesomeSelect

## 用法

 ```javascript

 <AwesomeSelect
   width={200}
   height={50}
   value={arr}
   change={(value, index) => {console.log('--- change', value, index)}}
   bottomLabel="共有几个呀" />

 ```

## props

 - `valeu`: `必选`，一定是要`Array`。每一项里面的`value`代表值，`label`代表显示的文字

 ```javascript

  arr = [{value: 1, label: 'react'}]

 ```



  - `change`: `必选`, 一定是`Function`。两个参数，`value`代表是所选的那个对象，`index`代表所选的在数组的位置.

  ```javascript

   function chnage(value, index)

  ```


 - `width`: `可选`, 一定是`Num`

 - `height`: `可选`, 一定是`Num`

 - `disabled`: `可选`, 一定是`bool`

 - `bottomLabel`: `必选`, 一定是`String`。底部的那个显示文字。

 - `handleClose`: 一定是`Function`。 options隐藏的回调事件。
