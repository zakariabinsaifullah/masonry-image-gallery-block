/* eslint-disable no-unused-vars */
import { useState, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	ButtonGroup,
	Button,
	ColorPalette,
	ColorIndicator,
	Flex,
	FlexItem,
} from '@wordpress/components';

import Devices from '../../components/devices';

// ─── Static option lists ───────────────────────────────────────────────────────

const BORDER_STYLES = [
	{ label: __( 'None', 'mgb-masonry-image-gallery' ), value: 'none' },
	{ label: __( 'Solid', 'mgb-masonry-image-gallery' ), value: 'solid' },
	{ label: __( 'Dashed', 'mgb-masonry-image-gallery' ), value: 'dashed' },
	{ label: __( 'Dotted', 'mgb-masonry-image-gallery' ), value: 'dotted' },
	{ label: __( 'Double', 'mgb-masonry-image-gallery' ), value: 'double' },
];

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

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		images,
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

	// Device tabs live in local React state — they control UI only, not saved attributes.
	const [ colDevice, setColDevice ] = useState( 'desktop' );
	const [ gapDevice, setGapDevice ] = useState( 'desktop' );
	const [ captionDevice, setCaptionDevice ] = useState( 'desktop' );

	// Persist the gallery ID from the block's client ID on first render.
	setAttributes( { galleryId: clientId.slice( 0, 8 ) } );

	const colsNumber = images ? deskCol : 1;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Gallery Settings',
						'mgb-masonry-image-gallery'
					) }
					initialOpen={ true }
				>
					<Devices
						title={ __(
							'Number of Columns',
							'mgb-masonry-image-gallery'
						) }
						device={ colDevice }
						renderFunction={ setColDevice }
					/>
					{ colDevice === 'desktop' && (
						<RangeControl
							value={ deskCol }
							onChange={ ( v ) =>
								setAttributes( { deskCol: v } )
							}
							min={ 1 }
							max={ 5 }
						/>
					) }
					{ colDevice === 'tablet' && (
						<RangeControl
							value={ tabCol }
							onChange={ ( v ) => setAttributes( { tabCol: v } ) }
							min={ 1 }
							max={ 5 }
						/>
					) }
					{ colDevice === 'smartphone' && (
						<RangeControl
							value={ phoneCol }
							onChange={ ( v ) =>
								setAttributes( { phoneCol: v } )
							}
							min={ 1 }
							max={ 5 }
						/>
					) }

					<Devices
						title={ __(
							'Items Gutter',
							'mgb-masonry-image-gallery'
						) }
						device={ gapDevice }
						renderFunction={ setGapDevice }
					/>
					{ gapDevice === 'desktop' && (
						<RangeControl
							value={ deskGap }
							onChange={ ( v ) =>
								setAttributes( { deskGap: v } )
							}
							min={ 0 }
							max={ 100 }
							help={ __(
								'unit in pixel (px)',
								'mgb-masonry-image-gallery'
							) }
						/>
					) }
					{ gapDevice === 'tablet' && (
						<RangeControl
							value={ tabGap }
							onChange={ ( v ) => setAttributes( { tabGap: v } ) }
							min={ 0 }
							max={ 100 }
							help={ __(
								'unit in pixel (px)',
								'mgb-masonry-image-gallery'
							) }
						/>
					) }
					{ gapDevice === 'smartphone' && (
						<RangeControl
							value={ phoneGap }
							onChange={ ( v ) =>
								setAttributes( { phoneGap: v } )
							}
							min={ 0 }
							max={ 100 }
							help={ __(
								'unit in pixel (px)',
								'mgb-masonry-image-gallery'
							) }
						/>
					) }

					<ToggleControl
						label={ __(
							'Enable Lightbox',
							'mgb-masonry-image-gallery'
						) }
						checked={ enableLightbox }
						onChange={ () =>
							setAttributes( {
								enableLightbox: ! enableLightbox,
							} )
						}
					/>

					<SelectControl
						label={ __(
							'Hover Effect',
							'mgb-masonry-image-gallery'
						) }
						value={ imageHoverEffect }
						options={ HOVER_EFFECTS }
						onChange={ ( v ) =>
							setAttributes( { imageHoverEffect: v } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Caption Settings',
						'mgb-masonry-image-gallery'
					) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Captions',
							'mgb-masonry-image-gallery'
						) }
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

			{ images && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								multiple={ true }
								gallery={ true }
								allowedTypes={ [ 'image' ] }
								value={ images.map( ( img ) => img.id ) }
								onSelect={ ( media ) =>
									setAttributes( { images: media } )
								}
								render={ ( { open } ) => (
									<ToolbarButton
										icon="edit"
										label={ __(
											'Edit Images',
											'mgb-masonry-image-gallery'
										) }
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				</BlockControls>
			) }

			<div
				{ ...useBlockProps( {
					className: `dc__${ colsNumber } tc__${ tabCol } pc__${ phoneCol } dg__${ deskGap } tg__${ tabGap } pg__${ phoneGap }`,
				} ) }
			>
				{ images ? (
					images.map( ( image ) => (
						<div
							key={ image.id }
							className={ `single-gallery-image ${ imageHoverEffect } dg__${ deskGap } tg__${ tabGap } pg__${ phoneGap }` }
						>
							<img
								src={ image.url }
								alt={
									image.alt ||
									__(
										'Gallery Image',
										'mgb-masonry-image-gallery'
									)
								}
								className={ `wp-image-${ image.id }` }
							/>
							{ showCaption && image.caption && (
								<figcaption
									className={ `migb-caption migb-caption--${ captionPosition }` }
								>
									{ image.caption }
								</figcaption>
							) }
						</div>
					) )
				) : (
					<MediaPlaceholder
						multiple={ true }
						allowedTypes={ [ 'image' ] }
						onSelect={ ( media ) =>
							setAttributes( { images: media } )
						}
						onFilesPreUpload={ ( media ) =>
							setAttributes( { images: media } )
						}
						onSelectURL={ false }
						labels={ {
							title: __(
								'Add Gallery Images',
								'mgb-masonry-image-gallery'
							),
						} }
					/>
				) }
			</div>
		</Fragment>
	);
}
