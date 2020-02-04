

export interface Player {
  score: number;
  name: string;
}

export interface Board {
  0: 'empty' | 'crossed' | 'noughted';
  1: 'empty' | 'crossed' | 'noughted';
  2: 'empty' | 'crossed' | 'noughted';
  3: 'empty' | 'crossed' | 'noughted';
  4: 'empty' | 'crossed' | 'noughted';
  5: 'empty' | 'crossed' | 'noughted';
  6: 'empty' | 'crossed' | 'noughted';
  7: 'empty' | 'crossed' | 'noughted';
  8: 'empty' | 'crossed' | 'noughted';
}
