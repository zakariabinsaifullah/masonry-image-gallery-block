import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import ResponsiveRangeControl from '../../components/responsive-range-control';

const HOVER_EFFECTS = [
	{ label: __( 'None', 'mgb-masonry-image-gallery' ), value: 'none' },
	{ label: __( 'Zoom In', 'mgb-masonry-image-gallery' ), value: 'zoom__in' },
	{
		label: __( 'Zoom Out', 'mgb-masonry-image-gallery' ),
		value: 'zoom__out',
	},
	{
		label: __( 'Grayscale', 'mgb-masonry-image-gallery' ),
		value: 'gray__scale',
	},
];

const CAPTION_POSITIONS = [
	{ label: __( 'Top', 'mgb-masonry-image-gallery' ), value: 'top' },
	{ label: __( 'Center', 'mgb-masonry-image-gallery' ), value: 'center' },
	{ label: __( 'Bottom', 'mgb-masonry-image-gallery' ), value: 'bottom' },
];

export default function Inspector( { attributes, setAttributes } ) {
	const {
		deskCol,
		tabCol,
		phoneCol,
		deskGap,
		tabGap,
		phoneGap,
		enableLightbox,
		imageHoverEffect,
		showCaption,
		captionPosition,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Gallery Settings', 'mgb-masonry-image-gallery' ) }
				initialOpen={ true }
			>
				<ResponsiveRangeControl
					label={ __( 'Columns', 'mgb-masonry-image-gallery' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					attrMap={ {
						Desktop: 'deskCol',
						Tablet: 'tabCol',
						Mobile: 'phoneCol',
					} }
					min={ 1 }
					max={ 5 }
				/>

				<ResponsiveRangeControl
					label={ __( 'Items Gutter', 'mgb-masonry-image-gallery' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					attrMap={ {
						Desktop: 'deskGap',
						Tablet: 'tabGap',
						Mobile: 'phoneGap',
					} }
					min={ 0 }
					max={ 100 }
					help={ __( 'unit in pixel (px)', 'mgb-masonry-image-gallery' ) }
				/>

				<ToggleControl
					label={ __( 'Enable Lightbox', 'mgb-masonry-image-gallery' ) }
					checked={ enableLightbox }
					onChange={ () =>
						setAttributes( { enableLightbox: ! enableLightbox } )
					}
				/>

				<SelectControl
					label={ __( 'Hover Effect', 'mgb-masonry-image-gallery' ) }
					value={ imageHoverEffect }
					options={ HOVER_EFFECTS }
					onChange={ ( v ) =>
						setAttributes( { imageHoverEffect: v } )
					}
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Caption Settings', 'mgb-masonry-image-gallery' ) }
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Show Captions', 'mgb-masonry-image-gallery' ) }
					checked={ showCaption }
					onChange={ () =>
						setAttributes( { showCaption: ! showCaption } )
					}
				/>

				{ showCaption && (
					<SelectControl
						label={ __(
							'Caption Position',
							'mgb-masonry-image-gallery'
						) }
						value={ captionPosition }
						options={ CAPTION_POSITIONS }
						onChange={ ( v ) =>
							setAttributes( { captionPosition: v } )
						}
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}