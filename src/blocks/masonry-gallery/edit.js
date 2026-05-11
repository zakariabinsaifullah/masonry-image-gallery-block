/* eslint-disable no-unused-vars */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

import Inspector from './inspector';

import classNames from 'classnames';

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
		imageHoverEffect,
		showCaption,
		captionPosition,
	} = attributes;

	setAttributes( { galleryId: clientId.slice( 0, 8 ) } );

	const colsNumber = images ? deskCol : 1;

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

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
					className: classNames(
						`dc__${ deskCol }`,
						`tc__${ tabCol }`,
						`pc__${ phoneCol }`,
						`dg__${ deskGap }`,
						`tg__${ tabGap }`,
						`pg__${ phoneGap }`,
						{
							placeholder: ! images || images.length === 0,
						}
					),
				} ) }
			>
				{ images && images.length > 0 ? (
					images.map( ( image ) => (
						<div
							key={ image.id }
							className={ classNames(
								'single-gallery-image',
								imageHoverEffect,
								`dg__${ deskGap }`,
								`tg__${ tabGap }`,
								`pg__${ phoneGap }`
							) }
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
									className={ classNames(
										'migb-caption',
										`migb-caption--${ captionPosition }`
									) }
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
