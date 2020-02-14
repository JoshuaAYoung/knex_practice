BEGIN;

  INSERT INTO blogful_articles
    (content, date_published, title)
  VALUES
    ('Northeast', now
  () - '29 days'
  ::INTERVAL, 'Despotato'),
  ('Midwest ',  now
  () - '29 days'::INTERVAL, 'Cats that teach SQL'),
  ('Northeast', now
  () - '29 days'::INTERVAL, 'UpTown Monk'),
  ('Midwest ',  now
  () - '29 days'::INTERVAL, 'Despotato'),
  ('West',      now
  () - '29 days'::INTERVAL, 'Shape of Pooh'),
  ('Midwest ',  now
  () - '28 days'::INTERVAL, 'Cats that teach SQL'),
  ('Northeast', now
  () - '28 days'::INTERVAL, 'UpTown Monk'),
  ('Midwest ',  now
  () - '28 days'::INTERVAL, 'Man''s not torrid'),
  ('South',     now
  () - '28 days'::INTERVAL, 'Despotato'),
  ('West',      now
  () - '28 days'::INTERVAL, 'UpTown Monk'),
  ('Northeast', now
  () - '28 days'::INTERVAL, 'UpTown Monk'),
  ('Midwest ',  now
  () - '26 days'::INTERVAL, 'Man''s not torrid'),
  ('South',     now
  () - '22 days'::INTERVAL, 'Cats that teach SQL'),
  ('West ',     now
  () - '20 days'::INTERVAL, 'Despotato'),
  ('Northeast', now
  () - '20 days'::INTERVAL, 'Shape of Pooh'),
  ('Midwest ',  now
  () - '19 days'::INTERVAL, 'Despotato'),
  ('West',      now
  () - '13 days'::INTERVAL, 'Man''s not torrid'),
  ('West ',     now
  () - '12 days'::INTERVAL, 'Man''s not torrid'),
  ('Midwest ',  now
  () - '12 days'::INTERVAL, 'Man''s not torrid'),
  ('West',      now
  () - '12 days'::INTERVAL, 'Man''s not torrid'),
  ('Midwest ',  now
  () - '5 days'::INTERVAL,  'Cats that teach SQL'),
  ('Northeast', now
  () - '3 days'::INTERVAL,  'Cats that teach SQL'),
  ('South',     now
  () - '3 days'::INTERVAL,  'Despotato'),
  ('South',     now
  () - '3 days'::INTERVAL,  'Man''s not torrid'),
  ('South',     now
  () - '2 days'::INTERVAL,  'Man''s not torrid'),
  ('Northeast', now
  () - '10 hours'::INTERVAL, 'Shape of Pooh');

  COMMIT;