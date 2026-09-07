-- Full name should read "Dylan D. Pribadi" everywhere it's echoed from the
-- profile row (site header, footer, metadata, hero eyebrow).
UPDATE profile
   SET name = 'Dylan D. Pribadi',
       hero_eyebrow = 'Dylan D. Pribadi'
 WHERE id = 1;
