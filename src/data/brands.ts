import type { Brand } from '../types';

export const brands: Brand[] = [
  { id: 'dream11', name: 'Dream11' },
  { id: 'tata', name: 'Tata Group' },
  { id: 'ceat', name: 'CEAT Tyres' },
  { id: 'jiocinema', name: 'JioCinema' },
  { id: 'swiggy', name: 'Swiggy' },
  { id: 'rupay', name: 'RuPay' },
  { id: 'aramco', name: 'Aramco' },
  { id: 'my11circle', name: 'My11Circle' },
  { id: 'bisleri', name: 'Bisleri' },
  { id: 'wondercement', name: 'Wonder Cement' },
];

export const brandEmoji: Record<string, string> = {
  dream11: '🏆',
  tata: '⚡',
  ceat: '🎯',
  jiocinema: '📺',
  swiggy: '🍕',
  rupay: '💳',
  aramco: '⛽',
  my11circle: '🎮',
  bisleri: '💧',
  wondercement: '🏗️',
};
