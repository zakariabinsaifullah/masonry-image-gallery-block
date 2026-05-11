import { RangeControl } from '@wordpress/components';
import { ResponsiveControl, useDeviceType } from 'gutenberg-responsive-control';
import 'gutenberg-responsive-control/build/style-index.css';

const DEVICE_ATTRS = {
	Desktop: { key: 'desk', label: 'Desktop' },
	Tablet: { key: 'tab', label: 'Tablet' },
	Mobile: { key: 'phone', label: 'Mobile' },
};

export default function ResponsiveRangeControl( {
	label,
	attributes,
	setAttributes,
	attrMap = { Desk: 'deskCol', Tablet: 'tabCol', Mobile: 'phoneCol' },
	min = 0,
	max = 100,
	help,
} ) {
	const [ deviceType ] = useDeviceType();
	const mapping = DEVICE_ATTRS[ deviceType ];
	const attrKey = attrMap[ deviceType ];
	const value = attributes[ attrKey ];

	return (
		<ResponsiveControl label={ label } setAttributes={ setAttributes }>
			<RangeControl
				value={ value }
				onChange={ ( v ) => setAttributes( { [ attrKey ]: v } ) }
				min={ min }
				max={ max }
				help={ help }
			/>
		</ResponsiveControl>
	);
}