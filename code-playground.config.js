module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-motion-blur-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">

					<h1 class="h3 m-b-small">
						Coffeekraken s-motion-blur-component
					</h1>
					<p class="p m-b-bigger">
						Provide a simple webcomponent that apply a motion blur effect using SVG filters.
					</p>

					<div class="slideshow">
						<div class="slideshow__slide" id="slideshow-slide">
							<img src="https://source.unsplash.com/random/800x600?1" class="slideshow__img" />
							<img src="https://source.unsplash.com/random/800x600?2" class="slideshow__img" />
							<img src="https://source.unsplash.com/random/800x600?3" class="slideshow__img" />
						</div>
						<s-motion-blur for="slideshow-slide" amount="1"></s-motion-blur>
					</div>

					<br>
					<div class="slideshow">
						<div class="slideshow__slide">
							<img src="https://source.unsplash.com/random/800x600?1" class="slideshow__img" />
							<img src="https://source.unsplash.com/random/800x600?2" class="slideshow__img" />
							<img src="https://source.unsplash.com/random/800x600?3" class="slideshow__img" />
						</div>
					</div>

				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
				}
				.container {
					padding: s-space(big);
				}

				@keyframes slideshow-slide {
					0% {
						transform: translateX(0);
					}
					50% {
						transform: translateX(-200%);
					}
					100% {
						transform: translateX(0);
					}
				}

				.slideshow {
					@include s-ratio(16/9);
					max-width: 800px;
					background: #888;
				}

					.slideshow__slide {
						white-space: nowrap;
						position:absolute;
						top:0; left:0;
						font-size:0;
						animation: slideshow-slide 2s ease-in-out 1s infinite;
					}

					.slideshow__img {
						@include s-fit();
						object-fit: cover;
					}

			`
		},
		js : {
			language : 'js',
			data : `
				import SMotionBlurComponent from './dist/index'
			`
		}
	}
}
