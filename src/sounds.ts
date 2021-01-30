import { Howl } from 'howler';

const SOUND_FILES = 
[
    'music.mp3'
];

export const SOUNDS: Record<string, Howl> = {};

export const initSounds = () =>
{
    SOUND_FILES.forEach( x => 
    {
        SOUNDS[x] = new Howl({ src: [x] });
    });
};