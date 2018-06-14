# SMotionBlurComponent

Extends **SWebComponent**

Provide a simple webcomponent that apply a motion blur effect using SVG filters.
You can target an HTMLElement using the "for" attribute (same as for a label and an input), or apply the motion blur on the component itself.
The motion blur effect is triggered on these three events:
1. `transitionstart`: This events does not exist natively so you'll need to trigger it by yourself.
2. `animationstart`
3. `dragstart`
And is stopped on these three events:
1. `transitionend`
2. `animationend`
3. `dragend`


### Example
```html
	<s-motion-blur amount="1">
	<img src="..." alt="..." />
</s-motion-blur>

<div id="my-animated-div">
	<img src="..." alt="..." />
</div>
<s-motion-blur for="my-animated-div" amount="1"></s-motion-blur>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### amount

Amount of motion blur to apply

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0.5**


### for

Specify the id of the element to apply the motion blur on. If not specified,
the target is the component itself

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**