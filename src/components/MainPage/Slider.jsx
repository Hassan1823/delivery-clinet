import React from 'react';
import Slider from 'react-slick';
import brand1 from './fedx.png';
import brand2 from './tcs.png';
import brand3 from './speedx.png';
import brand4 from './dhl.png';
import brand5 from './leop.png';

function SliderBrand() {
	const settings = {
		className: 'center',
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 5,
		swipeToSlide: true,
		afterChange: function (index) {
			console.log(
				`Slider Changed to: ${index + 1}, background: #222; color: #bada55`
			);
		},
		autoplay: true,
		speed: 5000,
		autoplaySpeed: 1,
	};
	return (
		<div className='slider-container overflow-hidden py-20'>
			<Slider {...settings}>
				<div>
					<img
						src={brand1}
						alt='brand1'
					/>
				</div>
				<div>
					<img
						src={brand2}
						alt='brand2'
					/>
				</div>
				<div>
					<img
						src={brand3}
						alt='brand3'
					/>
				</div>
				<div>
					<img
						src={brand4}
						alt='brand4'
					/>
				</div>
				<div>
					<img
						src={brand5}
						alt='brand5'
					/>
				</div>
			</Slider>
		</div>
	);
}

export default SliderBrand;
