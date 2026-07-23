export interface AnimeTrack {
  id: string
  /** Anime or show title */
  title: string
  /** Song title */
  note: string
  artist: string
  /** Optional album label; defaults to the show title in the player */
  album?: string
  /** Album art path */
  cover?: string
  /** MP3 or audio file URL */
  src?: string
  /** Duration in seconds; used until real audio metadata is available */
  duration?: number
}

export const ANIME_TRACKS: AnimeTrack[] = [
  {
    id: 'big-o-apologize',
    title: 'The Big O',
    note: 'Apologize',
    artist: 'Toshihiko Sahashi',
    cover: '/images/album-art/big-o.jpg',
    duration: 124,
  },
  {
    id: 'samurai-champloo-shiki-no-uta',
    title: 'Samurai Champloo',
    note: 'Shiki no Uta',
    artist: 'Nujabes (feat. Minmi)',
    cover: '/images/album-art/samurai-champloo.jpg',
    duration: 301,
  },
  {
    id: 'rahxephon',
    title: 'RahXephon',
    note: 'The Garden of Everything',
    artist: 'Maaya Sakamoto feat. Steve Conte',
    cover: '/images/album-art/rahxephon.jpg',
    duration: 382,
  },
  {
    id: 'kakegurui-kono-yubi-tomare',
    title: 'Kakegurui',
    note: 'Kono Yubi Tomare',
    artist: 'Junna',
    cover: '/images/album-art/kakegurui.jpg',
    duration: 216,
  },
  {
    id: 'gatchaman-lets-fly',
    title: 'Gatchaman OVA',
    note: "Let's fly",
    artist: 'Lance Matthew',
    cover: '/images/album-art/gatchaman.jpg',
    duration: 276,
  },
]

export function getTrackAlbum(track: AnimeTrack) {
  return track.album ?? track.title
}

export function getTrackDuration(track: AnimeTrack) {
  return track.duration ?? 180
}
