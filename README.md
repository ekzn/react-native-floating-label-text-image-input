# react-native-floating-label-text-image-input
A React Native component for floating label text input with image place holder option

## React Native Floating Label Text Input with Image Place Holder
This component is originally based on ([@react-native-floating-label-text-input](https://github.com/eyaleizenberg/react-native-floating-label-text-input))
by ([@eyaleizenberg](https://github.com/eyaleizenberg))

### What is this?
This component will render an iOS styled text field with floating label animation. When there is no value, the placeholder will be centered. Once there is a value, the value will slide down and the label will fade in and slide up.

Credits for the concept to Matt D. Smith ([@mds](http://www.twitter.com/mds)), and his [original design](http://dribbble.com/shots/1254439--GIF-Mobile-Form-Interaction?list=users).

<p align="center">
    <img src ="https://github.com/erumawan/UIUXSample1/blob/master/ScreenShots/Demo.gif" />
</p>

### Installation
```npm install react-native-floating-label-text-image-input --save```

### Usage example

([@SampleDemo](https://github.com/erumawan/UIUXSample1))

```javascript
import FancyTextField from 'react-native-floating-label-text-image-input';

var SomeComponent = React.createClass({
  render: function() {
    return (
      <View>
        <FancyTextField
          placeholder={'Email'}
					placeholderIcon={require('./images/icon_email.png')}
          value={'abc@g.com'}
        />
      </View>
    );
  }
});
```

### Component props
- placeholder (String) - String that will be used as the placeholder if there is no value. It will also be the string used for the label when there is a value.
- secureTextEntry (Bool) - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false.
- keyboardType (Enum) - enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search').
- value (String) - Value of the text input.
- onFocus (Function) - Function to be called on focus.
- onBlur (Function) - Function to be called on blur.
- onChangeTextValue (Function) - Function to be called when text is modified.
- noBorder (Boolean) - Hide the border bottom of the field.
- maxLength (Number) - Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.
- selectionColor (String) - The highlight (and cursor on ios) color of the text input.

### Questions/Bugs/Ideas?
Feel free to open an issue on github, send suggestions, fork this repository or contact me at
erumawan.21@gmail.com


Thanks and Enjoy! :)
 
