-- Part A - Q6 Travel Destination Guide
CREATE DATABASE IF NOT EXISTS travel_guide_db;
USE travel_guide_db;

DROP TABLE IF EXISTS destinations;

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  category VARCHAR(50) NOT NULL,
  description TEXT,
  price_per_night INT,
  rating DECIMAL(2,1),
  best_season VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Populate at least 10 records
INSERT INTO destinations (name, country, city, category, description, price_per_night, rating, best_season) VALUES
('Victoria Falls', 'Zambia', 'Livingstone', 'Adventure', 'One of Seven Natural Wonders on Zambezi River', 250, 4.9, 'May-Oct'),
('South Luangwa National Park', 'Zambia', 'Mfuwe', 'Wildlife', 'Best walking safari in Africa', 220, 4.9, 'Jun-Oct'),
('Lower Zambezi', 'Zambia', 'Chirundu', 'Wildlife', 'Canoeing safari with elephants', 180, 4.8, 'May-Nov'),
('Bali Beach', 'Indonesia', 'Bali', 'Beach', 'Tropical beach 12km from Ubud', 120, 4.8, 'Apr-Oct'),
('Zanzibar Stone Town', 'Tanzania', 'Zanzibar', 'Culture', 'Historic Swahili town with spices', 150, 4.7, 'Jun-Feb'),
('Kafue National Park', 'Zambia', 'Itezhi-Tezhi', 'Wildlife', 'Largest park in Zambia, lions and cheetahs', 200, 4.6, 'Jun-Oct'),
('Lake Malawi', 'Malawi', 'Mangochi', 'Beach', 'Clear water lake beach with snorkeling', 90, 4.5, 'May-Oct'),
('Cape Town', 'South Africa', 'Cape Town', 'City', 'Table Mountain and penguins', 130, 4.8, 'Nov-Mar'),
('Maasai Mara', 'Kenya', 'Narok', 'Wildlife', 'Great migration crossing', 300, 4.9, 'Jul-Oct'),
('Livingstone Island', 'Zambia', 'Livingstone', 'Adventure', 'Swim at edge of Victoria Falls', 280, 5.0, 'Aug-Dec');