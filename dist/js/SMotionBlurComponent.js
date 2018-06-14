'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _SMotionblurSvgFilter = require('coffeekraken-sugar/js/filters/SMotionblurSvgFilter');

var _SMotionblurSvgFilter2 = _interopRequireDefault(_SMotionblurSvgFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class 		SMotionBlurComponent
 * @extends 	SWebComponent
 * Provide a simple webcomponent that apply a motion blur effect using SVG filters.
 * You can target an HTMLElement using the "for" attribute (same as for a label and an input), or apply the motion blur on the component itself.
 * The motion blur effect is triggered on these three events:
 * 1. `transitionstart`: This events does not exist natively so you'll need to trigger it by yourself.
 * 2. `animationstart`
 * 3. `dragstart`
 * And is stopped on these three events:
 * 1. `transitionend`
 * 2. `animationend`
 * 3. `dragend`
 *
 * @example 	html
 * <s-motion-blur amount="1">
 *	<img src="..." alt="..." />
 * </s-motion-blur>
 *
 * <div id="my-animated-div">
 * 	<img src="..." alt="..." />
 * </div>
 * <s-motion-blur for="my-animated-div" amount="1"></s-motion-blur>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

var SMotionBlurComponent = function (_SWebComponent) {
	_inherits(SMotionBlurComponent, _SWebComponent);

	function SMotionBlurComponent() {
		_classCallCheck(this, SMotionBlurComponent);

		return _possibleConstructorReturn(this, (SMotionBlurComponent.__proto__ || Object.getPrototypeOf(SMotionBlurComponent)).apply(this, arguments));
	}

	_createClass(SMotionBlurComponent, [{
		key: 'componentMount',


		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */
		value: function componentMount() {
			_get(SMotionBlurComponent.prototype.__proto__ || Object.getPrototypeOf(SMotionBlurComponent.prototype), 'componentMount', this).call(this);
			// create a filter
			var targetElm = this.props.for ? document.querySelector('#' + this.props.for) : this;
			if (!targetElm) {
				throw 'The "for" attribute set to "' + this.props.for + '" id does not target to any HTMLElement in the document...';
			} else {
				this._createFilter(targetElm);
			}
		}

		/**
   * Unmount component
   * @definition 			SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			_get(SMotionBlurComponent.prototype.__proto__ || Object.getPrototypeOf(SMotionBlurComponent.prototype), 'componentUnmount', this).call(this);
		}

		/**
   * Create motion blur filter
   * @param 	{HTMLElement} 	targetElm 	The element to apply the filter on
   */

	}, {
		key: '_createFilter',
		value: function _createFilter(targetElm) {
			// create a new svg filter
			this._motionBlurFilter = new _SMotionblurSvgFilter2.default(this.props.amount);
			// apply the filter
			this._motionBlurFilter.applyTo(targetElm);
		}

		/**
   * Destroy motion blur filter
   */

	}, {
		key: '_destroyFilter',
		value: function _destroyFilter() {
			if (this._motionBlurFilter) {
				this._motionBlurFilter.destroy();
				delete this._motionBlurFilter;
			}
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */

	}, {
		key: 'componentWillReceiveProp',
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {
				case 'for':
					// destroy the filter and recreate it on the new elm
					this._destroyFilter();
					var target = void 0;
					if (!newVal) target = this;else target = document.querySelector('#' + newVal);
					if (target) {
						this._createFilter(target);
					}
					break;
				case 'amount':
					this._motionBlurFilter.amount = newVal;
					break;
			}
		}
	}], [{
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */
		get: function get() {
			return {
				/**
     * Amount of motion blur to apply
     * @prop
     * @type 		{Number}
     */
				amount: 0.5,

				/**
     * Specify the id of the element to apply the motion blur on. If not specified,
     * the target is the component itself
     * @prop
     * @type 		{String}
     */
				for: null
			};
		}
	}]);

	return SMotionBlurComponent;
}(_SWebComponent3.default);

exports.default = SMotionBlurComponent;