import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/eng_lang.png',
  },
  {
    value: 'bn',
    label: 'Bengali',
    icon: '/static/icons/bengali_lang.jpg',
  },
  {
    value: 'hn',
    label: 'Hindi',
    icon: '/static/icons/hindi_lang.png',
  },
  {
    value: 'tn',
    label: 'Tamil',
    icon: '/static/icons/tamil_lang.png',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [selectedLanguage, setSelectedlanguage] = useState(0);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLang = (lang) => {
   
    
    const index = LANGS.findIndex(x => x.value ===lang);

    setSelectedlanguage(index)
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[selectedLanguage].icon} alt={LANGS[selectedLanguage].label} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[selectedLanguage].value}
              onClick={(option) => {
                const selectedLang = LANGS.filter((lang, index) => {
                  return lang.label === option.target.innerText;
                });
                changeLang(selectedLang[0].value);
                handleClose();
              }}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
