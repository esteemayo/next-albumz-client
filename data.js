import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

import styles from '@/styles/AlbumDescription.module.scss';

export const albumInfoItems = [
  {
    id: 'artist',
    icon: <MusicNoteOutlinedIcon className={styles.icon} />,
    label: 'Artist',
  },
  {
    id: 'title',
    icon: <TitleOutlinedIcon className={styles.icon} />,
    label: 'Title',
  },
  {
    id: 'genre',
    icon: <CategoryOutlinedIcon className={styles.icon} />,
    label: 'Genre',
  },
  {
    id: 'year',
    icon: <DateRangeOutlinedIcon className={styles.icon} />,
    label: 'Year of Release',
  },
  {
    id: 'label',
    icon: <AlbumOutlinedIcon className={styles.icon} />,
    label: 'Record Label',
  },
  {
    id: 'tracks',
    icon: <FormatListNumberedOutlinedIcon className={styles.icon} />,
    label: 'Number of Tracks',
  },
  {
    id: 'ratingsAverage',
    icon: <StarOutlineOutlinedIcon className={styles.icon} />,
    label: 'Ratings',
  },
];
