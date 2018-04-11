// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { spring } from 'react-router-transition';
import presets from 'react-motion/lib/spring';

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
	return spring(val, presets.gentle);
}

// child matches will...
export const fadeInLeft = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		translateX: 250,
		transitionIndex: 0,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		translateX: bounce(-250),
		transitionIndex: 2,
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		translateX: bounce(0),
		transitionIndex: 1,
	},
	mapStyles(styles) {
		return {
			position: styles.transitionIndex <= 1 ? 'relative' : 'absolute',
			opacity: styles.opacity,
			transform: `translateX(${styles.translateX}px)`,
		};
	},
};

export const fadeInUp = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		translateY: 50,
		transitionIndex: 0,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		translateY: bounce(-50),
		transitionIndex: 2,
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		translateY: bounce(0),
		transitionIndex: 1,
	},
	mapStyles(styles) {
		return {
			position: styles.transitionIndex <= 1 ? 'relative' : 'absolute',
			opacity: styles.opacity,
			transform: `translateY(${styles.translateY}px)`,
		};
	},
};
