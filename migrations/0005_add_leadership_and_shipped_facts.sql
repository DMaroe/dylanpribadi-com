-- Two more facts for the home page strip: leadership tenure and shipped
-- project count, appended after the existing four rather than replacing any.
INSERT INTO facts (label, value, sort_order) VALUES
  ('Leading teams', '4+ years', 5),
  ('Shipped', '8 quality projects', 6);
