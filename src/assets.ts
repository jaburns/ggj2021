const SPRITE_FILES = [
	'sprite.png',
];

export const Sprites: Record<string, HTMLImageElement> = {};

const loadImage = ( filename: string ): Promise<void> =>
{
	return new Promise( resolve =>
	{
		var img = new Image();

		img.addEventListener( 'load', () =>
		{
			Sprites[ filename ] = img;
			resolve();
		});

		img.src = filename;
	});
}

export const loadAllImages = (): Promise<void[]> =>
	Promise.all( SPRITE_FILES.map( loadImage ));