import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import SMotionblurSvgFilter from 'coffeekraken-sugar/js/filters/SMotionblurSvgFilter'

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
 * 	<img src="..." alt="..." />
 * </s-motion-blur>
 *
 * <div id="my-animated-div">
 * 	<img src="..." alt="..." />
 * </div>
 * <s-motion-blur for="my-animated-div" amount="1"></s-motion-blur>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class SMotionBlurComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {
			/**
			 * Amount of motion blur to apply
			 * @prop
			 * @type 		{Number}
			 */
			amount : 0.5,

			/**
			 * Specify the id of the element to apply the motion blur on. If not specified,
			 * the target is the component itself
			 * @prop
			 * @type 		{String}
			 */
			for : null
		}
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();
		// create a filter
		const targetElm = (this.props.for) ? document.querySelector(`#${this.props.for}`) : this;
		if ( ! targetElm) {
			throw `The "for" attribute set to "${this.props.for}" id does not target to any HTMLElement in the document...`
		} else {
			this._createFilter(targetElm);
		}
	}

	/**
	 * Unmount component
	 * @definition 			SWebComponent.componentUnmount
	 * @protected
	 */
	componentUnmount() {
		super.componentUnmount();
	}

	/**
	 * Create motion blur filter
	 * @param 	{HTMLElement} 	targetElm 	The element to apply the filter on
	 */
	_createFilter(targetElm) {
		// create a new svg filter
		this._motionBlurFilter = new SMotionblurSvgFilter(this.props.amount);
		// apply the filter
		this._motionBlurFilter.applyTo(targetElm);
	}

	/**
	 * Destroy motion blur filter
	 */
	_destroyFilter() {
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
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
			case 'for':
				// destroy the filter and recreate it on the new elm
				this._destroyFilter();
				let target;
				if ( ! newVal) target = this;
				else target = document.querySelector(`#${newVal}`);
				if ( target) {
					this._createFilter(target);
				}
			break;
			case 'amount':
				this._motionBlurFilter.amount = newVal;
			break;
		}
	}
}
