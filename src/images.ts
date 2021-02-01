const IMAGE_FILES = [
    'sprite.png',
    'bg__.png',
    'floor__.png',
    'Boat.png',
    'DiverSprite1.png',
    'DiverSprite2.png',
    'WaterOverlay.png',
    'WavesWaterTop.png',
    'beam.png',
    'O2Meter.png',
    'O2MeterDial.png',
    'O2MeterLens.png',
];

for( let i = 1; i <= 18; ++i )
    IMAGE_FILES.push( 'Coral'+ i +'.png' );
for( let i = 1; i <= 5; ++i )
    IMAGE_FILES.push( 'Treasure'+ i +'.png' );

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