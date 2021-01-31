const IMAGE_FILES = [
    'sprite.png',
    'bg__.png',
    'floor__.png',
];

export const IMAGES: Record<string, HTMLImageElement> = {};

const loadImage = ( filename: string ): Promise<void> =>
{
    return new Promise( resolve =>
    {
        var img = new Image();

        img.addEventListener( 'load', () =>
        {
            IMAGES[ filename ] = img;
            resolve();
        });

        img.src = filename;
    });
}

export const loadAllImages = (): Promise<void[]> =>
    Promise.all( IMAGE_FILES.map( loadImage ));