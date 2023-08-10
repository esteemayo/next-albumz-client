import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export const albumInfoItems = [
  {
    id: 'artist',
    icon: {MusicNoteOutlinedIcon},
    label: 'Artist',
  },
  {
    id: 'title',
    icon: {TitleOutlinedIcon},
    label: 'Title',
  },
  {
    id: 'genre',
    icon: {CategoryOutlinedIcon},
    label: 'Genre',
  },
  {
    id: 'year',
    icon: {DateRangeOutlinedIcon},
    label: 'Year of Release',
  },
  {
    id: 'label',
    icon: {AlbumOutlinedIcon},
    label: 'Record Label',
  },
  {
    id: 'tracks',
    icon: {FormatListNumberedOutlinedIcon},
    label: 'Number of Tracks',
  },
  {
    id: 'ratingsAverage',
    icon: {StarOutlineOutlinedIcon},
    label: 'Ratings',
  },
];
