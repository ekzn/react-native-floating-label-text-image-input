/**
* This is RN package is based on
* https://github.com/eyaleizenberg/react-native-floating-label-text-input
* main credit goes to https://github.com/eyaleizenberg
* @Author: Erum Abid Awan <erumabidawan>
* @Date:   2017-01-26T10:33:35+05:00
* @Email:  erumawan.21@gmail.com
* @Filename: index.js
* @Last modified by:   erumabidawan
* @Last modified time: 2017-02-23T14:25:17+05:00
*/

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Animated,
	Image
} from 'react-native';

var FIELD_HEIGHT = 50;
var ICON_SIZE = 25;
var PADDING_LEFT = 30;

class FloatingLabel extends Component {
	constructor(props) {
		super(props);

		let initialPadding = 9;
		let initialOpacity = 0;

		if (this.props.visible) {
			initialPadding = 5;
			initialOpacity = 1;
		}

		this.state = {
			paddingAnim: new Animated.Value(initialPadding),
			opacityAnim: new Animated.Value(initialOpacity)
		};
	}

	componentWillReceiveProps(newProps) {
		Animated.timing(this.state.paddingAnim, {
			toValue: newProps.visible ? 5 : 9,
			duration: 230
		}).start();

		return Animated.timing(this.state.opacityAnim, {
			toValue: newProps.visible ? 1 : 0,
			duration: 230
		}).start();
	}

	render() {
		return (
			<Animated.View
				style={[
					styles.floatingLabel,
					{
						paddingTop: this.state.paddingAnim,
						opacity: this.state.opacityAnim
					}
				]}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

class TextFieldHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
		};
	}

	componentWillReceiveProps(newProps) {
		return Animated.timing(this.state.marginAnim, {
			toValue: newProps.withValue ? 10 : 0,
			duration: 230
		}).start();
	}

	render() {
		return (
			<Animated.View style={{ marginTop: this.state.marginAnim }}>
				{this.props.children}
			</Animated.View>
		);
	}
}

class FancyTextField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: false,
			text: this.props.value
		};
	}

	componentWillReceiveProps(newProps) {
		if (
			newProps.hasOwnProperty('value') &&
			newProps.value !== this.state.text
		) {
			this.setState({ text: newProps.value });
		}
	}

	withBorder() {
		if (!this.props.noBorder) {
			return styles.withBorder;
		}
	}
	withIcon() {
		return this.props.placeholderIcon ? styles.paddingLeft : 0;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.viewContainer}>
					<View style={styles.paddingView} />
					<View
						style={[styles.fieldContainer, this.withBorder(), this.withIcon()]}
					>
						{this.props.placeholder && (
							<FloatingLabel visible={this.state.text}>
								<Text
									style={[
										styles.fieldLabel,
										this.labelStyle(),
										this.withIcon()
									]}
								>
									{this.placeholderValue()}
								</Text>
							</FloatingLabel>
						)}
						<TextFieldHolder withValue={this.state.text}>
							<TextInput
								{...this.props}
								ref="input"
								style={[styles.valueText, { color: 'white' }]}
								defaultValue={this.props.defaultValue}
								value={this.state.text}
								maxLength={this.props.maxLength}
								underlineColorAndroid="transparent"
								onFocus={() => this.setFocus()}
								onBlur={() => this.unsetFocus()}
								onChangeText={value => this.setText(value)}
							/>
						</TextFieldHolder>
						<Image
							style={[styles.iconContainter]}
							resizeMode={Image.resizeMode.contain}
							source={this.placeholderIconValue()}
						/>
					</View>
				</View>
			</View>
		);
	}

	inputRef() {
		return this.refs.input;
	}

	focus() {
		this.inputRef().focus();
	}

	blur() {
		this.inputRef().blur();
	}

	isFocused() {
		return this.inputRef().isFocused();
	}

	clear() {
		this.inputRef().clear();
	}

	setFocus() {
		this.setState({
			focused: true
		});
		try {
			return this.props.onFocus();
		} catch (_error) {}
	}

	unsetFocus() {
		this.setState({
			focused: false
		});
		try {
			return this.props.onBlur();
		} catch (_error) {}
	}

	labelStyle() {
		if (this.state.focused) {
			return styles.focused;
		}
	}

	placeholderValue() {
		if (this.state.text) {
			return this.props.placeholder;
		}
	}
	placeholderIconValue() {
		if (this.props.placeholderIcon) {
			return this.props.placeholderIcon;
		}
	}

	setText(value) {
		this.setState({
			text: value
		});
		try {
			return this.props.onChangeTextValue(value);
		} catch (_error) {}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		height: FIELD_HEIGHT,
		margin: 10
	},
	viewContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	paddingView: {
		width: 5
	},
	floatingLabel: {
		position: 'absolute',
		top: 0,
		left: 0
	},
	fieldLabel: {
		height: 10,
		fontSize: 9,
		color: '#ffffff'
	},
	paddingLeft: {
		paddingLeft: PADDING_LEFT
	},
	fieldContainer: {
		flex: 1,
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: 'transparent'
	},
	withBorder: {
		borderBottomWidth: 1 / 2,
		borderColor: '#ffffff'
	},
	valueText: {
		height: 42,
		lineHeight: 34,
		fontSize: 16,
		color: '#ffffff'
	},
	focused: {
		color: '#ffffff'
	},
	iconContainter: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		left: 0,
		top: (FIELD_HEIGHT - ICON_SIZE) / 2,
		position: 'absolute'
	}
});

export default FancyTextField;
