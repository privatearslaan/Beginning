-- Update seeded catalog prices to realistic INR amounts
UPDATE "Product" SET "price" = 1299 WHERE "slug" = 'premium-dog-food';
UPDATE "Product" SET "price" = 899 WHERE "slug" = 'cat-scratching-post';
UPDATE "Product" SET "price" = 349 WHERE "slug" = 'bird-seed-mix';
UPDATE "Product" SET "price" = 2499 WHERE "slug" = 'aquarium-starter-kit';
UPDATE "Product" SET "price" = 299 WHERE "slug" = 'rope-chew-toy';
UPDATE "Product" SET "price" = 449 WHERE "slug" = 'flea-tick-shampoo';

UPDATE "Service" SET "price" = 1499 WHERE "name" = 'Full Grooming';
UPDATE "Service" SET "price" = 399 WHERE "name" = 'Nail Trim';
UPDATE "Service" SET "price" = 899 WHERE "name" = 'Wellness Checkup';
