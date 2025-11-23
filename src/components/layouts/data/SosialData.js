// components/data/SosialData.js
import { Mail } from 'lucide-react';
import {
  SiTiktok,
  SiWhatsapp,
  SiInstagram,
  SiDiscord,
  SiX,
} from 'react-icons/si';

export const socialData = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    copyText: 'support@zemstore.com',
    href: null,
  },
  {
    id: 'whatsapp',
    icon: SiWhatsapp,
    label: 'WhatsApp',
    copyText: null,
    href: 'https://wa.me/60108001095',
  },
  {
    id: 'tiktok',
    icon: SiTiktok,
    label: 'TikTok',
    copyText: null,
    href: 'https://tiktok.com/@zemstore',
  },
  {
    id: 'instagram',
    icon: SiInstagram,
    label: 'Instagram',
    copyText: null,
    href: 'https://instagram.com/zemstore',
  },
  {
    id: 'discord',
    icon: SiDiscord,
    label: 'Discord',
    copyText: 'ZemStore#1234',
    href: null,
  },
  {
    id: 'twitter',
    icon: SiX,
    label: 'X (Twitter)',
    copyText: null,
    href: 'https://twitter.com/zemstore',
  },
];
