import { Product } from 'types/product.types';

export const mockProducts: Product[] = [
  {
    id: '001',
    title: 'The Lord of the Ring',
    description:
      'The Lord of the Rings is an epic high-fantasy novel by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkiens 1937 children book The Hobbit, but eventually developed into a much larger work.',
    price: 10,
    count: 5,
  },
  {
    id: '002',
    title: 'Hobbit',
    description:
      'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
    price: 10,
    count: 8,
  },
  {
    id: '003',
    title: 'The Hunger Games',
    description:
      'The Hunger Games is a series of young adult dystopian novels written by American author Suzanne Collins. The first three novels are part of a trilogy following teenage protagonist Katniss Everdeen, and the fourth book is a prequel set 64 years before the original.',
    price: 7,
    count: 7,
  },
  {
    id: '004',
    title: 'Game of Thrones',
    description:
      'Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, a series of fantasy novels by George R. R. Martin, the first of which is A Game of Thrones.',
    price: 11,
    count: 4,
  },
];
