/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		galleryId,
		images,
		deskCol, tabCol, phoneCol,
		deskGap, tabGap, phoneGap,
		enableLightbox,
		imageHoverEffect,
		showCaption,
		captionPosition,
	} = attributes;

	const itemClass = `single-gallery-image ${ imageHoverEffect } dg__${ deskGap } tg__${ tabGap } pg__${ phoneGap }`;

	const Caption = ( { image } ) =>
		showCaption && image.caption ? (
			<figcaption className={ `migb-caption migb-caption--${ captionPosition }` }>
				{ image.caption }
			</figcaption>
		) : null;

	return (
		<div
			{ ...useBlockProps.save( {
				className: `dc__${ deskCol } tc__${ tabCol } pc__${ phoneCol } dg__${ deskGap } tg__${ tabGap } pg__${ phoneGap }`,
			} ) }
			data-id={ galleryId }
			id={ galleryId }
		>
			{ images &&
				images.map( ( image ) =>
					enableLightbox ? (
						<a
							key={ image.id }
							className={ itemClass }
							href={ image.url }
							data-fslightbox={ galleryId }
						>
							<img
								src={ image.url }
								alt={
									image.alt ||
									__( 'Gallery Image', 'mgb-masonry-image-gallery' )
								}
								className={ `wp-image-${ image.id }` }
							/>
							<Caption image={ image } />
						</a>
					) : (
						<div key={ image.id } className={ itemClass }>
							<img
								src={ image.url }
								alt={
									image.alt ||
									__( 'Gallery Image', 'mgb-masonry-image-gallery' )
								}
								className={ `wp-image-${ image.id }` }
							/>
							<Caption image={ image } />
						</div>
					)
				) }
		</div>
	);
}
