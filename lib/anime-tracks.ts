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
    cover: '/album-big-o.png',
    duration: 214,
  },
  {
    id: 'samurai-champloo-shiki-no-uta',
    title: 'Samurai Champloo',
    note: 'Shiki no Uta',
    artist: 'Nujabes (feat. Minmi)',
  },
  {
    id: 'those-who-hunt-elves-angel-blue',
    title: 'Those who hunt elves',
    note: 'Angel Blue',
    artist: 'Naoko Hamasaki',
  },
  {
    id: 'kakegurui-kono-yubi-tomare',
    title: 'Kakegurui',
    note: 'Kono Yubi Tomare',
    artist: 'Junna',
  },
  {
    id: 'gatchaman-lets-fly',
    title: 'Gatchaman OVA',
    note: "Let's fly",
    artist: 'Lance Matthew',
  },
]

export function getTrackAlbum(track: AnimeTrack) {
  return track.album ?? track.title
}

export function getTrackDuration(track: AnimeTrack) {
  return track.duration ?? 180
}
